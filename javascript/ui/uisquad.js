function uiSquad(element, squad) {
	$(element).find('.dropdown.race').mouseenter( function() {
		var race = 0;
		$(element).find('.dropdown.race .menu').each(function(index) {
			if (race == squad.race) race ++;
			$(this).show().html(RACE_NAMES[race]).data("race",race);
			race++;
			
		});
	}).mouseleave( function() {
		$(element).find('.dropdown.race').children('.menu').hide();
	});
	$(element).find('.dropdown.race > div').click(function() {
		if ($(this).data("race") == null) {
			$(element).find('.dropdown.race').children('.menu').hide();
		}
		else {
			var old = squad.race;
			squad.race = $(this).data("race");
			$(element).find('.dropdown.race').children('.menu').hide();
			$(element).find('.dropdown.race > div').eq(0).html(RACE_NAMES[squad.race]);
			$(element).find('.army').removeClass().addClass('army '+HEROICON_RACE[squad.race]);
			squad.updaterace(old);
		}
	});
	$(element).find('.button.level').click(function() {
		if (squad.race == 5) return;
		if (squad.race < 4) {
			squad.level ++;
			if(squad.level >= 3) squad.level = 0;
			$(this).html(squad.level+1);
			squad.updatelevel();
		}
		else {
			squad.level ++;
			if(squad.level >= 6) squad.level = 0;
			$(this).html(squad.level+1);
			squad.updatelevel();
		}
	});
	$(element).find('.button.chance').click(function() {
		squad.chance ++;
		if (squad.chance > 2) squad.chance = 0;
		$(this).html(GENERAL.CHANCE[squad.chance]);
	});
	$(element).find('.button.renegade').click(function() {
		squad.renegade = 1 - squad.renegade;
		if (squad.renegade == 1) $(this).removeClass('off').addClass('on');
		else $(this).removeClass('on').addClass('off');
		EffectHandler.refresh();
	});	
	$(element).find('.name > input').change(function() {
		squad.name = $(this).val();
	});
	$(element).find('.retreat > input').change(function() {
		if(isNaN($(this).val())) {
			$(this).val(squad.retreat);
		}
		else {
			squad.retreat = parseInt($(this).val());
			if (squad.retreat < 50) squad.retreat = 50;
			else if (squad.retreat > 100) squad.retreat = 100;
			$(this).val(squad.retreat);
		}
	});
	$(element).find('.icon.new').click(function() {
		for (var i = 0;(i < squad.army.length); i++) {
			squad.army[i].amount = 0;
			squad.army[i].level = 2;
		}
		squad.race = 0;
		squad.reloadElement();
		EffectHandler.refresh();
	});	
	$(element).find('.icon.save').click(function(e) {
		SaveBox.open(squad,e,0);
	});	
	$(element).find('.hero').click(function(e) {
		HeroBox.open(squad,e);
	}).mouseenter(function(e) {
		var data = {};
		var html = '<div style="width:300px" class="box">';
		
		// erstmal daten zusammenrechnen
		data.attack = 0;
		data.hp = 0;
		data.cost = 0;
		data.score = 0;
		for(var i = 0;(i < squad.army.length); i++) {
			var unit = squad.army[i];
			data.attack += unit.getAttack(squad.chance) * unit.amount * Math.max(0.1,(unit.effect.attack/100));
			data.hp += unit.getCalculatedHp() * unit.amount;
			data.cost += Math.max(0,Math.floor((unit.getCost() * unit.amount * (unit.effect.cost/100) * (TREASURYFAKTOR[ServerData.type][ServerData.treasure]/100)) + 0.5))
			data.score += unit.getScore() * unit.amount;
		}
		data.heal = Math.floor(squad.army[5].getSpecial() * squad.army[5].amount * Math.max(0,(squad.army[5].effect.special/100)));
		data.carrier = squad.army[0].getSpecial() * squad.army[0].amount * Math.max(0,(squad.army[0].effect.special/100));
		data.mage = squad.army[7].getSpecial() * squad.army[7].amount * Math.max(0,(squad.army[7].effect.special/100));
		data.protect = squad.army[7].effect.mage * squad.army[7].amount;
		
		data.attack = data.attack * Math.max(0,(squad.effect.armydamage/100));
		
		// Eintragen der Berechnungsdaten
		
		
		html += '<div class="icon attack"></div><div class="herodata">'+Trenner(Math.floor(data.attack))+'</div>';
		html += '<div class="icon hp"></div><div class="herodata">'+Trenner(Math.floor(data.hp))+'</div>';
		
		html += '<div class="icon carrier"></div><div class="herodata">'+Trenner(data.carrier)+'</div>';
		html += '<div class="icon healer"></div><div class="herodata">'+Trenner(data.heal)+'</div>';
		
		html += '<div class="icon mageprotect"></div><div class="herodata">'+Trenner(data.protect)+'</div>';
		html += '<div class="icon mage"></div><div class="herodata">'+Trenner(data.mage)+'</div>';
		
		html += '<div class="icon cost"></div><div class="herodata">'+Trenner(Math.floor(data.cost))+'</div>';
		html += '<div class="icon score"></div><div class="herodata">'+Trenner(Math.floor(data.score))+'</div>';
		
		html += '</div>';
		
		Tooltip.show(e,20,20,html);
	}).mouseleave(function(e) {
		Tooltip.hide();
	});
	for(var i = 0;(i < squad.army.length); i++) {
		$(element).find('.unit').eq(i).data("id",i).click(function(e) {
			if (this != (event.target || event.srcElement)) return; // prevent BUGGGG
			if (squad.race < 4) {
				var i = $(this).data("id");
				squad.army[i].level ++;
				if (squad.army[i].level >= 3) squad.army[i].level = 0;
				var y = 0;
				if (squad.army[i].amount > 0) y = 3;
				$(this).css('background-position','-'+(i*68)+' -'+((squad.army[i].level+y)*82));
			}
		}).mouseenter(function(e) {
			var i = $(this).data("id");
			var unit = squad.army[i];
			var html = '<div class="box"><div class="header">'+EFFECTUNIT[i+2]+'</div>';
			
			html += '<div class="icon attack"></div><div class="data">';
			html += unit.getAttack(squad.chance);
			if (unit.effect.attack != 100) {
				if (unit.effect.attack < 100) {
					if (unit.effect.attack > 10) html += '<span style="color:#f00"> '+(unit.effect.attack-100)+'%</span>';
					else html += '<span style="color:#f80"> -90%</span>';
				}
				else html += '<span style="color:#0f0"> +'+(unit.effect.attack-100)+'%</span>';
			}
			if (unit.effect.roundattack != 0) {
				if (unit.effect.roundattack < 0) html += '(<span style="color:#f00"> '+(unit.effect.roundattack)+'%</span>)';
				else html += '(<span style="color:#0f0"> +'+(unit.effect.roundattack)+'%</span>)';
			}
			html += '</div><br>';
			
			var maxdefence = Math.min(squad.effect.maxdefence,75);
			var defence = Math.max(0,Math.min(unit.effect.defence + unit.squad.effect.basicdefence,maxdefence));
			var adddefence = Math.max(-1 * unit.squad.effect.basicdefence,Math.min(unit.effect.defence,(maxdefence-unit.squad.effect.basicdefence)));
			
			html += '<div class="icon defence"></div><div class="data">';
			html += unit.squad.effect.basicdefence;
			if (defence == maxdefence){
				html += '<span style="color:#f80"> ';
				if (adddefence >= 0)
					html += "+";
				html += adddefence+'</span>';
			}
			else if((defence == 0) && (unit.effect.defence < 0)) {
				html += '<span style="color:#f80"> -'+unit.squad.effect.basicdefence+'</span>';
			}
			else if(adddefence > 0) {
				html += '<span style="color:#0f0"> +'+(adddefence)+'</span>';
			}
			else if(adddefence < 0) {
				html += '<span style="color:#f00"> '+(adddefence)+'</span>';
			}
			html += '</div><br>';
			
			html += '<div class="icon hp"></div><div class="data">';
			html += unit.getHp();
			if (unit.effect.hp != 100) {
				if (unit.effect.hp < 100) {
					if (unit.effect.hp > 25) html += '<span style="color:#f00"> '+(unit.effect.hp-100)+'%</span>';
					else html += '<span style="color:#f80"> -75%</span>';
				}
				else html += '<span style="color:#0f0"> +'+(unit.effect.hp-100)+'%</span>';
			}
			html += '</div><br>';
			
			if (unit.id != 6) {
				html += '<div class="icon '+ICON_SPECIAL[unit.id]+'"></div><div class="data">';
				html += unit.getSpecial();
				if (unit.effect.special != 100) {
					if (unit.effect.special < 100) {
						if (unit.effect.special > 0) html += '<span style="color:#f00"> '+(unit.effect.special-100)+'%</span>';
						else html += '<span style="color:#f80"> -100%</span>';
					}
					else html += '<span style="color:#0f0"> +'+(unit.effect.special-100)+'%</span>';
				}
				html += '</div><br>';
			}
			
			if ((unit.id == 7) && (unit.effect.mage > 0)){
				html += '<div class="icon mageprotect"></div><div class="data">';
				html += unit.effect.mage;
				html += '</div><br>';
			}
			
			html += '<div class="icon cost"></div><div class="data">';
			html += Trenner(Math.max(0,Math.floor((unit.getCost() * unit.amount * (unit.effect.cost/100) * (TREASURYFAKTOR[ServerData.type][ServerData.treasure]/100)) + 0.5)));
			if (unit.effect.cost != 100) {
				if (unit.effect.cost < 100) {
					if (unit.effect.cost > 0) html += ' (<span style="color:#0f0"> '+(unit.effect.cost-100)+'%</span>)';
					else html += ' (<span style="color:#f80"> -100%</span>)';
				}
				else html += ' (<span style="color:#f00"> +'+(unit.effect.cost-100)+'%</span>)';
			}
			html += '</div><br>';
			
			html += '<div class="icon score"></div><div class="data">';
			html += Trenner(unit.getScore() * unit.amount);
			html += '</div>';
			
			html += '</div><br>';
			
			Tooltip.show(e,20,20,html);
		}).mouseleave(function() {
			Tooltip.hide();
		}).children().data("id",i).change(function() {
			var i = $(this).data("id");
			if(isNaN($(this).val())) {
				$(this).val(squad.army[i].amount);
			}
			else if ($(this).val() == ""){
				squad.army[i].amount = 0;
				$(this).val(squad.army[i].amount);
				$(element).find('.unit').eq(i).css('background-position','-'+(i*68)+' -'+((squad.army[i].level)*82));
			}
			else {
				squad.army[i].amount = parseInt($(this).val());
				if (squad.army[i].amount < 0) squad.army[i].amount = 0;
				$(this).val(squad.army[i].amount);
				var y = 0;
				if (squad.army[i].amount > 0) y = 3;
				$(element).find('.unit').eq(i).css('background-position','-'+(i*68)+' -'+((squad.army[i].level+y)*82));
			}
		});
	}
	
	this.reloadElement = function(){
		$(element).find('.name > input').val(squad.name);
		$(element).find('.dropdown.race > div').eq(0).html(RACE_NAMES[squad.race]);
		$(element).find('.dropdown.race .menu').each(function(index){
			$(this).css('top',((index+1)*(24))+'px');
		});
		$(element).find('.button.chance').html(GENERAL.CHANCE[squad.chance]);
		$(element).find('.button.level').html(squad.level+1);
		if (squad.renegade) $(element).find('.button.renegade').removeClass('off').addClass('on');
		else $(element).find('.button.renegade').removeClass('on').addClass('off');
		$(element).find('.retreat > input').val(squad.retreat);
		
		$(element).find('.army').removeClass().addClass('army '+HEROICON_RACE[squad.race]);
		for(var i = 0; (i < squad.army.length); i++) {
			var y = 0;
			if (squad.army[i].amount > 0) y = 3;
			$(element).find('.unit').eq(i).css('background-position','-'+(i*68)+'px -'+((squad.army[i].level+y)*82+'px'))
				.children('input').val(squad.army[i].amount);
		}
	}
	this.enablehide = function() {
		$(element).append('<div class="addbutton">ADD</div>').find('.addbutton').click(function() {
			squad.ui.show();
		}).hide();
		$(element).find('.side').css('top','18px').prepend('<div class="icon close"><div></div></div>').find('.close').click(function() {
			squad.ui.hide();
		});
	}
	
	this.show = function() {
		if ($(element).find('.inputarea').is(":visible") == false) {
			$(element).find('.inputarea').show();
			$(element).find('.addbutton').hide();
			// füge es der Force hinzu
			if (squad.side == 0) {
				ForceAttacker[ForceAttacker.length] = squad;
			}
			else {
				ForceDefender[ForceDefender.length] = squad;
				
			}
			squad.reloadElement();
			EffectHandler.refresh();
		}
	}
	
	this.hide = function() {
		$(element).find('.inputarea').hide();
		$(element).find('.addbutton').show();
		// suche es im squad
		
		
		if (squad.side == 0) {
			var index = ForceAttacker.indexOf(squad);
			if (index > -1) {
				ForceAttacker.splice(index, 1);
			}
		}
		else {
			var index = ForceDefender.indexOf(squad);
			if (index > -1) {
				ForceDefender.splice(index, 1);
			}
			
		}
		EffectHandler.refresh();
	}
	
	this.heroIconRefresh = function() {
		if(squad.hero.clas == 0)
			$(element).find('.hero .heroimage').removeClass().addClass("heroimage sprite-heroes-HERO"+HEROICON_RACE[squad.race]);
		else {
			if (squad.race < 4){
				$(element).find('.hero .heroimage').removeClass()
					.addClass("heroimage sprite-heroes-"+HERO.Player[squad.hero.clas-1][squad.hero.typ]+"_"+HEROICON_GENDER[squad.hero.gender]);
			}
			else if (squad.race == 4){
				$(element).find('.hero .heroimage').removeClass()
					.addClass("heroimage sprite-heroes-"+MONSTER_HERO[squad.hero.clas-1][squad.hero.typ].Image+"_"+HEROICON_GENDER[squad.hero.gender]);
			}
			else if (this.race == 5){
				$(element).find('.hero .heroimage').removeClass()
					.addClass("heroimage sprite-heroes-"+MONSTER_HERO[2][squad.hero.typ].Image+"_"+HEROICON_GENDER[squad.hero.gender]);
			}
		}
		$(element).find('.hero').removeClass()
			.addClass('hero heroopen sprite-heroes-HERO'+HEROICON_RACE[squad.race]+"_BACK");
	}
}
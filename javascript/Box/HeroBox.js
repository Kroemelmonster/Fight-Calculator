function HeroBoxObject() {
	squad = null;
	// aufrufen wenn sich der held geändert hat
	this.heroRefresh = function() {
		// updated den helden
		if (squad.hero.clas == 0) {
			// clas ist nicht vorhanden -> stelle auf leere klasse um
			$('#HeroBox .hero .class').html(HEROCLASS[0]);
			// disable alles andere
			$('#HeroBox .hero .typ').css('visibility','hidden');
			$('#HeroBox .hero .gender').css('visibility','hidden');
			// skills loeschen
			$('#HeroBox .skills').html("");
		}
		else {
			var html = "";
			// alles wieder sichtbar machen
			$('#HeroBox .hero .typ').css('visibility','visible');
			$('#HeroBox .hero .gender').css('visibility','visible');
			// gender richtig einstellen
			if (squad.hero.gender == 0) $('#HeroBox .hero .gender').addClass("male").removeClass("female");
			else $('#HeroBox .hero .gender').addClass("female").removeClass("male");
			// race = spielerrase
			if (squad.race < 4){
				// class name und typ anzeigen
				$('#HeroBox .hero .class').html(HEROCLASS[squad.hero.clas]);
				// -1 da heroclass[0] = leere klasse also "kein Held"
				$('#HeroBox .hero .typ').html(HEROTYPE[squad.hero.clas-1][squad.hero.typ]);
				// skills aktivieren
				for (var i = 0;(i < HEROSKILL_DATA[squad.hero.clas-1].length);i++) {
					html += '<div class="border';
					// ist das level über 0 so zeig es aktiv an
					if (squad.hero.skill[i] > 0)
						html += " active";
					html += '"><div class="icon sprite-magic-'+HEROSKILL_DATA[squad.hero.clas-1][i][0]+'"></div></div>';
				}
			}
			else if (squad.race == 4){
				var data = MONSTER_HERO[squad.hero.clas-1][squad.hero.typ];
				// rasse = monster name und type einstellen
				$('#HeroBox .hero .class').html(MONSTHEROCLASS[squad.hero.clas-1]);
				$('#HeroBox .hero .typ').html(MONSTHEROTYPE[data.Nameid]);
				//hsid ist die ID des heroes da class 0 oder 1 ist wird die idclasse so errechnet :
				for (var i = 0;(i < HEROSKILL_DATA[data.Skillid].length);i++) {
					// aggro helden haben ihre abilties immer geskilled
					squad.hero.skill[i] = 1;
					html += '<div class="border active"><div class="icon sprite-magic-'+HEROSKILL_DATA[data.Skillid][i][0]+'"></div></div>';
				}
				
				for (var i = 0;(i < 9); i++) {
					this.setArtefact(i,data.Arte,0);
				}
			}
			else if (squad.race == 5){
				var data = MONSTER_HERO[2][squad.hero.typ];
				// burg monster name und type einstellen
				$('#HeroBox .hero .class').html(MONSTHEROCLASS[2]);
				$('#HeroBox .hero .typ').html(MONSTHEROTYPE[data.Nameid]);
				//hsid ist die ID des heroes da class 0 oder 1 ist wird die idclasse so errechnet :
				for (var i = 0;(i < HEROSKILL_DATA[data.Skillid].length);i++) {
					// burg monster haben auch immer alles komplett geskilled
					squad.hero.skill[i] = 1;
					html += '<div class="border active"><div class="icon sprite-magic-'+HEROSKILL_DATA[data.Skillid][i][0]+'"></div></div>';
				}
				
				for (var i = 0;(i < 9); i++) {
					this.setArtefact(i,data.Arte,0);
				}
			}
			// skills eintragen
			$('#HeroBox .skills').html(html);
			// skills klicks regsitrieren
			$('#HeroBox .skills .border').each(function(index){
				$(this).click(function(e) {
					// nur klicks auf spieler rassen werden überhaupt erst regsitiert
					if (squad.race < 4)
						HeroBox.clickSkill(index,e);
				}).mouseenter(function(e) {
					var html = HeroBox.tooltipSkill(index);
					if (html != "") {
						Tooltip.show(e,20,20,html);
					}
				}).mouseleave(function() {
					Tooltip.hide();
				});
			});
		}
	}
	// function die beim klicken auf ein hero skill triggert
	this.clickSkill = function(id,e) {
		// nochmal absicherung dass nur spieler helden skillen können
		if (squad.race >= 4) return;
		// skill erhöhen aber max 5
		if (e.altKey)
			squad.hero.skill[id] = 0;
		else if (e.shiftKey)
			squad.hero.skill[id] = 5;
		else
			squad.hero.skill[id] ++;
		if (squad.hero.skill[id] > 5) squad.hero.skill[id] = 0;
		// active hinzufügen sollte es nicht 0 sein
		if (squad.hero.skill[id] > 0) $('#HeroBox .skills .border').eq(id).addClass('active');
		else $('#HeroBox .skills .border').eq(id).removeClass('active');
		// tooltip laden da sich dieser beim klick ändert
		var html = HeroBox.tooltipSkill(id);
		if (html != "") {
			Tooltip.show(e,20,20,html);
		}
		
		EffectHandler.refresh();
	}
	// gibt den tooltip des heroskills zurück
	this.tooltipSkill = function(id) {
		var html = '<div class="buffbox';
		// level = 0 also kein level
		if (squad.hero.skill[id] == 0) html += ' nolevel';
		html += '"><div class="header">';
		// clasid berechnen
		var clasid = squad.hero.clas -1;
		if (squad.race == 4) clasid = MONSTER_HERO[squad.hero.clas-1][squad.hero.typ].Skillid
		if (squad.race == 5) clasid = MONSTER_HERO[2][squad.hero.typ].Skillid
		html += HEROSKILL_NAME[clasid][id]+' ['+squad.hero.skill[id]+']';
		html += '</div>';
		// effect laden mit minimal stufe 1 ( stf 0 wird als stf 1 angezeigt )
		html += effect2Text(HEROSKILL_DATA[clasid][id][1],Math.max(squad.hero.skill[id]-1,0));
		
		html += '</div>';
		return html;
	}
	
	this.artefactRefresh = function() {
		$('#HeroBox .artefacts td').each(function(index) {
			$(this).removeClass();
			// wenn kein arte -> mach nix
			if (squad.hero.artefact[index].index == -1) {
				$(this).children().removeClass().addClass('icon sprite-arte-0'+ARTEFACT_TYPE2SPRITE[index]);
			}
			else {
				if (squad.hero.artefact[index].crystal)
					$(this).addClass('crystal');
				$(this).children().removeClass().addClass('icon sprite-arte-'+(ARTEFACT_DATA[squad.hero.artefact[index].index][0])+ARTEFACT_TYPE2SPRITE[index]);
				
			}
		});
	}
	
	this.setArtefact = function(id, index, crystal) {
		var ele = $('#HeroBox .artefacts td').eq(id);
		if (index == -1) {
			ele.children().removeClass().addClass('icon sprite-arte-0'+ARTEFACT_TYPE2SPRITE[id]);
		}
		else {
			ele.children().removeClass().addClass('icon sprite-arte-'+(ARTEFACT_DATA[index][0])+ARTEFACT_TYPE2SPRITE[id]);
		}
		squad.hero.artefact[id].index = index;
		squad.hero.artefact[id].crystal = crystal;
		if (crystal){
			ele.addClass('crystal');
		}
		else{
			ele.removeClass('crystal');
		}
		EffectHandler.refresh();
	}
	this.heroNameRefresh = function() {
		$('#HeroBox .hero .name').val(squad.hero.name);
	}
	this.magicRefresh = function() {
		var html = "";
		$.each(squad.hero.magic, function( index, value ) {
			if (value)
				html += '<div class="outer" id="magicid_'+index+'"><div class="icon sprite-magic-'+MAGIC_DATA[index][0]+'"></div></div>';
		});
		$('#HeroBox .magic .area').html(html).children().click(function(e) {
			var index = parseInt(this.id.substring(8));
			// Shift = max level
			if (e.shiftKey) {
				var maxlvl = 1;
				if ($.isArray(MAGIC_DATA[index][3]))
					maxlvl = MAGIC_DATA[index][3][0].amount.length;
				else
					maxlvl = MAGIC_DATA[index][3].amount.length;
				squad.hero.magic[index] = maxlvl;
				Tooltip.show(e,20,20,MagicBox.tooltip(index));
			}
			// Alt = loeschen
			else if (e.altKey) {
				delete squad.hero.magic[index];
				element = $(this);
				Tooltip.hide();
				window.setTimeout(function() {
					element.remove();
				},1);
			}
			// ansonten +1 bis max dann wieder 1
			else {
				var maxlvl = 1;
				if ($.isArray(MAGIC_DATA[index][3]))
					maxlvl = MAGIC_DATA[index][3][0].amount.length;
				else
					maxlvl = MAGIC_DATA[index][3].amount.length;
				squad.hero.magic[index] += 1;
				if (squad.hero.magic[index] > maxlvl)
					squad.hero.magic[index] = 1;
				Tooltip.show(e,20,20,MagicBox.tooltip(index));
			}
			EffectHandler.refresh();
		}).mouseenter(function(e) {
			var index = parseInt(this.id.substring(8));
			Tooltip.show(e,20,20,MagicBox.tooltip(index));
		}).mouseleave(function(e) {
			Tooltip.hide();
		});
	}
	this.open = function(s, e) {
		squad = s;
		// prevent instant closing bug
		window.setTimeout(function() {
			$(squad.element).find('.hero').addClass("heroopen");
			$(squad.element).find('.unit:last-child').addClass("heroopen");
			$('#HeroBox').css('top',($(e.target).offset().top + $(e.target).height()+2)+'px')
					     .css('left',($(e.target).offset().left-2)+'px')
						 .stop(true,true).slideDown(1000);
		},1);
		
		HeroBox.heroRefresh();
		HeroBox.heroNameRefresh();
		HeroBox.artefactRefresh();
		HeroBox.magicRefresh();
	}
	// close
	this.close = function() {
		$(squad.element).find('.hero').removeClass("heroopen");
		$(squad.element).find('.unit:last-child').removeClass("heroopen");
		$('#HeroBox').hide();
		//this.EffectHandler.refresh();
	}
	// close check
	this.onDocumentClick = function(e,windowtop,windowleft) {
		if ($('#HeroBox').is(":visible")){
			if ($('#SaveBox').is(":visible") && (SaveBox.type == 1)){
				return
			}
			if (($('#HeroBox').find(e.target).length == 0) && ($(e.target).is('#HeroBox') == false)) {
				HeroBox.close();
			}
		}
	}
	
	/* EBVENTS */
	{
		$('#HeroBox .hero .class').click(function() {
			// hero class klick -> um eins erhöhen
			squad.hero.clas ++;
			// damit typ auf 0 zurück
			squad.hero.typ = 0;
			// je nach rasse gib es unterschiedliche max
			if (squad.race < 4){
				if (squad.hero.clas >= HEROCLASS.length)	squad.hero.clas = 0;
			}
			else if (squad.race == 4){
				if (squad.hero.clas >= 3) squad.hero.clas = 0;
			}
			else if (squad.race == 5){
				if (squad.hero.clas >= 2) squad.hero.clas = 0;
			}
			// dem squad sagen dass sein held nun reseted wird ( level werden auf 0 gesetzt )
			squad.resetHeroSkill();
			HeroBox.heroRefresh();
			// bild anpassen
			squad.heroIconRefresh();
			EffectHandler.refresh();
		});	
		$('#HeroBox .hero .typ').click(function() {
			// klick auf hero typ  -> um eins erhöhen
			squad.hero.typ ++;
			// je nach rasse gibt es unterscheidliche max
			if (squad.race < 4){
				if (squad.hero.typ >= HEROTYPE[squad.hero.clas-1].length)	squad.hero.typ = 0;
			}
			else if (squad.race == 4){
				if (squad.hero.typ >= MONSTER_HERO[squad.hero.clas-1].length) squad.hero.typ = 0;
			}
			else if (squad.race == 5){
				if (squad.hero.typ >= MONSTER_HERO[2].length) squad.hero.typ = 0;
			}
			// nur typ veränderung also kein level reset
			HeroBox.heroRefresh();
			// bild anpassen
			squad.heroIconRefresh();
		});
		$('#HeroBox .hero .gender').click(function() {
			// gender click -> wechsel von male zu female
			squad.hero.gender = 1 - squad.hero.gender;
			if(squad.hero.gender == 0)
				$(this).addClass("male").removeClass("female");
			else
				$(this).removeClass("male").addClass("female");
			// und natürlich bild anpassen
			squad.heroIconRefresh();
		});
		$('#HeroBox .hero .name').change(function() {
			squad.hero.name = $(this).val();
		});
		$('#HeroBox .left .menu .button.clear').click(function(e) {
			squad.resetHero();
			HeroBox.artefactRefresh();
			HeroBox.heroRefresh();
			squad.heroIconRefresh();
			//HeroBox.magicRefresh();
			EffectHandler.refresh();
		});
		$('#HeroBox .artefacts td').each(function(index){
			$(this).data("id",index).click(function(e) {
				if (squad.race < 4)
					ArtefactBox.open(squad,e,$(this).data("id"));
			}).mouseenter(function(e) {
				var i = $(this).data("id");
				var html = ArtefactBox.tooltip(i,squad.hero.artefact[i].index,squad.hero.artefact[i].crystal,squad.hero.artefact);
				if (html != "") {
					Tooltip.show(e,20,20,html);
				}
			}).mouseleave(function() {
				Tooltip.hide();
			});
			
		});
		$('#HeroBox .magic .button.add').click(function(e) {
			MagicBox.open(thissquad,e);
		});
		$('#HeroBox .magic .button.clear').click(function(e) {
			squad.hero.magic = [];
			HeroBox.magicRefresh();
			EffectHandler.refresh();
		});
		$('#HeroBox .left .menu .button.save').click(function(e) {
			SaveBox.open(squad,e,1);
		});
		$('#HeroBox .hero .name').change(function() {
			thissquad.hero.name = $(this).val();
		});
	}
}
var HeroBox;

function HeroBoxMain() {
	HeroBox = new HeroBoxObject();
	$('#HeroBox .hero .class').html(HEROCLASS[0]);
	$('#HeroBox .hero .typ').css('visibility','hidden');
	$('#HeroBox .hero .gender').css('visibility','hidden');
}
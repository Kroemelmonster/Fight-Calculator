var ServerData;

function ServerDataObject() {
	this.terrain = 0;
	this.defence = {
		tower : [{typ : 0,level : 0},{typ : 0,level : 0}],
		gate : 0,
		fort : [0,0,0,0,0,0,0,0,0],
	};
	this.type = 0;
	this.maxdefence = 0;
	this.special = 0;
	this.specialTowerEffect = new Effecttype( ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [0,50,75,100]);
	this.treasure = 7;
	
	$('#ServerData .defence .building.tower').each(function(index) {
		$(this).data("id",index);
		$(this).children().data("id",index);
	}).mouseenter( function(e) {
		var html = ServerData.getTooltipBuilding($(this).data("id"));
		Tooltip.show(e,20,20,html);
	}).mouseleave(function() {
		Tooltip.hide();
	}).click(function(e) {
		if ($(e.target).hasClass("lvl") == false) {
			var index = $(this).data("id");
			ServerData.defence.tower[index].typ = 1-ServerData.defence.tower[index].typ;
			if (ServerData.defence.tower[index].typ == 0)
				$(this).removeClass("mtower").addClass("tower");
			else
				$(this).removeClass("tower").addClass("mtower");
			
			Tooltip.show(e,20,20,ServerData.getTooltipBuilding(index));
		}
	}).children().click(function(e) {
		var index = $(this).data("id");
		if (e.altKey) {
			ServerData.defence.tower[index].level = 0;
		}
		else if (e.shiftKey){
			ServerData.defence.tower[index].level = 8;
		}
		else {
			ServerData.defence.tower[index].level += 1;
			if (ServerData.defence.tower[index].level >= 9) {
				ServerData.defence.tower[index].level = 0;
			}
		}
		$(this).html(ServerData.defence.tower[index].level);
		Tooltip.show(e,20,20,ServerData.getTooltipBuilding(index));
	});
	$('#ServerData .dropdown.terrain').mouseenter( function() {
		var race = 0;
		$('#ServerData .dropdown.terrain table').show();
	}).mouseleave( function() {
		$('#ServerData .dropdown.terrain table').hide();
	}).find('td').each(function(index) {
		$(this).data("terrain",index);
	}).click(function () {
		ServerData.terrain = $(this).data("terrain");
		$('#ServerData .dropdown.terrain .show').css('background-image','url(./images/ter'+ServerData.terrain+'.png)');
		EffectHandler.refresh();
	}).mouseenter( function(e) {
		var terrain = $(this).data("terrain");
		var html = '<div class="box">';
		html += '<div class="header">'+TERRAIN_NAMES[terrain]+'</div>';
		if (terrain <= 3) {
			html += '<div class="icon defence"></div><div class="data">'+RACE_NAMES[terrain]+'<span style="color:#0f0"> +25</span></div>';
		}
		if (terrain == 4) {
			html += '<div class="icon flyer" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#0f0"> +50%</span></div><br>';
			html += '<div class="icon warrior" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#f00"> -50%</span></div>';
		}
		if (terrain == 5) {
			html += '<div class="icon warrior" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#0f0"> +50%</span></div><br>';
			html += '<div class="icon flyer" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#f00"> -50%</span></div>';
		}
		if (terrain == 6) {
			html += '<div class="icon shooter" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#0f0"> +50%</span></div><br>';
			html += '<div class="icon rider" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#f00"> -50%</span></div>';
		}
		if (terrain == 7) {
			html += '<div class="icon rider" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#0f0"> +50%</span></div><br>';
			html += '<div class="icon shooter" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#f00"> -50%</span></div>';
		}
		if (terrain == 8) {
			html += '<div class="icon merc" style="margin-right:2px"></div><div class="icon attack"></div><div class="data"><span style="color:#f00"> -50%</span></div>';
		}
		Tooltip.show(e,20,20,html);
	}).mouseleave(function() {
		Tooltip.hide();
	});
	$('#ServerData .servertyp').click(function () {
		ServerData.type = 1-ServerData.type;
		$(this).html(GENERAL.SERVERTYP[ServerData.type]);
	});
	$('#Menu .languageicon').click(function() {
		var classList =$(this).attr('class').split(/\s+/);
		$.each( classList, function(index, item){	
			if ((item != 'languageicon') && (item != '') && (item != "active")) {
				setCookie('language',item,365);
				console.log(item);
				window.location.reload();
			}
		});
	});
	$('#ServerData .defence .building.gate').mouseenter( function(e) {
		var html = ServerData.getTooltipBuilding(3);
		Tooltip.show(e,20,20,html);
	}).mouseleave(function() {
		Tooltip.hide();
	}).click(function(e) {
		ServerData.defence.gate ++;
		if (ServerData.defence.gate > 7)
			ServerData.defence.gate = 0;
		$(this).children().html(ServerData.defence.gate);
		Tooltip.show(e,20,20,ServerData.getTooltipBuilding(3));
	});
	$('#ServerData .defence td input').each(function(index) {
		$(this).data("id",index);
	}).change(function() {
		if(isNaN($(this).val()) || $(this).val() == "") {
			$(this).val(ServerData.defence.fort[$(this).data("id")]);
		}
		else {
			ServerData.defence.fort[$(this).data("id")] = parseInt($(this).val());
			if (ServerData.defence.fort[$(this).data("id")] < 0) ServerData.defence.fort[$(this).data("id")] = 0;
			else if (ServerData.defence.fort[$(this).data("id")] > 51) ServerData.defence.fort[$(this).data("id")] = 51;
			$(this).val(ServerData.defence.fort[$(this).data("id")]);
		}
		EffectHandler.refresh();
	});
	$('#ServerData .defence td .icon').mouseenter( function(e) {
		var html = ServerData.getTooltipBuilding(2);
		Tooltip.show(e,20,20,html);
	}).mouseleave(function() {
		Tooltip.hide();
	});
	$('#ServerData .button.new').click(function() {
		ServerData.defence = {
			tower : [{typ : 0,level : 0},{typ : 0,level : 0}],
			gate : 0,
			fort : [0,0,0,0,0,0,0,0,0],
		};
		$('#ServerData .defence td input').each(function() {
			$(this).val(0);
		});
		$('#ServerData .defence .building.gate').children().html(0);
		$('#ServerData .defence .building.tower').each(function() {
			$(this).children().html(0);
		});
		$('#ServerData .defence .building.mtower').each(function() {
			$(this).children().html(0);
			$(this).removeClass("mtower").addClass("tower");
		});
	});
	$('#ServerData .row.top .landdefence').mouseenter(function(e) {
		var html = '<div class="box">';
		html += '<div class="header">Ländereischutz</div>';
		if (ServerData.maxdefence == 1) {
			html += '<div class="icon defence"></div><div class="data"><span style="color:#0f0">+unendlich</span></div>';
		}
		else {
			html += '<div class="icon defence"></div><div class="data" style="opacity:0.5"><span style="color:#0f0">+unendlich</span></div>';
		}
		html += '</div>';
		Tooltip.show(e,20,20,html);
	}).mouseleave(function() {
		Tooltip.hide();
	}).click(function(e) {
		if (ServerData.maxdefence == 1) {
			ServerData.maxdefence = 0;
			$(this).css("opacity",0.7);
		}
		else {
			ServerData.maxdefence = 1;
			$(this).css("opacity",1);
		}
		var html = '<div class="box">';
		html += '<div class="header">Ländereischutz</div>';
		if (ServerData.maxdefence == 1) {
			html += '<div class="icon defence"></div><div class="data"><span style="color:#0f0">+unendlich</span></div>';
		}
		else {
			html += '<div class="icon defence"></div><div class="data" style="opacity:0.5"><span style="color:#0f0">+unendlich</span></div>';
		}
		html += '</div>';
		Tooltip.show(e,20,20,html);
		EffectHandler.refresh();
	});
	$('#ServerData .row.top .special').mouseenter(function(e) {
		var html = '<div class="box">';
		html += '<div class="header">Spezialsierung Verteidiger</div>';
		if (ServerData.special > 0) {
			html += '<div class="icon death"></div><div class="data"><span style="color:#0f0">+'+(ServerData.special*10)+'</span> pro Festung</div><br>';
			html += '<div class="icon defence"></div><div class="data"><span style="color:#0f0">+'+(ServerData.special)+'</span> pro Festung</div><br>'
			html += effect2Text(ServerData.specialTowerEffect,ServerData.special);
		}
		else {
			html += '<div class="icon death"></div><div class="data" style="opacity:0.5"><span style="color:#0f0">+'+((ServerData.special+1)*10)+'</span> pro Festung</div><br>';
			html += '<div class="icon defence"></div><div class="data" style="opacity:0.5"><span style="color:#0f0">+'+((ServerData.special+1))+'</span> pro Festung</div><br>'
			html += '<div style="opacity:0.5">'+effect2Text(ServerData.specialTowerEffect,(ServerData.special+1))+'</div>';
		}
		html += '</div>';
		Tooltip.show(e,20,20,html);
	}).mouseleave(function() {
		Tooltip.hide();
	}).click(function(e) {
		ServerData.special++;
		if (ServerData.special == 4) {
			ServerData.special = 0;
		}
		var html = '<div class="box">';
		html += '<div class="header">Spezialsierung Verteidiger</div>';
		if (ServerData.special > 0) {
			$(this).css("opacity",1);
			html += '<div class="icon death"></div><div class="data"><span style="color:#0f0">+'+(ServerData.special*10)+'</span> pro Festung</div><br>';
			html += '<div class="icon defence"></div><div class="data"><span style="color:#0f0">+'+(ServerData.special)+'</span> pro Festung</div><br>'
			html += effect2Text(ServerData.specialTowerEffect,ServerData.special);
		}
		else {
			$(this).css("opacity",0.7);
			html += '<div class="icon death"></div><div class="data" style="opacity:0.5"><span style="color:#0f0">+'+((ServerData.special+1)*10)+'</span> pro Festung</div><br>';
			html += '<div class="icon defence"></div><div class="data" style="opacity:0.5"><span style="color:#0f0">+'+((ServerData.special+1))+'</span> pro Festung</div><br>'
			html += '<div style="opacity:0.5">'+effect2Text(ServerData.specialTowerEffect,(ServerData.special+1))+'</div>';
		}
		html += '</div>';
		Tooltip.show(e,20,20,html);
		EffectHandler.refresh();
	});
	this.getRawTowerDamage = function(index, notmultipli) {
		return this.getRawTowerDamageWithLevel(index,ServerData.defence.tower[index].level,notmultipli,ForceDefender[0].army);
	}
	this.getRawTowerDamageWithLevel = function(index, lvl, notmultipli, army) {
		var damage = 0;
		if (army == null)
			army = ForceDefender[0].army;
		if (lvl == 0 || lvl >= 9 || (lvl == 8 && ForceDefender[0].race == 5))
			return 0;
		if (ServerData.defence.tower[index].typ == 0){
			// normalen Schaden holen und verechnen mit chance
			if (ForceDefender[0].race == 5)
				damage = BURG_TOWER_DAMAGE[lvl-1][0]+ ((BURG_TOWER_DAMAGE[lvl-1][1]-BURG_TOWER_DAMAGE[lvl-1][0])*(ForceDefender[0].chance/2.0));
			else
				damage = TOWER_DAMAGE[lvl-1][0]+ ((TOWER_DAMAGE[lvl-1][1]-TOWER_DAMAGE[lvl-1][0])*(ForceDefender[0].chance/2.0));
			if (!notmultipli)
				damage = damage * Math.max(0,ForceDefender[0].effect.tower/100);
		}
		else {
			var multi;
			if (ForceDefender[0].race == 5)
				multi = BURG_MTOWER_DAMAGE[lvl-1];
			else
				multi = MTOWER_DAMAGE[lvl-1];
			for(var i = 0;(i < army.length); i++) {
				damage += ForceDefender[0].army[i].getAttack(1) * army[i].amount * Math.max(0.1,( ForceDefender[0].army[i].effect.attack/100));
			}
			damage = damage * multi;
			if (!notmultipli)
				damage = damage * Math.max(0,ForceDefender[0].effect.mtower/100); 
		}
		return damage;
	}
	this.getTowerDamage = function(index) {
		var damage = [ServerData.getRawTowerDamage(0),ServerData.getRawTowerDamage(1)];
		var block = 0;
		for(var i = 0;(i < ForceAttacker.length); i++) {
			block += ForceAttacker[i].army[7].getSpecial() * ForceAttacker[i].army[7].amount * Math.max(ForceAttacker[i].army[7].effect.special/100,0);
		}
		if (damage[0]+damage[1] <= block) {
			return 0;
		}
		if (damage[0] < damage[1]) {
			var blockindi = Math.min(damage[0],block/2);
			damage[0] -= blockindi;
			damage[1] -= (block-blockindi);
		}
		else {
			var blockindi = Math.min(damage[1],block/2);
			damage[1] -= blockindi;
			damage[0] -= (block-blockindi);
		}
		return damage[index];
	}	
	this.getTooltipBuilding = function(typ) {
		var html = '<div class="box">';
		if (ForceDefender[0].race == 4) return "";
		if (typ <= 1) {
			if (ServerData.defence.tower[typ].typ == 0){
				html += '<div class="header">'+GENERAL.TOWER+'</div>';
				html += '<div class="icon attack"></div><div class="data">';
				var rawdamage = ServerData.getRawTowerDamage(typ,true);
				var block = ServerData.getRawTowerDamage(typ) - ServerData.getTowerDamage(typ);
				html += Trenner(Math.floor(rawdamage)) +'</div>';
				if (ForceDefender[0].effect.tower != 100) {
					var rawdamage2 = ServerData.getRawTowerDamage(typ,false);
					if (ForceDefender[0].effect.tower < 100) {
						html += '<br><div class="icon sprite-magic-turmfluch" style="background-image:url(./images/magic.png)"></div><div class="data">';
						html += Trenner(Math.floor(rawdamage2));
						if (ForceDefender[0].effect.tower > 0) html += ' (<span style="color:#f00">'+(ForceDefender[0].effect.tower-100)+'%</span>)</div>';
						else html += ' (<span style="color:#f80">-100%</span>)</div>';
					}
					else{
						html += '<br><div class="icon sprite-magic-turm" style="background-image:url(./images/magic.png)"></div><div class="data">';
						html += Trenner(Math.floor(rawdamage2));
						html += ' (<span style="color:#0f0">+'+(ForceDefender[0].effect.tower-100)+'%</span>)</div>';
					}
				}
				if (block) {
					html += '<br><div class="icon mage"></div><div class="data"><span style="color:#f80"> -'+Trenner(Math.floor(block))+'</span></div>';
				}
			}
			else {
				html += '<div class="header">'+GENERAL.MTOWER+'</div>';
				html += '<div class="icon attack"></div><div class="data">';
				var rawdamage = ServerData.getRawTowerDamage(typ,true);
				var block = ServerData.getRawTowerDamage(typ) - ServerData.getTowerDamage(typ);
				html += Trenner(Math.floor(rawdamage))  +'</div>';
				if (ForceDefender[0].effect.mtower != 100) {
					var rawdamage2 = ServerData.getRawTowerDamage(typ,false);
					if (ForceDefender[0].effect.mtower < 100) {
						html += '<br><div class="icon sprite-magic-mturmfluch" style="background-image:url(./images/magic.png)"></div><div class="data">';
						html += Trenner(Math.floor(rawdamage2));
						if (ForceDefender[0].effect.mtower > 0) html += ' (<span style="color:#f00">'+(ForceDefender[0].effect.mtower-100)+'%</span>)</div>';
						else html += ' (<span style="color:#f80">-100%</span>)</div>';
					}
					else{
						html += '<br><div class="icon sprite-magic-mturm" style="background-image:url(./images/magic.png)"></div><div class="data">';
						html += Trenner(Math.floor(rawdamage2));
						html += ' (<span style="color:#0f0">+'+(ForceDefender[0].effect.mtower-100)+'%</span>)</div>';
					}
				}
				if (block) {
					html += '<br><div class="icon mage"></div><div class="data"><span style="color:#f80"> -'+Trenner(Math.floor(block))+'</span></div>';
				}
			}
		}
		else if (typ == 2){
			html += '<div class="header">'+GENERAL.FORT+'</div>';
			var def = 0;
			var kill = 0;
			if (ForceDefender[0].race != 5) {
				for(var i = 0;(i < 8); i++) {
					def += (FORT_DEFENSE[i] + ServerData.special) * ServerData.defence.fort[i];
					kill += (FORT_KILL[i] + (ServerData.special * 10)) * ServerData.defence.fort[i];
				}
			}
			else {
				for(var i = 0;(i < 7); i++) {
					def += (BURG_FORT_DEFENSE[i]) * ServerData.defence.fort[i];
					kill += (BURG_FORT_KILL[i]) * ServerData.defence.fort[i];
				}
			}
			kill = kill * Math.max(0,ForceDefender[0].effect.fort/100);
			html += '<div class="icon defence"></div><div class="data">'+def+'</div>';
			html += '<br><div class="icon death"></div><div class="data">'+Trenner(kill)+'</div>';
			
		}
		else if (typ == 3) {
			html += '<div class="header">'+GENERAL.GATE+'</div>';
			if (ServerData.defence.gate >= 1 && ForceDefender[0].race == 5){
				var hp = 0;
				for (var i = 0; (i < ForceDefender[0].army.length); i++) {
					hp += ForceDefender[0].army[i].getCalculatedHp() * ForceDefender[0].army[i].amount;
				}
				hp = hp/10;
				html += '<div class="icon hp"></div><div class="data">'+Trenner(GATE_DEFENCE[ServerData.defence.gate-1])+'</div>';
				html += '<br><div class="icon gatedefence"></div><div class="data">'+Trenner(Math.floor(hp))+'</div>';
				html += '<br><div class="icon defence"></div><div class="data">'+Trenner(GATE_BLOCK[ServerData.defence.gate-1])+'</div>';
			}
			html += '<br>'+TOOLTIP.GATEDONT;
		}
		html += '</div>';
		return html;
	}
		
	this.saveFight = function() {
		/*
		 * A:xxxx;xxx;xxx;xxx;
		 * D:xxx;xxxx;xxx;
		 * S:xxxxx
		 */
		var code = 'A:';
		for(var i = 0;(i < ForceAttacker.length); i++) {
			code += ForceAttacker[i].toCode();
			code += ";";
		}
		code += 'D:';
		for(var i = 0;(i < ForceDefender.length); i++) {
			code += ForceDefender[i].toCode();
			code += ";";
		}
		code += 'S:';
		code += CHARS.charAt(this.terrain + (this.type << 4) + (this.maxdefence << 5)); // terrain = 16 , type = 2, max defence = 2  mit 6 belegt
		code += CHARS.charAt(this.treasure + (this.special << 3)); // treasure = 8, special = 4 mit 5 belegt
		
		code += CHARS.charAt(this.defence.tower[0].level);
		code += CHARS.charAt(this.defence.tower[0].typ);
		code += CHARS.charAt(this.defence.tower[1].level);
		code += CHARS.charAt(this.defence.tower[1].typ);
		
		code += CHARS.charAt(this.defence.gate);
		
		for (var i = 0;( i < this.defence.fort.length); i++) {
			code += CHARS.charAt(this.defence.fort[i]);
		}
		
		return code;
	}
	this.saveFightAttacker = function() {
		/*
		 * A:xxxx;xxx;xxx;xxx;
		 * D:xxx;xxxx;xxx;
		 * S:xxxxx
		 */
		var code = 'A:';
		for(var i = 0;(i < ForceAttacker.length); i++) {
			code += ForceAttacker[i].toCode();
			code += ";";
		}
		return code;
	}
	this.saveFightDefender = function() {
		/*
		 * A:xxxx;xxx;xxx;xxx;
		 * D:xxx;xxxx;xxx;
		 * S:xxxxx
		 */
		
		var code = 'D:';
		for(var i = 0;(i < ForceDefender.length); i++) {
			code += ForceDefender[i].toCode();
			code += ";";
		}
		return code;
	}
	this.saveFightDefence = function() {
		var code = 'S:';
		code += CHARS.charAt(this.terrain + (this.type << 4) + (this.maxdefence << 5)); // terrain = 16 , type = 2, max defence = 2  mit 6 belegt
		code += CHARS.charAt(this.treasure + (this.special << 3)); // treasure = 8, special = 4 mit 5 belegt
		
		code += CHARS.charAt(this.defence.tower[0].level);
		code += CHARS.charAt(this.defence.tower[0].typ);
		code += CHARS.charAt(this.defence.tower[1].level);
		code += CHARS.charAt(this.defence.tower[1].typ);
		
		code += CHARS.charAt(this.defence.gate);
		
		for (var i = 0;( i < this.defence.fort.length); i++) {
			code += CHARS.charAt(this.defence.fort[i]);
		}
		
		return code;
	}
	
	
	this.loadFight = function(code) {
		var split = code.split(":");
		if (split.length != 4) return "failed";
		if (split[0] != "A") return "failed";
		
		var attacker = split[1].split(";");
		
		for (var i = 0; (i < attacker.length-1);i++) {
			if (ForceAttacker[i].loadCode(attacker[i]) == "failed")
				return "failed";
			else {
				ForceAttacker[i].reloadElement();
				ForceAttacker[i].heroIconRefresh();
			}
		}
		
		for (var i = attacker.length-1; (i < 3);i++) {
			ForceAttacker[attacker.length-1].hide();
		}
		
		
		if (attacker[attacker.length-1] != "D") return "failed";
		
		var defender = split[2].split(";");
		
		for (var i = 0; (i < defender.length-1);i++) {
			if (ForceDefender[i].loadCode(defender[i]) == "failed")
				return "failed";
			else {
				ForceDefender[i].reloadElement();
				ForceDefender[i].heroIconRefresh();
			}
		}
		
		for (var i = defender.length-1; (i < 4);i++) {
			ForceDefender[defender.length-1].hide();
		}
		
		if (defender[defender.length-1] != "S") return "failed";
		
		var code = split[3];
		
		var id = GetCharPosition(code.charAt(0));
		this.maxdefence = id >> 5;
		if (this.maxdefence > 0)
			$('#ServerData .row.top .landdefence').css("opacity",1.0);
		id -= (this.maxdefence << 5);
		this.type = id >> 4;
		id -= (this.type << 4);
		this.terrain = id;
		$('#ServerData .servertyp').html(GENERAL.SERVERTYP[this.type]);
		$('#ServerData .dropdown.terrain .show').css('background-image','url(./images/ter'+this.terrain+'.png)');
		code = code.substring(1);
		
		var id = GetCharPosition(code.charAt(0));
		this.special = id >> 3;
		if (this.special > 0)
			$('#ServerData .row.top .special').css("opacity",1.0);
		this.treasure = (id - (this.defence.special << 3));
		code = code.substring(1);
		
		this.defence.tower[0].level = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		this.defence.tower[0].typ = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		this.defence.tower[1].level = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		this.defence.tower[1].typ = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		
		$('#ServerData .defence .building.tower').each(function(index) {
			if (ServerData.defence.tower[index].typ == 1)
				$(this).removeClass("tower").addClass("mtower");
			
			$(this).children().html(ServerData.defence.tower[index].level);
		});
		
		
		var id = GetCharPosition(code.charAt(0));
		this.defence.gate = id;
		code = code.substring(1);
		
		$('#ServerData .defence .building.gate').children().html(this.defence.gate);
		
		for (var i = 0;( i < this.defence.fort.length); i++) {
			this.defence.fort[i] = GetCharPosition(code.charAt(0));
			$('#ServerData .defence td input').each(function(index) {
				$(this).val(ServerData.defence.fort[index]);
			});
			code = code.substring(1);
		}
		
		return "success";
	}
	
	$('#ServerData .Link').click(function() {
		//window.open('http://localhost/Kampfrechner/calc.php?d='+ServerData.saveFight());
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+ServerData.saveFight());
	});
	$('#ServerData .rune.sprite-rune-f').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	$('#ServerData .rune.sprite-rune-u').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGU8eqq0wq9cwqL3qqGwwqdJqq56wqoEqqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGU8eqq0wq9cwqL3qqGwwqdJqq56wqoEqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGU8eqq0wq9cwqL3qqGwwqdJqq56wqoEqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	$('#ServerData .rune.sprite-rune-th').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGU5tqtAeqnYwqjJwqUbwq5XqqU8eq5XqqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGU5tqtAeqnYwqjJwqUbwq5XqqU8eq5Xqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGU5tqtAeqnYwqjJwqUbwq5XqqU8eq5Xqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	/*
	$('#ServerData .rune.sprite-rune-eo').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;atNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	$('#ServerData .rune.sprite-rune-r').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;atNqJJGGdeqogwqU(qqtFqqnOqqEbqqnYwqxxqqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});*/
	$('#ServerData .rune.sprite-rune-t').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGnIpq1wtqU8eqExeqGdeqogwqxqzqxuwqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGnIpq1wtqU8eqExeqGdeqogwqxqzqxuwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGnIpq1wtqU8eqExeqGdeqogwqxqzqxuwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	$('#ServerData .rune.sprite-rune-x').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGjjaqqzzqt0eqn5eqnZeqEOwqVbzq1lwqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGjjaqqzzqt0eqn5eqnZeqEOwqVbzq1lwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGjjaqqzzqt0eqn5eqnZeqEOwqVbzq1lwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	$('#ServerData .rune.sprite-rune-ia').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGjfdqoozqq7rqEZrqosrqoFwq5SuqxZwqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGjfdqoozqq7rqEZrqosrqoFwq5SuqxZwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGjfdqoozqq7rqEZrqosrqoFwqdJqqxZwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
	$('#ServerData .rune.sprite-rune-h').click(function() {
		var link = ServerData.saveFightAttacker();
		link += 'D:JtNqJJGjfdqoozqq7rqEZrqosrqoFwq5SuqxZwqwtqSSSSSSSSSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppqqqqqqqq;JtNqJJGjfdqoozqq7rqEZrqosrqoFwq5SuqxZwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;JtNqJJGjfdqoozqq7rqEZrqosrqoFwqdJqqxZwqwdqxxxxxxxxxqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpppwqqqqqqq;';
		link += ServerData.saveFightDefence();
		window.open('http://kroemelcombat.bplaced.net/calc.php?d='+link);
	});
}

function ServerDataMain() {
	ServerData = new ServerDataObject();
}
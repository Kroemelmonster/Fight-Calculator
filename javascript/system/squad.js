function Squad(element, side) {
	this.race = 0;
	this.level = 2;
	this.name = "";
	this.chance = 0;
	this.renegade = 0;
	this.retreat = 50;
	this.element = element;
	this.side = side;
	
	this.army = [
		new Unit(0,this),
		new Unit(1,this),
		new Unit(2,this),
		new Unit(3,this),
		new Unit(4,this),
		new Unit(5,this),
		new Unit(6,this),
		new Unit(7,this)
	]
	
	this.hero = {
		clas : 0,
		typ : 0,
		gender : 0,
		name : "",
		artefact : [
	        new Artefact(0),
	        new Artefact(1),
	        new Artefact(2),
	        new Artefact(3),
	        new Artefact(4),
	        new Artefact(5),
	        new Artefact(6),
	        new Artefact(7),
	        new Artefact(8),
        ],
		skill : [0,0,0,0,0,0,0,0,0,0,0,0],
		magic : [],
	}
	
	this.effect = {
		maxdefence : 50,
		basicdefence : 0,
		armydamage : 100,
		fort : 100,
		tower : 100,
		mtower : 100,
		gate : 100,
		terror : 0,
		fearless : 0,
		death : 0,
		catapult : 0,
		exp : [100,100,100,100,100,100],
		necro : [0,0,0],
		damage : 0,		// einkommender Schaden
		fortdeath : 0,	// einkommender Tod
	}
	
	var thissquad = this;
	this.ui = new uiSquad(element,this);
	
	this.fractionFactor = function(othersquad) {
		if (othersquad.race == 4 || othersquad.race == 5)
			return 0;
		if (othersquad.renegade == 1)
			return 1;
		if ((this.race == 0 || this.race == 1) &&  (othersquad.race == 2 || othersquad.race == 3)) {
			return -1;
		}
		if ((this.race == 2 || this.race == 3) &&  (othersquad.race == 0 || othersquad.race == 1)) {
			return -1;
		}
		return 1;
	}
	
	this.updatelevel = function() {
		if (this.race != 4) {
			for(var i = 0; (i < this.army.length); i++) {
				this.army[i].level = this.level;
			}
		}
		else {
			for(var i = 0; (i < this.army.length); i++) {
				this.army[i].level = 0;
			}
			if (this.level == 1) this.army[2].level = 1;
			else if (this.level == 2) {
				this.army[0].level = 1;
				this.army[3].level = 1;
			}
			else if (this.level == 3) {
				this.army[0].level = 2;
				this.army[1].level = 1;
				this.army[4].level = 1;
				this.army[5].level = 1;
				this.army[6].level = 1;
				this.army[7].level = 1;
			}
			else if (this.level == 4) {
				this.army[0].level = 2;
				this.army[5].level = 2;
				this.army[6].level = 2;
				this.army[7].level = 2;
			}
			else if (this.level == 5){
				for(var i = 0; (i < this.army.length); i++) {
					this.army[i].level = 2;
				}
			}
		}
		for(var i = 0; (i < thissquad.army.length); i++) {
			var y = 0;
			if (thissquad.army[i].amount > 0) y = 3;
			$(element).find('.unit').eq(i).css('background-position','-'+(i*68)+' -'+((thissquad.army[i].level+y)*82));
		}
	}
	this.updaterace = function(old) {	
		$(element).find('.hero').removeClass().addClass('hero sprite-heroes-HERO'+HEROICON_RACE[this.race]+"_BACK");
		if ((old < 4) && (this.race < 4)){
		
		}
		else {
			this.hero.clas = 0;
			this.hero.typ = 0;
			
			// artefacte loeschen ( da monster und sippenburgen festeglegt bekommen )
			for (var i = 0; i < this.hero.artefact.length; i++)
				this.hero.artefact[i].reset();
		}
		if ((old != 4) && (this.race == 4)) {
			this.level = 5;
			this.retreat = 100;
			$(element).find('.retreat > input').val(this.retreat);
			$(element).find('.button.level').html(this.level+1);
			this.updatelevel();
		}
		if ((old >= 4) && (this.race < 4)) {
			this.level = 2;
			this.retreat = 50;
			$(element).find('.retreat > input').val(this.retreat);
			$(element).find('.button.level').html(this.level+1);
			this.updatelevel();
		}
		if ((this.race == 5) && (old != 5)) {
			this.level = 2;
			this.retreat = 100;
			$(element).find('.retreat > input').val(this.retreat);
			$(element).find('.button.level').html(this.level+1);
			this.updatelevel();
		}
		
		if (this.hero.clas == 0) {
			$(element).find('.hero .heroimage').removeClass().addClass("heroimage sprite-heroes-HERO"+HEROICON_RACE[this.race]);
		}
		EffectHandler.refresh();
	}
	this.updateName = function(name) {
		this.name = name;
		$(this.element).find('.name > input').val(this.name);
	}
	
	this.toCode = function() {
		var code = "";
		code += CHARS.charAt(this.renegade + (this.level << 1) + (this.chance << 4)); // rengade = 2, level = 4, chance = 4 : 2 mit 5
		code += CHARS.charAt(this.race); // race = 8 : 8 mit 3
		code += CHARS.charAt(this.retreat-50);
		code += CHARS.charAt(this.name.length); // length = 16 : 4 mit 4
		code += this.name;
		var currentnumber = 0;
		var index = 4;
		for (var i = 0; (i < this.army.length); i++) {  // level = 4 damit passen 3 auf einmal rein
			currentnumber += this.army[i].level << index;
			if (index == 0) {
				code += CHARS.charAt(currentnumber);
				index = 4;
				currentnumber = 0;
			}
			else {
				index -= 2;
			}
		}
		if (index != 4) {code += CHARS.charAt(currentnumber);}
		// laenge 7 + (15 Name)
		for (var i = 0; (i < this.army.length); i++) { // nun die anzahl
			code += Number2Char(this.army[i].amount,4);
		}
		// laenge 39 + (15 Name)
		code += this.heroToCode(true);
		return code;
	}
	this.loadCode = function(code) {
		if (code.length  < 39) return "failed"; // kann garnicht reichen
		// daten in einen testsquad laden
		var test = new Squad(null);
		var id = GetCharPosition(code.charAt(0));
		test.chance = id >> 4;
		test.level = (id - (test.chance << 4)) >> 1;
		test.renegade = id - (test.chance << 4) - (test.level << 1)
		code = code.substring(1);
		test.race = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		test.retreat = GetCharPosition(code.charAt(0))+50;
		code = code.substring(1);
		var length = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		test.name = code.substring(0,length);
		code = code.substring(length);
		for (var i = 0; (i < test.army.length); i+=3) {
			id = GetCharPosition(code.charAt(0));
			test.army[i].level = id >> 4;
			test.army[i+1].level = (id - (test.army[i].level << 4)) >> 2;
			if( i < 6) test.army[i+2].level = id - (test.army[i].level << 4) - (test.army[i+1].level << 2);
			code = code.substring(1);
		}
		for (var i = 0; (i < test.army.length); i++) {
			test.army[i].amount = Char2Number(code.substring(0,4));
			code = code.substring(4);
		}
		// nun �berpr�fen ob es passt
		if ((test.chance < 0) || (test.chance >= 3)) return "failed";
		if ((test.level < 0) || (test.level >= 6)) return "failed";
		if ((test.renegade < 0) || (test.renegade >= 2)) return "failed";
		if ((test.race < 0) || (test.race >= 6)) return "failed";
		if ((test.race < 4 ) && (test.level >= 3)) return "failed";
		if ((test.race == 5) && (test.level != 2)) return "failed";
		if ((test.retreat < 50) || (test.retreat > 100)) return "failed";
		if ((test.name.length > 16)) return "failed";
		for (var i = 0; (i < test.army.length); i++) {
			if ((test.army[i].level < 0) || (test.army[i].level >= 3)) return "failed";
			if ((test.army[i].amount < 0)) return "failed";
		}
		// nun daten ins echte �bertragen
		this.chance = test.chance;
		this.level = test.level;
		this.renegade = test.renegade;
		this.race = test.race;
		this.retreat = test.retreat;
		this.name = test.name;
		for (var i = 0; (i < test.army.length); i++) {
			this.army[i].level = test.army[i].level;
			this.army[i].amount = test.army[i].amount;
		}
		var error = this.heroLoadCode(code,true)
		if (error != "success") {
			return error;
		}
		return "success"
	}	
	this.heroToCode = function(withMagic) {
		var code = "";
		if (this.race < 4)
			code += CHARS.charAt(0);
		else if(this.race == 4)
			code += CHARS.charAt(1);
		else 
			code += CHARS.charAt(2);
		
		code += CHARS.charAt(this.hero.gender + (this.hero.clas << 1) + (this.hero.typ << 3)); // gender = 2, class = 4, typ = 8 : voll
		// absicherung monster hero nur ladbar bei monster rasse
		code += CHARS.charAt(this.hero.name.length); // length = 16 : 4 mit 4
		code += this.hero.name;
		var index = 5;
		var currentnumber = 0;
		// nun alle Artefacte
		for(var i = 0; (i < this.hero.artefact.length); i++) {
			code += CHARS.charAt(this.hero.artefact[i].index+1);
		}
		// nun die runen :S jedes arte kann bis zu 4 haben sprich 9 mögliche runen können max 4 sein also 3 in ein string
		for(var i = 0; (i < this.hero.artefact.length); i++) {
			code += CHARS.charAt(this.hero.artefact[i].rune[0] + (this.hero.artefact[i].rune[1] << 3));
			code += CHARS.charAt(this.hero.artefact[i].rune[2] + (this.hero.artefact[i].rune[3] << 3));
			code += CHARS.charAt(this.hero.artefact[i].rune[4] + (this.hero.artefact[i].rune[5] << 3));
			code += CHARS.charAt(this.hero.artefact[i].rune[6] + (this.hero.artefact[i].rune[7] << 3));
			code += CHARS.charAt(this.hero.artefact[i].rune[8] + (this.hero.artefact[i].crystal << 3));
			// nun die variation des runenwortes + crystal zu gleich
			
			code += CHARS.charAt(this.hero.artefact[i].runeword);
		}
		// laenge = 15 + (15 Name)
		// nun die skill level wovon je 2 in einen reinapssen
		for(var i = 0; (i < this.hero.skill.length); i+=2) {
			code += CHARS.charAt(this.hero.skill[i] + (this.hero.skill[i+1] << 3)); 
		}
		if (withMagic) {
			// laenge = 21 + (15 Name)
			// nun magic, um etwas an der l�nge zu optimieren wird sowohl der startwert als auch der endwert gespeichert.
			// Sollte es also nur eine magic geben, dann ist der code 4 zeilen lang, im worst case hat der user die erste und letze magic geskillt.
			// dann ist es 77 + 4 lang. Aber im durchscnittlichen Verfahren ist dies der einfachste und k�rzeste Code
			var min = 0;
			var max = 0;
			for(var i = 0; (i < this.hero.magic.length); i++) {
				if (this.hero.magic[i]) {
					if (min == 0)
						min = i;
					max = i;
				}
			}
			code += Number2Char(min,2);
			code += Number2Char(max,2);
			
			var index = 3;
			var currentnumber = 0;
			for(var i = min; (i <= max); i++) {
				if (this.hero.magic[i]){
					currentnumber += (this.hero.magic[i]+1) << index;
				}
				if (index == 0) {
					code += CHARS.charAt(currentnumber);
					index = 3;
					currentnumber = 0;
				}
				else {
					index -= 3;
				}
			}
			if (index == 0) {
				code += CHARS.charAt(currentnumber);
			}
		}
		// laenge = 25 + (15 Name) + (77 Magic )
		return code;
	}	
	this.heroLoadCode = function(code, withMagic) {
		// daten in einen testsquad laden
		var test = new Squad(null);
		var id = GetCharPosition(code.charAt(0));
		var race = id;
		
		if (race == 0 && this.race >= 4) {
			return "This is a Player Hero";
		}
		if (race == 1 && this.race != 4) {
			return "This is a Monster Hero";
		}
		if (race == 2 && this.race != 5) {
			return "This is a Stronghold Hero";
		}
		
		code = code.substring(1);
		id = GetCharPosition(code.charAt(0));
		test.hero.typ = id >> 3;
		test.hero.clas = (id - (test.hero.typ << 3)) >> 1;
		test.hero.gender = id - (test.hero.typ << 3) - (test.hero.clas << 1)
		code = code.substring(1);
		var length = GetCharPosition(code.charAt(0));
		code = code.substring(1);
		test.hero.name = code.substring(0,length);
		code = code.substring(length);
	
		for(var i = 0; (i < test.hero.artefact.length); i++) {
			test.hero.artefact[i].index = GetCharPosition(code.charAt(0))-1;
			code = code.substring(1);
		}
		for(var i = 0; (i < test.hero.artefact.length); i++) {
			id = GetCharPosition(code.charAt(0));
			
			test.hero.artefact[i].rune[1] = id >> 3;
			test.hero.artefact[i].rune[0] = (id - (test.hero.artefact[i].rune[1] << 3));
			code = code.substring(1);
			id = GetCharPosition(code.charAt(0));
			test.hero.artefact[i].rune[3] = id >> 3;
			test.hero.artefact[i].rune[2] = (id - (test.hero.artefact[i].rune[3] << 3));
			code = code.substring(1);
			id = GetCharPosition(code.charAt(0));
			test.hero.artefact[i].rune[5] = id >> 3;
			test.hero.artefact[i].rune[4] = (id - (test.hero.artefact[i].rune[5] << 3));
			code = code.substring(1);
			id = GetCharPosition(code.charAt(0));
			test.hero.artefact[i].rune[7] = id >> 3;
			test.hero.artefact[i].rune[6] = (id - (test.hero.artefact[i].rune[7] << 3));
			code = code.substring(1);
			id = GetCharPosition(code.charAt(0));
			test.hero.artefact[i].crystal = id >> 3;
			test.hero.artefact[i].rune[8] = (id - (test.hero.artefact[i].crystal << 3));
			test.hero.artefact[i].crystal = (test.hero.artefact[i].crystal == 1);
			code = code.substring(1);
			id = GetCharPosition(code.charAt(0));
			test.hero.artefact[i].runeword = id;
			code = code.substring(1);
		}
		
		for(var i = 0; (i < test.hero.skill.length); i+=2) {
			var id = GetCharPosition(code.charAt(0));
			test.hero.skill[i+1] = id >> 3;
			test.hero.skill[i] = (id - (test.hero.skill[i+1] << 3));
			code = code.substring(1);
		}
		
		if (withMagic) {
			var min = Char2Number(code.substring(0,2));
			code = code.substring(2);
			var max = Char2Number(code.substring(0,2));
			code = code.substring(2);
			
			
			var index = 3;
			var currentnumber = GetCharPosition(code.charAt(0));
			code = code.substring(1);
			
			for(var i = min; (i <= max); i++) {
				var id = currentnumber >> index;
				if (id > 0) {
					test.hero.magic[i] = id-1;
				}
				currentnumber -= (id << index);
				if (index == 0) {
					currentnumber = GetCharPosition(code.charAt(0));
					code = code.substring(1);
					index = 3;
				}
				else
					index -= 3;
			}
		}
		// nun �berpr�fen ob es passt
		if ((test.hero.clas < 0) || (test.hero.clas >= 4)) return "failed";
		if ((test.hero.type < 0) || (test.hero.type >= 6)) return "failed";
		if ((test.hero.gender < 0) || (test.hero.gender >= 2)) return "failed";
		// nun daten ins echte �bertragen
		this.hero.clas = test.hero.clas;
		this.hero.typ = test.hero.typ;
		this.hero.gender = test.hero.gender;
		this.hero.name = test.hero.name;
		this.hero.artefact = $.extend(true, [], test.hero.artefact);
		this.hero.magic = $.extend(true, [], test.hero.magic);
		this.hero.skill = $.extend(true, [], test.hero.skill);
		return "success"
	}
	this.reloadElement = function(){
		this.ui.reloadElement();
	}
	this.enablehide = function () {
		this.ui.enablehide();
	}
	this.hide = function() {
		this.ui.hide();
	}
	this.show = function() {
		this.ui.show();
	}
	
	
	this.resetHeroSkill = function() {
		this.hero.skill = [0,0,0,0,0,0,0,0,0,0,0,0];
	}
	this.resetEffect = function() {
		this.effect = {
			maxdefence : 50,
			basicdefence : 0,
			armydamage : 100,
			fort : 100,
			tower : 100,
			mtower : 100,
			gate : 100,
			terror : 0,
			fearless : 0,
			death : 0,
			catapult : 0,
			exp : [100,100,100,100,100,100],
			necro : [0,0,0],
			damage : 0,		// einkommender Schaden
			fortdeath : 0,	// einkommender Tod
		}
		for(var i = 0;(i < this.army.length); i++) {
			this.army[i].resetEffect();
		}
	}
	this.resetHero = function() {
		this.resetHeroSkill();
		this.hero.magic = [];
		for (var i = 0; i < this.hero.artefact.length; i++)
			this.hero.artefact[i].reset();
		this.hero.clas = 0;
		this.hero.typ = 0;
		this.hero.gender = 0;
		this.hero.name = "";
	}
	
	this.heroIconRefresh = function() {
		this.ui.heroIconRefresh();
	}
}	

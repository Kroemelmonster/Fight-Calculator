function Unit(id, squad) {
	this.id = id;
	this.level = 2;
	this.squad = squad;
	this.amount = 0;
	this.hp = 0;
	
	this.effect = {
		attack : 100,
		roundattack : 0,
		hp : 100,
		defence : 0,
		special : 100,
		cost : 100,
		mage : 0,
	};
	
	this.resetEffect = function() {
		this.effect = {
			attack : 100,
			roundattack : 0,
			hp : 100,
			defence : 0,
			special : 100,
			cost : 100,
			mage : 0,
		};
	};
	
	this.getAttack = function(chance) {
		// okoarcher
		if ((ServerData.type == 2) && (this.id == 4)) {
			if (chance == 0)
				return SERVEROKOARCHER[this.level]["Attack"][0];
			else if (chance == 1)
				return Math.floor((SERVEROKOARCHER[this.level]["Attack"][0]+SERVEROKOARCHER[this.level]["Attack"][1])/2);
			else
				return SERVEROKOARCHER[this.level]["Attack"][1];
		}
		// demon mercs
		if ((this.squad.race == 2) && (this.id == 6)){
			if (chance == 0)
				return RACEUNIT[2][this.level][0];
			else if (chance == 1)
				return Math.floor((RACEUNIT[2][this.level][1]+RACEUNIT[2][this.level][0])/2);
			else
				return RACEUNIT[2][this.level][1];
		}
		else {
			if (chance == 0)
				return UNITDATA[this.id][this.level]["Attack"][0];
			else if (chance == 1)
				return Math.floor((UNITDATA[this.id][this.level]["Attack"][0]+UNITDATA[this.id][this.level]["Attack"][1])/2);
			else
				return UNITDATA[this.id][this.level]["Attack"][1];
		}
	}
	this.getHp = function() {
		// okoarcher
		if ((ServerData.type == 2) && (this.id == 4)) {
			return SERVEROKOARCHER[this.level]["Hp"];
		}
		return UNITDATA[this.id][this.level]["Hp"];
	}
	this.getSpecial = function() {
		if ((this.squad.race == 0) && (this.id == 0))
			return RACEUNIT[0][this.level];
		else if ((this.squad.race == 1) && (this.id == 5))
			return RACEUNIT[1][this.level];
		else if ((this.squad.race == 3) && (this.id == 7))
			return RACEUNIT[3][this.level];
		else if ((this.squad.race >= 4) && (this.id == 0))
			return RACEUNIT[this.squad.race][this.level];
		else 
			return UNITDATA[this.id][this.level]["Special"];
	}
	this.getCost = function() {
		return UNITDATA[this.id][this.level]["Lohn"];
	}
	this.getScore = function() {
		if (this.squad.race < 4) return UNITDATA[this.id][this.level]["Ranking"][0];
		else if(this.squad.race == 4) return UNITDATA[this.id][this.level]["Ranking"][1];
		else return UNITDATA[this.id][this.level]["Ranking"][0] * 2;
	}
	this.getCalculatedHp = function() {
		var hp = this.getHp();
		var defence = Math.max(0,Math.min(this.effect.defence + this.squad.effect.basicdefence,Math.min(this.squad.effect.maxdefence,75)));
		return hp * Math.max(0.25,(this.effect.hp/100)) * (100/(100-defence));
	}
}

function Artefact(id) {
	this.id = id;
	this.crystal = false;
	this.index = -1;
	this.rune = [0,0,0,0,0,0,0,0,0];
	this.runeword = 0;
	
	this.reset = function() {
		this.crystal = false;
		this.index = -1;
		this.rune = [0,0,0,0,0,0,0,0,0];
	}
}
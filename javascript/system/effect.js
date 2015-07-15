function Effecttype(type, target, loc, side, race, special, amount) {
	this.type = type;
	this.target = target;
	this.loc = loc;
	this.race = race;
	this.side = side;
	this.special = special;
	this.amount = amount;
}
function EffectHandleObject() {
	this.validateForceHasRace = function(force,race) {
		if (PAGETYPE == "Squad") return true;
		for(var i = 0;  i < force.length ; i++){
			if (force[i].race == race) return true;
		}
		return false;
	}	
	this.validateSquadIsClanCastleDefender = function(squad) {
		if (PAGETYPE == "Squad") return true;
		if ((ForceDefender[0].race == 5) && (squad.side == 1))
			return true;
		return false;
	}
	this.validatSquadFraction = function(squad, enemy) {
		if (PAGETYPE == "Squad") return true;
		if ((squad.race == 0) || (squad.race == 1)){
			if ((enemy.race == 2) || (enemy.race == 3))
				return true;
		}
		if ((squad.race == 2) || (squad.race == 3)){
			if ((enemy.race == 0) || (enemy.race == 1))
				return true;
		}
		return false;
	}
	this.validateEffect = function(squad,effect,terrain,enemyforce) {
		// terrain check
		if ((effect.loc-1 != terrain) && (effect.loc != EL.EVERYWHERE))
			return false;
		// special abklatsch
		if (effect.special == EC.ONLYASDEFENDER)
			return this.validateSquadIsClanCastleDefender(squad);
		if (effect.special == EC.AGAINSTFRACTION)
			return this.validatSquadFraction(squad,enemyforce[0]);
		// effect wirkt nur gegen rassen oder mit rasse
		if (effect.race == ER.ALLWAYS)
			return true;
		if (effect.special == EC.AGAINST)
			return this.validateForceHasRace(enemyforce,effect.race-1);
		else if (effect.special == EC.WITH)
			return effect.race == squad.race+1;
		// dies sollte eigentlich nicht passieren aber dennoch
		return true;
	}
	this.addEffectDefenceBuilding = function(defence,defender) {
		if (ForceDefender[0].race == 4) return;
		var def = 0;
		if (ForceDefender[0].race != 5) {
			for(var i = 0;(i < 8); i++) {
				def += (FORT_DEFENSE[i] + ServerData.special) * ServerData.defence.fort[i];
			}
		}
		else {
			for(var i = 0;(i < 7); i++) {
				def += (BURG_FORT_DEFENSE[i]) * ServerData.defence.fort[i];
			}
		}
		ForceDefender[0].effect.basicdefence += def;
		
		if (ServerData.maxdefence == 1) {
			for(var i = 0; i < ForceDefender[0].army.length; i++) {
				ForceDefender[0].army[i].effect.defence += 1000;
			}
		}
		ForceDefender[0].effect.tower += SPECIAL_TOWERBONUS[ServerData.special];
	}	
	this.addEffectTerrain = function(terrain, squad) {
		// basicdefence auf richtigen boden sofern man nicht sausgetoßener ist
		if ((terrain == squad.race) && (squad.race < 4) && (squad.renegade == 0)){
			squad.effect.basicdefence += 25;
		}
		if (terrain == 4){
			squad.army[3].effect.attack += 50;
			squad.army[1].effect.attack -= 50;
		}
		if (terrain == 5){
			squad.army[1].effect.attack += 50;
			squad.army[3].effect.attack -= 50;
		}
		if (terrain == 6){
			squad.army[4].effect.attack += 50;
			squad.army[2].effect.attack -= 50;
		}
		if (terrain == 7){
			squad.army[2].effect.attack += 50;
			squad.army[4].effect.attack -= 50;
		}
		if (terrain == 8){
			squad.army[6].effect.attack -= 50;
		}
	}
	this.addEffectFraction = function(squad,defender) {
		if (PAGETYPE == "Squad") return;
		
		if ((defender.renegade == 0) && (squad.race < 4) && (defender.race < 4)){
			if (defender.race == squad.race){
				for(var i = 0;  i < squad.army.length; i++){
					squad.army[i].effect.attack -= 50;
				}
			}
			else if ((defender.race < 2) && (squad.race < 2)){
				for(var i = 0;  i < squad.army.length; i++){
					squad.army[i].effect.attack -= 25;
				}
			}
			else if ((defender.race >= 2) && (squad.race >= 2)){
				for(var i = 0;  i < squad.army.length; i++){
					squad.army[i].effect.attack -= 25;
				}
			}
		}
	}
	this.getEffectTargetUnits = function(effect,army) {
		units = [];
		if (effect.target == EA.ALL){
			for(var i = 0;  i < army.length; i++)
				units[i] = army[i];
		}
		else if (effect.target == EA.WARRIORTYPES) {
			for(var i = 1;  i <= 4; i++)
				units[i-1] = army[i];
		}
		else if (effect.target == EA.ALLBUTMERC) {
			for(var i = 0;  i < army.length; i++){
				if (i != 6)
					units[units.length] = army[i];
			}
		}
		else
			units[units.length] = army[effect.target-2];
		return units;
	}
	this.addEffectSingle = function(effect,lvl,target) {
		// gehe duch alle targets durch
		for(var i = 0;  i < target.length; i++){
			// nun gehe simple alle möglichen effekt typen durch und mach das demensprechende
			if (effect.type == ET.ATTACK){ // Schaden
				army = this.getEffectTargetUnits(effect,target[i].army);
				// Speziell -% dmg gegen monster gilt nur für die monster
				if ((effect.special == EC.AGAINST) && (effect.race == ER.MONSTER) && (effect.side == ES.ENEMY)){
					if (target[i].race == 4){
						for(var i2 = 0;  i2 < army.length; i2++)
							army[i2].effect.attack += effect.amount[lvl];
					}
				}
				else{
					for(var i2 = 0;  i2 < army.length; i2++)
						army[i2].effect.attack += effect.amount[lvl];
				}
			}
			else if (effect.type == ET.HITPOINTS){ // Leben
				army = this.getEffectTargetUnits(effect,target[i].army);
				for(var i2 = 0;  i2 < army.length; i2++)
					army[i2].effect.hp += effect.amount[lvl];
			}
			else if (effect.type == ET.DEFENCE){ // Schutz
				army = this.getEffectTargetUnits(effect,target[i].army);
				for(var i2 = 0;  i2 < army.length; i2++)
					army[i2].effect.defence += effect.amount[lvl];
			}
			else if (effect.type == ET.MAXDEFENCE){ // max Schutz
				target[i].effect.maxdefence += effect.amount[lvl];
			}
			else if (effect.type == ET.VICTIMATTACK) { // Victim
				// sicherheitscheck victim geht nur für Krieger, reiter, flieger Schützen
				if ((effect.target == EA.WARRIORTYPES) || (effect.target >= EA.WARRIOR) && (effect.target <= EA.ARCHER)) {
					army = this.getEffectTargetUnits(effect,target[i].army);
					for(var i2 = 0;  i2 < army.length; i2++){
						army[i2].effect.special += effect.amount[lvl];
					}
				}
			}
			else if (effect.type == ET.HEALPOWER) { // Heilwirkung
				target[i].army[5].effect.special += effect.amount[lvl];
			}
			else if (effect.type == ET.MAGEPOWER) { // Magierwirkung
				target[i].army[7].effect.special += effect.amount[lvl];
			}
			else if (effect.type == ET.PAYLOAD) { // payload
				target[i].army[0].effect.special += effect.amount[lvl];
			}
			else if (effect.type == ET.ATTACKPERROUND) { // Schadensinsporation
				army = this.getEffectTargetUnits(effect,target[i].army);
				for(var i2 = 0;  i2 < army.length; i2++)
					army[i2].effect.roundattack += effect.amount[lvl];
			}
			else if (effect.type == ET.ARMYPOWER) { // Armeeschaden
				target[i].effect.armydamage += effect.amount[lvl];
			}
			else if (effect.type == ET.DAMAGE) { // Direkter Schaden
				target[i].effect.damage += effect.amount[lvl];
			}
			else if (effect.type == ET.DEATHS) { // Festungstode
				target[i].effect.fortdeath += effect.amount[lvl];
			}
			else if (effect.type == ET.FORT) { // Festung
				target[i].effect.fort += effect.amount[lvl];
			}
			else if (effect.type == ET.TOWER) { // Turm
				target[i].effect.tower += effect.amount[lvl];
			}
			else if (effect.type == ET.MTOWER) { // Magischen Turm
				target[i].effect.mtower += effect.amount[lvl];
			}
			else if (effect.type == ET.GATE) { // tor
				target[i].effect.gate += effect.amount[lvl];
			}
			else if (effect.type == ET.MAGEDEFENCE) { // Magieschutz
				target[i].army[7].effect.mage += effect.amount[lvl];
			}
			else if (effect.type == ET.HORROR) { // Horror
				if (effect.amount[lvl] > target[i].effect.terror)
					target[i].effect.terror = effect.amount[lvl];
			}
			else if (effect.type == ET.WOUNDED) { // verwundete t�ten
				target[i].effect.death += effect.amount[lvl];
			}
			else if (effect.type == ET.CATAPULT) { // cata
				target[i].effect.catapult += effect.amount[lvl];
			}
			else if (effect.type == ET.EXP) { // exp
				// wird speziell behandelt
				// erst mal gegen fraktion behandeln
				if (effect.special == ES.AGAINSTFRACTION) {
					if (target[i].race == 0 || target[i].race == 1) {
						target[i].effect.exp[2] += effect.amount[lvl];
						target[i].effect.exp[3] += effect.amount[lvl];
					}
					if (target[i].race == 2 || target[i].race == 3) {
						target[i].effect.exp[0] += effect.amount[lvl];
						target[i].effect.exp[1] += effect.amount[lvl];
					}
				}
				// nun wenn es gegen alle gilt
				else if (effect.race == ER.ALLWAYS) {
					for(var i2 = 0;(i2 < target[i].effect.exp.length); i2++) {
						target[i].effect.exp[i2] += effect.amount[lvl];
					}
				}
				// ansonten gilt es nur gegen eine rasse
				else 
					target[i].effect.exp[effect.race-1] += effect.amount[lvl];
			}
			else if (effect.type == ET.COST) { // Lohn
				army = this.getEffectTargetUnits(effect,target[i].army);
				for(var i2 = 0;  i2 < army.length; i2++)
					army[i2].effect.cost += effect.amount[lvl];
			}
			else if (effect.type == ET.TRAP) { // Furchlosigkeit !!
				target[i].effect.fearless += 1;
			}
		}
	}
	this.addEffectTargetCheck = function(effect, lvl, squad, friends, enemys) {
		if (this.validateEffect(squad,effect,ServerData.terrain,enemys) == false) return;
		// Necro ist speziell und hat kein Ziel wo es wirkt. Sondern das Ziel sagt an wo die necro erstehen
		if (effect.type == ET.NECRO) {
			if (effect.side == ES.SELF)
				squad.effect.necro[0] += effect.amount[lvl];
			else if (effect.side == ES.ALLY)
				squad.effect.necro[1] += effect.amount[lvl];
			else if (effect.side == ES.SELFANDALLY){
				squad.effect.necro[0] += effect.amount[lvl];
				squad.effect.necro[1] += effect.amount[lvl];
			}
			else if (effect.side == ES.ENEMY){
				squad.effect.necro[2] += effect.amount[lvl];
			}
			else if (effect.side == ES.ALL){
				squad.effect.necro[0] += effect.amount[lvl];
				squad.effect.necro[1] += effect.amount[lvl];
				squad.effect.necro[2] += effect.amount[lvl];
			}
			return;
		}
		// in target wird einfach alle squads abgespeichert die vom effect getorffen sind
		var target = [];
		// nur sich selbst
		if (effect.side == ES.SELF)
			target[0] = squad;
		// nur allierte also sich selber raus iffen
		else if (effect.side == ES.ALLY){
			for(var i2 = 0; i2 < friends.length; i2++){
				if (friends[i2] != squad)
					target[target.length] = friends[i2];
			}
		}
		// einfach alles was in friends war
		else if (effect.side == ES.SELFANDALLY){
			for(var i2 = 0; i2 < friends.length; i2++){
				target[target.length] = friends[i2];
			}
		}
		// einfach alles was in feinde war
		else if (effect.side == ES.ENEMY){
			for(var i2 = 0; i2 < enemys.length; i2++){
				target[target.length] = enemys[i2];
			}
		}
		// logishcerweise einfach alle
		else if (effect.side == ES.ALL){
			for(var i2 = 0; i2 < enemys.length; i2++){
				target[target.length] = enemys[i2];
			}
			for(var i2 = 0; i2 < friends.length; i2++){
				target[target.length] = friends[i2];
			}
		}
		// nun den effect dem targets zuschreiben
		this.addEffectSingle(effect,lvl,target);
	}
	this.addEffectSquad = function(squad,friends,enemys) {
		var effect;
		// passive Helden Skills
		if (squad.hero.clas != 0) {
			var clas = squad.hero.clas -1;
			if (squad.race == 4) clas = MONSTER_HERO[squad.hero.clas-1][squad.hero.typ].Skillid;
			if (squad.race == 5) clas = MONSTER_HERO[2][squad.hero.typ].Skillid;
			for(var i = 0;( i < HEROSKILL_DATA[clas].length); i++){
				if (squad.hero.skill[i] > 0) {
					effect = HEROSKILL_DATA[clas][i];
					if ($.isArray(effect)){
						for(var i2 = 0; (i2 < effect.length); i2++)
							this.addEffectTargetCheck(effect[i2],squad.hero.skill[i]-1,squad,friends,enemys);
					}
					else 
						this.addEffectTargetCheck(effect,squad.hero.skill[i]-1,squad,friends,enemys);
				}
			}
		}
		// Artefakte
		var count = 0;
		for(var i = 0; (i < squad.hero.artefact.length); i++) {
			var arte = squad.hero.artefact[i];
			if (arte.index != -1){
				// schaue nach ob es dazu ein effect gibt
				if (ARTEFACT_DATA[arte.index][2][i]){
					effect = ARTEFACT_DATA[arte.index][2][i];
					if ($.isArray(effect)){
						for(var i2 = 0; (i2 < effect.length); i2++)
							this.addEffectTargetCheck(effect[i2],0,squad,friends,enemys);
					}
					else 
						this.addEffectTargetCheck(effect,0,squad,friends,enemys);
				}
				// crystal effect
				if (arte.crystal) {
					// gibt es ein crystal effect ?
					if (ARTEFACT_CRYSTAL_DATA[i]){
						effect = ARTEFACT_CRYSTAL_DATA[i];
						if ($.isArray(effect)){
							for(var i2 = 0; (i2 < effect.length); i2++)
								this.addEffectTargetCheck(effect[i2],ARTEFACT_DATA[arte.index][1],squad,friends,enemys);
						}
						else 
							this.addEffectTargetCheck(effect,ARTEFACT_DATA[arte.index][1],squad,friends,enemys);
					}
				}
				
				// Runen
				var runes = squad.hero.artefact[i].rune;
				for(var i2 = 0; (i2 < runes.length); i2++) {
					if (runes[i2] != 0) {
						// füge effekt hinzu
						if (RUNE_DATA[i2] != false) {
							this.addEffectTargetCheck(RUNE_DATA[i2],runes[i2]-1,squad,friends,enemys);
						}
					}
				}
				
				// runen set
				var word = ArtefactBox.getRuneWord(i,runes);
				if (!(word == false)) {
					if (typeof word != 'string')
						this.addEffectTargetCheck(word,arte.runeword,squad,friends,enemys);
				}
				// zählen ob es ein set effect gibt ( bei 9 -> set effect vorhanden )
				if (squad.hero.artefact[0].index == arte.index) 
					count++;
			}
		}
		// SET effect
		if (count == squad.hero.artefact.length) {
			// Spezial Set Effect 
			effect = ARTEFACT_DATA[squad.hero.artefact[0].index][2][9];
			if ($.isArray(effect)){
				for(var i2 = 0; (i2 < effect.length); i2++)
					this.addEffectTargetCheck(effect[i2],0,squad,friends,enemys);
			}
			else 
				this.addEffectTargetCheck(effect,0,squad,friends,enemys);
			// standart Set Effect ( exp daher kein array )
			this.addEffectTargetCheck(ARTEFACT_SET_STANDART_EFFECT[ARTEFACT_DATA[squad.hero.artefact[0].index][1]],0,squad,friends,enemys);
		}
		
		// Magic
		for(var i = 0; (i < squad.hero.magic.length); i++) {
			if(squad.hero.magic[i]) {
				effect = MAGIC_DATA[i][3];
				if ($.isArray(effect)){
					for(var i2 = 0; (i2 < effect.length); i2++)
						this.addEffectTargetCheck(effect[i2],squad.hero.magic[i]-1,squad,friends,enemys);
				}
				else 
					this.addEffectTargetCheck(effect,squad.hero.magic[i]-1,squad,friends,enemys);
			}
		}
	}
	this.refresh = function(){
		// erst die effecte loeschen
		for(var i = 0;( i < ForceAttacker.length); i++) {
			ForceAttacker[i].resetEffect();
		}
		for(var i = 0;( i < ForceDefender.length); i++) {
			ForceDefender[i].resetEffect();
		}
		// defence building effect hinzufügen
		this.addEffectDefenceBuilding(ServerData.defence,ForceDefender[0]);
		
		for(var i = 0;( i < ForceAttacker.length); i++) {
			this.addEffectTerrain(ServerData.terrain,ForceAttacker[i]);
			this.addEffectFraction(ForceAttacker[i],ForceDefender[0]);
			this.addEffectSquad(ForceAttacker[i],ForceAttacker,ForceDefender);
		}
		for(var i = 0;( i < ForceDefender.length); i++) {
			this.addEffectTerrain(ServerData.terrain,ForceDefender[i]);
			this.addEffectSquad(ForceDefender[i],ForceDefender,ForceAttacker);
		}
	}
}
var EffectHandler = new EffectHandleObject();
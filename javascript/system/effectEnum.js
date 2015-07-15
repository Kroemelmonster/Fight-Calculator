// All types of Effects
var ET = {
   	ATTACK				: 0,
   	HITPOINTS			: 1,
   	DEFENCE				: 2,
   	MAXDEFENCE			: 3,
   	VICTIMATTACK		: 4,
   	HEALPOWER			: 5,
   	MAGEPOWER			: 6,
   	PAYLOAD				: 7,
   	ATTACKPERROUND		: 8,
   	ARMYPOWER			: 9,
   	DAMAGE				: 10,
   	DEATHS				: 11,
   	FORT				: 12,
   	TOWER				: 13,
   	MTOWER				: 14,
   	GATE				: 15,
   	MAGEDEFENCE			: 16,
   	NECRO				: 17,
   	HORROR				: 18,
   	WOUNDED				: 19,
   	CATAPULT			: 20,
   	EXP					: 21,
   	COST				: 22,
   	TRAP				: 23
};
//Effekt Daten Visuals
const EFFECTTYPE_VISUAL		= [
		[1,"%"],
		[1,"%"],
		[1,""],
		[1,""],
		[1,"%"],
		[1,"%"],
		[1,"%"],
		[1,"%"],
		[1,"%"],
		[1,"%"],
		[2,""],
		[2,""],
		[1,"%"],
		[1,"%"],
		[1,"%"],
		[1,"%"],
		[1,""],
		[1,"%"],
		[0,"%"],
		[0,"%"],
		[1,""],
		[1,"%"],
		[0,"%"],
		[1,""],
]
// The Targets of an targetable effect
var EA = {
   	ALL					: 0,
   	WARRIORTYPES		: 1,
   	CARRIER				: 2,
   	WARRIOR				: 3,
   	RIDER				: 4,
   	FLYER				: 5,
   	ARCHER				: 6,
   	HEALER				: 7,
   	MERC				: 8,
   	MAGE				: 9,
   	ALLBUTMERC			: 10,
};
// where the effect only works
var EL = {
	EVERYWHERE			: 0,
	KNIGHT				: 1,
	ELF					: 2,
	DEMON				: 3,
	NELF				: 4,
	MOUNTAIN			: 5,
	DESERT				: 6,
	FOREST				: 7,
	STEP				: 8,
	DUNGEON				: 9
}
// on which sides the effect will work
var ES = {
	SELF				: 0,
	ALLY				: 1,
	SELFANDALLY			: 2,
	ENEMY				: 3,
	ALL 				: 4
}
// with wich race it will only work
var ER = {
	ALLWAYS				: 0,
	KNIGHT				: 1,
	ELF					: 2,
	DEMON				: 3,
	NELF				: 4,
	MONSTER				: 5,
}
// effect only work with this special
var EC = {
	ALLWAYS				: 0,
	AGAINST				: 1,
	WITH				: 2,
	ONLYASDEFENDER		: 3,
	AGAINSTFRACTION 	: 4,
}


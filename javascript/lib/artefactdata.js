const ARTEFACT_TYPE2SPRITE = ["necklace","helmet","item","ring","wear","belt","weapon","footwear","shield"];
// id im sprite, level des artefacts, effecte gehen von links oben nach rechts zu unten
// also amulet, kopf, item, ring, rüstung, gürtel, waffe, schuhe, schild, set
const ARTEFACT_SET_STANDART_EFFECT = [];
{
	ARTEFACT_SET_STANDART_EFFECT[0] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [100]);
	ARTEFACT_SET_STANDART_EFFECT[1] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [200]);
	ARTEFACT_SET_STANDART_EFFECT[2] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [300]);
	ARTEFACT_SET_STANDART_EFFECT[3] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [400]);
	ARTEFACT_SET_STANDART_EFFECT[4] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [500]);
}
const ARTEFACT_CRYSTAL_DATA =
	[false,
	 new Effecttype( ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25,55,100,150,200]),
	 new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [50,100,150,200,300]),
	 new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25]),
	 [new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [3,6,9,12,15]),new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50,100,150,200,250])],
	 false,
	 [new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [1,2,3,4,5]),new Effecttype( ET.ATTACK, EA.MERC, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-3,-6,-9,-12,-15])],
	 false,
	 new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [3,6,9,12,15])];
const ARTEFACT_DATA = [];
{
	ARTEFACT_DATA[0] = 
	    [1,0,[false,
	          new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.FOREST, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.FOREST, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          new Effecttype( ET.HITPOINTS, EA.ALL, EL.FOREST, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.ATTACK, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          false,
	          new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15])],
	          [1.5,1,1,0.5,1.5,1.5,2,1,0]
    ];
	ARTEFACT_DATA[1] = 
	    [2,0,[false,
	          false,
	          false,
	          false,
	          false,
	          false,
	          new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [150]),
	          false,
	          new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5]),
	          false],
	          [1.5,1,1,1.5,1,1.5,1,2,1]
    ];
	ARTEFACT_DATA[2] =
	    [3,0,[false,
	          new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.STEP, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10]),
	          new Effecttype( ET.PAYLOAD, EA.CARRIER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [100]),
	          false,
	          new Effecttype( ET.HITPOINTS, EA.ALL, EL.STEP, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.ATTACK, EA.ALL, EL.STEP, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [5]),
	          new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15])],
	          [1,1,1,2,1.5,1.5,1.5,1,1]
    ];
	ARTEFACT_DATA[3] =
	    [4,0,[false,
	          new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.MOUNTAIN, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10]),
	          new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),
	          new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.MOUNTAIN, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          new Effecttype( ET.HITPOINTS, EA.ALL, EL.MOUNTAIN, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.ATTACK, EA.ALL, EL.MOUNTAIN, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.DEFENCE, EA.ALL, EL.MOUNTAIN, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15])],
	          [1,1,2,0.5,1.5,1.5,1.5,1,1.5]
    ];
	ARTEFACT_DATA[4] = 
	    [5,0,[false,
	          false,
	          false,
	          false,
	          new Effecttype( ET.HITPOINTS, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.ATTACK, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
	          false,
	          new Effecttype( ET.DEFENCE, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10]),
	          false],
	          [1,1,0.5,1.5,1.5,1.5,1.5,1,2]
	];
	// Wüstendingsbums
	ARTEFACT_DATA[5] = 
		[6,1,[false,
		       false,
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.DESERT, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.DESERT, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.DESERT, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false],
		       [3,6,5,4,7,5,8,5,6]
	];
	ARTEFACT_DATA[6] = 
		[7,1,[new Effecttype( ET.HITPOINTS, EA.ARCHER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25]),
		      new Effecttype( ET.DEFENCE, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      new Effecttype( ET.VICTIMATTACK, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      new Effecttype( ET.ATTACK, EA.ARCHER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25]),
		      new Effecttype( ET.HITPOINTS, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      false,
		      new Effecttype( ET.ATTACK, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      false,
		      false,
		      new Effecttype( ET.COST, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-40])],
		      [4,6,5,5,7,5,8,4,0]
	];
	ARTEFACT_DATA[7] = 
		[8,1,[false,
		      false,
		      false,
		      false,
		      new Effecttype( ET.COST, EA.MERC, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-25]),
		      false,
		      new Effecttype( ET.ATTACK, EA.MERC, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      false,
		      new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20]),
		      false],
		      [3,6,6,7,5,5,8,4,6]
	];
	ARTEFACT_DATA[8] = 
		[9,1,[false,
		      new Effecttype( ET.CATAPULT, EA.ALL, EL.STEP, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [1]),
		      false,
		      new Effecttype( ET.ATTACK, EA.ALL, EL.STEP, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25]),
		      new Effecttype( ET.HITPOINTS, EA.ALL, EL.STEP, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      false,
		      new Effecttype( ET.ATTACK, EA.ALL, EL.STEP, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      false,
		      new Effecttype( ET.DEFENCE, EA.ALL, EL.STEP, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		      new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25])],
		      [3,6,7,5,7,5,7,5,5]
	];
	ARTEFACT_DATA[9] = 
		[10,1,[false,
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [200]),
		       new Effecttype( ET.ATTACK, EA.FLYER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [25]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [25]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [25]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [25]),
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.MONSTER, EC.AGAINST, [30])],
		       [3,7,8,4,6,5,6,6,5]
	];
	// billeges konter magie set
	ARTEFACT_DATA[10] = 
		[11,1,[new Effecttype( ET.MAGEDEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20]),
		       new Effecttype( ET.DEFENCE, EA.MAGE, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-40]),
		       false,
		       false,
		       new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-80]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-10]),
		       false],
		       [5,5,6,6,5,5,6,8,4]
	];
	ARTEFACT_DATA[11] = 
		[13,1,[new Effecttype( ET.VICTIMATTACK, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       new Effecttype( ET.HITPOINTS, EA.WARRIOR, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25]),
		       false,
		       new Effecttype( ET.ATTACK, EA.WARRIOR, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25]),
		       new Effecttype( ET.HITPOINTS, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false,
		       new Effecttype( ET.ATTACK, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       new Effecttype( ET.COST, EA.WARRIOR, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-40])],
		       [5,4,6,5,7,5,7,4,6]
	];
	ARTEFACT_DATA[12] = 
		[14,1,[new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20]),
		       false,
		       new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-250]),
		       new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       [new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-10]),new Effecttype( ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
		       false],
		       [3,5,5,7,8,5,7,5,5]
	];
	ARTEFACT_DATA[13] = 
		[15,1,[new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20]),
		       new Effecttype( ET.DEFENCE, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10]),
		       false,
		       new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       false,
		       new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [250]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20])],
		       [5,4,6,4,8,5,6,5,7]
	];
	ARTEFACT_DATA[14] = 
		[16,1,[false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       new Effecttype( ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),
		       false,
		       new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10]),
		       new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [450])],
		       [7,5,5,5,5,5,5,7,6]
	];
	// Salzsee set
	ARTEFACT_DATA[15] = 
		[17,1,[false,
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       new Effecttype( ET.COST, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-30]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       false,
		       new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20])],
		       [3,7,4,5,7,6,8,0]
	];
	ARTEFACT_DATA[16] = 
		[20,1,[false,
		       new Effecttype( ET.HORROR, EA.ALL, EL.DUNGEON, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.DUNGEON, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.DUNGEON, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.DUNGEON, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.DUNGEON, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20])],
		       [3,6,4,6,7,5,6,8,4]
	];
	ARTEFACT_DATA[17] = 
		[21,1,[new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [75]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [10]),
		       false,
		       new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [10]),
		       false],
		       [7,5,7,4,6,5,4,8,4]
	];
	ARTEFACT_DATA[18] = 
		[22,2,[false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ONLYASDEFENDER, [40]),
		       new Effecttype( ET.HEALPOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ONLYASDEFENDER, [35]),
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ONLYASDEFENDER, [200]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ONLYASDEFENDER, [50]),
		       false,
		       new Effecttype(  ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ONLYASDEFENDER, [25]),
		       false,
		       new Effecttype( ET.GATE, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ONLYASDEFENDER, [25]),
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ONLYASDEFENDER, [-30])],
		       [15,15,22,25,18,14,20,21,30]
	];
	ARTEFACT_DATA[19] = 
		[23,2,[new Effecttype( ET.MAGEDEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-30]),
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       new Effecttype( ET.HITPOINTS, EA.MAGE, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-60]),
		       false,
		       new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-120]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-15]),
		       false],
		       [24,20,14,20,16,14,30,30,12]
	];
	// architekt
	ARTEFACT_DATA[20] = 
		[24,2,[false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       new Effecttype(  ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [100]),
		       false,
		       new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15]),
		       false],
		       [22,16,14,22,18,14,20,26,28]
	];
	ARTEFACT_DATA[21] = 
		[25,2,[new Effecttype( ET.VICTIMATTACK, EA.RIDER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       new Effecttype( ET.HITPOINTS, EA.RIDER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       false,
		       new Effecttype( ET.ATTACK, EA.RIDER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       new Effecttype( ET.HITPOINTS, EA.RIDER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       new Effecttype( ET.ATTACK, EA.RIDER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.RIDER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       new Effecttype( ET.COST, EA.RIDER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-60])],
		       [20,20,16,20,20,14,26,22,22]
	];
	ARTEFACT_DATA[22] = 
		[26,2,[new Effecttype( ET.HEALPOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       false,
		       new Effecttype( ET.HEALPOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       new Effecttype( ET.HITPOINTS, EA.HEALER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       new Effecttype( ET.HITPOINTS, EA.HEALER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.HEALER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       new Effecttype( ET.COST, EA.RIDER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		       [26,22,12,26,22,14,18,20,20]
	];
	ARTEFACT_DATA[23] = 
		[28,2,[new Effecttype( ET.ATTACK, EA.MERC, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.AGAINSTFRACTION, [200]),
		       new Effecttype( ET.HEALPOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.AGAINSTFRACTION, [-45]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.AGAINSTFRACTION, [40]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.AGAINSTFRACTION, [40]),
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.AGAINSTFRACTION, [40]),
		       false,
		       new Effecttype( ET.COST, EA.MERC, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-70])],
		       [28,21,21,16,23,14,25,12,0]
	];
	ARTEFACT_DATA[24] = 
		[29,2,[false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false],
		       [20,22,18,20,20,14,24,20,22]
	];
	// legionär
	ARTEFACT_DATA[25] = 
		[19,2,[new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-30]),
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [150]),
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.ATTACK, EA.MERC, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50])],
		       [26,20,16,14,22,14,20,30,26]
	];
	ARTEFACT_DATA[26] = 
		[31,2,[new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [100]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       false,
		       new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [350]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [20]),
		       false],
		       [30,18,10,26,26,14,20,20,20]
	];
	ARTEFACT_DATA[27] = 
		[32,2,[false,
		       false,
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.CARRIER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false],
		       [14,16,14,24,20,14,28,28,22]
	];
	ARTEFACT_DATA[28] = 
		[33,2,[new Effecttype( ET.VICTIMATTACK, EA.FLYER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       new Effecttype( ET.HITPOINTS, EA.FLYER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       false,
		       new Effecttype( ET.ATTACK, EA.FLYER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-35]),
		       new Effecttype( ET.HITPOINTS, EA.FLYER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       new Effecttype( ET.ATTACK, EA.FLYER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.FLYER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [35]),
		       new Effecttype( ET.COST, EA.FLYER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-60])],
		       [20,20,20,20,20,14,26,22,18]
	];
	ARTEFACT_DATA[29] = 
		[34,2,[false,
		       false,
		       new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.ALL, ER.ALLWAYS, EC.ALLWAYS, [-100]),
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-100]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false],
		       [18,16,18,20,26,14,22,30,22]
	];
	// Erforschermeister
	ARTEFACT_DATA[30] = 
		[35,3,[false,
		       false,
		       false,
		       new Effecttype( ET.DEFENCE, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [45]),
		       new Effecttype( ET.HITPOINTS, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [45]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [45]),
		       false,
		       false,
		       false],
		       [65,65,65,65,65,50,65,80,0]
	];
	ARTEFACT_DATA[31] = 
		[36,3,[false,
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [400]),
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [45]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [45]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [45]),
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [60])],
		       [55,80,65,60,65,50,65,80,65]
	];
	ARTEFACT_DATA[32] = 
		[37,3,[false,
		       false,
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [200]),
		       false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       false],
		       [65,70,75,65,50,50,65,80,65]
	];
	ARTEFACT_DATA[33] = 
		[38,3,[false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       false,
		       new Effecttype( ET.ATTACK, EA.MERC, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-45]),
		       false],
		       [60,70,65,60,75,50,55,70,80]
	];
	ARTEFACT_DATA[34] = 
		[39,3,[new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.ALL, ER.ALLWAYS, EC.ALLWAYS, [100]),
		       false,
		       new Effecttype( ET.HEALPOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.ALL, ER.ALLWAYS, EC.ALLWAYS, [-50]),
		       false,
		       new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ALL, ER.ALLWAYS, EC.ALLWAYS, [-50]),
		       new Effecttype( ET.WOUNDED, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [50])],
		       [65,75,65,65,65,50,60,70,65]
	];
	// necro master
	ARTEFACT_DATA[35] = 
		[40,3,[new Effecttype( ET.WOUNDED, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.NECRO, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [8]),
		       false,
		       new Effecttype( ET.NECRO, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [8]),
		       new Effecttype( ET.NECRO, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [4]),
		       false,
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [50])],
		       [60,70,80,75,60,50,65,65,60]
	];
	ARTEFACT_DATA[36] = 
		[41,3,[false,
		       new Effecttype( ET.MAGEDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-160]),
		       new Effecttype( ET.HITPOINTS, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [45]),
		       false,
		       new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [90]),
		       false,
		       false,
		       false],
		       [60,80,60,65,65,50,65,75,0]
	];
	ARTEFACT_DATA[37] = 
		[42,3,[false,
		       false,
		       false,
		       new Effecttype( ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [200]),
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       false,
		       false,
		       new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false],
		       [65,60,70,55,80,50,60,80,65]
	];
	ARTEFACT_DATA[38] = 
		[43,3,[false,
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [150]),
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [30]),
		       false,
		       new Effecttype( ET.ATTACK, EA.WARRIOR, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [40]),
		       false,
		       new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [25]),
		       false],
		       [65,70,60,75,75,50,60,65,65]
	];
	ARTEFACT_DATA[39] = 
		[44,4,[false,
		       new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [500]),
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [50]),
		       false,
		       [new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20])],
		       false,
		       new Effecttype( ET.ATTACK, EA.ARCHER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [55]),
		       false,
		       [new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),new Effecttype( ET.ATTACK, EA.MERC, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		       false],
		       [200,100,200,150,250,100,200,300,300]
	];
	// burtaler herscher der bösen
	ARTEFACT_DATA[40] = 
		[45,4,[false,
		       false,
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [55]),
		       false,
		       new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),
		       false,
		       [new Effecttype( ET.DEFENCE, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		       [150,150,200,150,300,100,250,250,250]
	];
	ARTEFACT_DATA[41] = 
		[46,4,[false,
		       new Effecttype( ET.MAGEDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),
		       new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [50]),
		       false,
		       [new Effecttype( ET.HITPOINTS, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [55]),new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20])],
		       false,
		       [new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [110]),new Effecttype( ET.MTOWER, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50])],
		       false,
		       [new Effecttype( ET.DEFENCE, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
		       false],
		       [100,300,200,200,250,100,200,250,200]
	];
	ARTEFACT_DATA[42] = 
		[47,4,[false,
		       new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [250]),
		       false,
		       false,
		       new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),
		       false,
		       [new Effecttype( ET.ARMYPOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),new Effecttype( ET.DAMAGE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [50000])],
		       false,
		       false,
		       false],
		       [150,200,150,150,300,100,250,300,0]
	];
	ARTEFACT_DATA[43] = 
		[48,4,[new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50]),
		       [new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [250]),new Effecttype( ET.MAGEDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50])],
		       new Effecttype( ET.TRAP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [1]),
		       false,
		       [new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELFANDALLY, ER.ALLWAYS, EC.ALLWAYS, [50]),new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		       false,
		       [new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),new Effecttype( ET.VICTIMATTACK, EA.WARRIORTYPES, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50])],
		       false,
		       [new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50]),new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25]),new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
		       false],
		       [999,999,0.5,500,999,120,999,999,999]
	];
}
var RUNE = {
	FEOH		: 0,
	UR			: 1,
	TORN		: 2,
	IO			: 3,
	RAD			: 4,
	TIR			: 5,
	GIFU		: 6,
	JAR			: 7,
	CHEGL		: 8,
};
const RUNE_DATA = [];
{
	RUNE_DATA[RUNE.FEOH] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [25,50,75,100]);
	RUNE_DATA[RUNE.UR] = new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10,20,30,40]);
	RUNE_DATA[RUNE.TORN] = new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.AGAINST, [5,10,15,20]);
	RUNE_DATA[RUNE.IO] = new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [3,6,9,12]);
	RUNE_DATA[RUNE.RAD] = new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20]);
	RUNE_DATA[RUNE.TIR] = new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.MONSTER, EC.AGAINST, [-5,-10,-15,-20]);
	RUNE_DATA[RUNE.GIFU] = new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [3,6,9,12]);
	RUNE_DATA[RUNE.JAR] = false;
	RUNE_DATA[RUNE.CHEGL] = new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-3,-6,-9,-12]);
}

const RUNE_WORD = [];
{
	RUNE_WORD[0] = [[[1,0,1,0,0,0,0,0,0],new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-5,-6,-7])]
	               ];
	RUNE_WORD[1] = [[[0,1,1,0,0,0,0,0,0],RUNE_WORD_NAMES[0]],
	                [[0,0,3,0,0,0,0,0,0],RUNE_WORD_NAMES[1]],
					[[0,0,0,0,0,0,1,1,0],RUNE_WORD_NAMES[6]],
					[[3,0,0,0,0,0,0,0,0],RUNE_WORD_NAMES[7]],
					[[1,1,1,0,0,0,0,0,0],new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [10,11,12])],
					[[0,0,0,0,1,0,1,0,0],new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [20,21,22,23,24])]];
	RUNE_WORD[2] = [[[0,2,0,0,0,0,0,0,0],RUNE_WORD_NAMES[2]],
	                [[3,0,1,0,0,0,0,0,0],RUNE_WORD_NAMES[3]],
	                [[0,0,0,1,0,1,0,0,0],RUNE_WORD_NAMES[8]]
					];
	RUNE_WORD[3] = [[[1,1,0,0,0,0,0,0,0],RUNE_WORD_NAMES[4]]
					];
	RUNE_WORD[4] = [[[0,2,1,0,0,0,0,0,0],new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-10,-11,-12,-13,-14,-15])],
	                [[0,0,0,0,0,0,1,1,1],new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [46,47,48,49,50,51,52,53,54])],
	                [[4,0,0,0,0,0,0,0,0],new Effecttype( ET.HITPOINTS, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15,16,17,18])],
	                ];
	RUNE_WORD[5] = [];
	RUNE_WORD[6] = [[[2,2,0,0,0,0,0,0,0],RUNE_WORD_NAMES[5]],
	                [[3,1,0,0,0,0,0,0,0],new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [15,16,17,18])]
					];
	RUNE_WORD[7] = [];
	RUNE_WORD[8] = [[[0,3,0,0,0,0,0,0,0],new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-5,-6,-7])],
	                [[0,4,0,0,0,0,0,0,0],new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,6,7])],
					[[1,2,0,0,0,0,0,0,0],new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10,11,12])],
					[[0,0,1,2,0,0,0,0,0],new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [20,21,22,23,24])],
	                ];
	
}
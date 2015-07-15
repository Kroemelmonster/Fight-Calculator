const HEROSKILL_DATA = [];
{
	HEROSKILL_DATA[0] = [
        ["turmheld",new Effecttype( ET.TOWER, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50,100,150,200,250])],
		["mobile",new Effecttype( ET.DEATHS, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [500,1000,1500,2000,2500])],
		["festung",new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [100,200,300,400,500])],
		["maxschutz",new Effecttype( ET.MAXDEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
		["lohn",new Effecttype( ET.COST, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-4,-8,-12,-16,-20])],
	];
	HEROSKILL_DATA[1] = [
        ["necro",new Effecttype( ET.NECRO, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [2,4,6,8,10])],
 		["schadenmagier",new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [50,100,150,200,250])],
 		["leben",new Effecttype( ET.HITPOINTS, EA.ALLBUTMERC, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
 		["lebenally",new Effecttype( ET.HITPOINTS, EA.ALLBUTMERC, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
 		["heilerkraft",new Effecttype( ET.HEALPOWER, EA.HEALER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [3,6,9,12,15])],
 		["lohnheiler",new Effecttype( ET.COST, EA.HEALER, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-10,-15,-20,-25,-30])],
 		["schutzmagier",new Effecttype( ET.DEFENCE, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10,20,30,40,50])],
 		["lohnmagier",new Effecttype( ET.COST, EA.MAGE, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [-10,-15,-20,-25,-30])],
 		["schadenuntermagieheld",new Effecttype( ET.ATTACK, EA.MAGE, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20,-40,-60,-80,-100])],
 		["heilerkraftunter",new Effecttype( ET.HEALPOWER, EA.HEALER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-10,-20,-30,-40,-50])],
 		["mturmunter",new Effecttype( ET.MTOWER, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-3,-6,-9,-12,-15])],
 	];
	HEROSKILL_DATA[2] = [
        ["festungunter",new Effecttype( ET.FORT, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20,-40,-60,-80,-100])],
  		["schutz",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
  		["schutzally",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
  		["expunter",new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-20,-40,-60,-80,-100])],
  		["expmonst",new Effecttype( ET.EXP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.MONSTER, EC.ALLWAYS, [100,200,300,400,500])],
  		["schaden",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
  		["schadenally",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [5,10,15,20,25])],
  	];
	HEROSKILL_DATA[3] = [
        ["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
   		["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
   		["terrorheld",new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [90])],
    ];
	HEROSKILL_DATA[4] = [
        ["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
    	["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
    	["terrorheld",new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [90])],
 		["heilerkraftunter",new Effecttype( ET.HEALPOWER, EA.HEALER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
    ];
	HEROSKILL_DATA[5] = [
        ["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
     	["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
     	["terrorheld",new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [90])],
    ];
	HEROSKILL_DATA[6] = [
	    ["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
	  	["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
	  	["terrorheld",new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [90])],
		["heilerkraftunter",new Effecttype( ET.HEALPOWER, EA.HEALER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		["schutz",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25])],
  		["schutzally",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [25])],
	];
	HEROSKILL_DATA[7] = [
		["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
		["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
		["terrorheld",new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [90])],
		["schaden",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25])],
  		["schadenally",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [25])],
		["schutz",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [25])],
		["schutzally",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ALLY, ER.ALLWAYS, EC.ALLWAYS, [25])],
	];
	HEROSKILL_DATA[8] = [
        ["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
     	["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
     	["terrorheld",new Effecttype( ET.HORROR, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [90])],
  		["heilerkraftunter",new Effecttype( ET.HEALPOWER, EA.HEALER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
    ];
	HEROSKILL_DATA[9] = [
        ["falle",new Effecttype( ET.TRAP, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [0])],
        ["standhaftigkeit",new Effecttype( ET.TRAP, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [0])],
        ["krone",[new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [10]),new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.SELF, ER.ALLWAYS, EC.ALLWAYS, [5])]],
  		["heilerkraftunter",new Effecttype( ET.HEALPOWER, EA.HEALER, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
  		["verwundete",new Effecttype( ET.WOUNDED, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [25])],
  		["schadenunterheld",new Effecttype( ET.ATTACK, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-50])],
     	["schutzunter",new Effecttype( ET.DEFENCE, EA.ALL, EL.EVERYWHERE, ES.ENEMY, ER.ALLWAYS, EC.ALLWAYS, [-25])],
    ];
}

const RACE_NAMES = ["Ritter", "Lichtelf", "D&auml;mon", "Finsterelf", "Monster","Sippenburg"];
const TERRAIN_NAMES = ["Heiliges Land","Magische W&auml;lder","Entseeltes Land","Verdammte W&auml;lder","Berge","W&uuml;ste","W&auml;lder","Steppe","Verlies"];
const GENERAL = {
	TITLE : 		"Kampfrechner", 
	ATTACKER : 		"Angreifer", 
	DEFENDER : 		"Verteidiger", 
	SQUAD : 		"Armee", 
	ADD_SQUAD : 	"Armee hinzuf&uuml;gen",
	RANKING :		"Armeepunkte",
	FRACTION : 		"Fraktionspunkte",
	EXP :			"Erfahrung",
	WARPOINT :		"Kriegspunkte",
	COST :			"Lohn",
	CHANCE : 		["min","norm","max"],
	CALCULATE :     "Berechne",
	SERVERTYP :		["Bergbauserver","Kriegsserver"],
	ROUND : 		"Runde",
	ROUNDTERROR :	"Terror Runde",
	ROUNDDEATH :	"Todes Runde",
	ROUNDHEAL : 	"Heilungsrunde",
	ROUNDGATE : 	"Innentor Runde",
	ROUNDNECRO : 	"Todeserweckungsrunde",
	NOTHING : 		"nix",
	TOWER :			"Turm",
	MTOWER : 		"Magischer Turm",
	FORT : 			"Festung",
	GATE : 			"Innentor",
	};
const RESULT_END = " hat gewonnen";
const SAVE_BOX = {
	CODE : 'Code',
	SAVE_NAME : 'Auf Namen speichern',
	SAVE : 'Speichern',
	LINK : 'Direkter Link zum Squad',
	LOAD_CODE : 'Code laden',
	LOAD_NAME : 'Vom Namen laden',
	LOAD : 'Laden',
}
const TOOLTIP = {
	BAD : "Ausgesto&szlig;ener",
	RETREAT : "R&uuml;ckzug bei Verlusten",
	CHANCE : "Wahrscheinlichkeit eines Maximalangriffs",
	AGGRO : "Aggro Held der Ruine",
	GATEDONT : "Die Berechnung mit dem Gate ist derzeit nicht möglich",
	};
const EFFECTTYPE = [
	"Angriffskraft", // attack
	"Gesundheit", // hp 
	"Schutz", // defend
	"Maximalschutz", // maxdefend
	"Verfolgerschaden", // victim
	"Heilerwirkung", // healerpower  5
	"Turmschadenverringerung", // magepower
	"Traglast",	// carrier
	"Angriffskraft nach jeder Runde", // roundattack
	"St&auml;rke des Armeeangriffs", // armydamage
	"direkter Schaden in jeder Runde", // damage 10
	"Tode in der Festungsrunde", // fortdeath
	"Vernichtungseffizienz der Festungen", // fort
	"St&auml;rke der T&uuml;rme", // tower
	"St&auml;rke der magischen T&uuml;rme", // mtower
	"St&auml;rke des Innentores", // gate,
	"Magierschutz", // magicdefned 15
	"Totenerweckung", // necro
	"Horror", // terror
	"Verwundete t&ouml;ten", // death
	"Katapult", // catapult
	"Erfahrung", // Experiance
	"Lohn", // cost 20
	"Totenerweckung", // necro
	]
const EFFECTUNIT = [
	"Aller Einheiten",
	"Krieger, Reiter, Flieger und Sch&uuml;tzen",
	"Tr&auml;ger",
	"Krieger",
	"Reiter",
	"Flieger",
	"Sch&uuml;tzen",
	"Heiler",
	"S&ouml;ldner",
	"Magier",
	"Alle au&szlig;er S&ouml;ldner"
	];
var EFFECTLOCATION = 
	["&Uuml;berall",
	TERRAIN_NAMES[0],
	TERRAIN_NAMES[1],
	TERRAIN_NAMES[2],
	TERRAIN_NAMES[3],
	TERRAIN_NAMES[4],
	TERRAIN_NAMES[5],
	TERRAIN_NAMES[6],
	TERRAIN_NAMES[7],
	TERRAIN_NAMES[8]];
const EFFECTAT = [
	"Selber",
	"Verb&uuml;ndeten",
	"Verb&uuml;ndeten und selber",
	"Feind",
	"Alle"
	];
var EFFECTRACE = ["Rassenunabh&auml;ngig",
	RACE_NAMES[0],
	RACE_NAMES[1],
	RACE_NAMES[2],
	RACE_NAMES[3],
	RACE_NAMES[4],
	RACE_NAMES[5],
	"Fraktion"];
const HEROCLASS = ["Kein Held","Gouverneur","Zauberer","Stratege"];
const MONSTHEROCLASS = ["Aggroheld","Steinkreis","Oberh&uuml;ter"];
const MONSTHEROTYPE = ["Juggernaut","Hexer","Juggernaut-Archi","Uralter"];
const HEROTYPE = [
	["Bauarbeiter","Verteidiger","Meister","Bergarbeiter","H&auml;ndler"],
	["Totenbeschw&ouml;rer","Heiler","Illusionist","Beschw&ouml;rer","Zaubereizerst&ouml;rer"],
	["Paladin","Friedensbote","Saboteur","Sp&auml;her","Krieger"]];
function effect2Textinner(effect,lvl){
	 // nicht extsiterender Effect
	if (effect.type == -1)
		return "Nichts";
	// ganz spezieller effekt
	if (effect.type == ET.TRAP) {
		return "Terror hat keine Auswirkung";
	}
	// text beginnt mit type
	var text = EFFECTTYPE[effect.type];
	// bei target nicht nur all units ( was standart ist ) dies anzeigen
	if(effect.target != EA.ALL)
		text += " "+EFFECTUNIT[effect.target];
	// visual 1 bedeuetet gr&uuml;n bei pos und rot bei negativen werten
	if (EFFECTTYPE_VISUAL[effect.type][0] == 1){
		if (effect.amount[lvl] > 0)
			text += ' <span style="color:#0f0">+'+effect.amount[lvl]+EFFECTTYPE_VISUAL[effect.type][1]+'</span>';
		else
			text += ' <span style="color:#f00">'+effect.amount[lvl]+EFFECTTYPE_VISUAL[effect.type][1]+'</span>';
	}
	// visual 0 beduetet gr&uuml;n bei negativen und rot bei pos werten
	if (EFFECTTYPE_VISUAL[effect.type][0] == 0){
		if (effect.amount[lvl] < 0)
			text += ' <span style="color:#0f0">'+effect.amount[lvl]+EFFECTTYPE_VISUAL[effect.type][1]+'</span>';
		else
			text += ' <span style="color:#f00">+'+effect.amount[lvl]+EFFECTTYPE_VISUAL[effect.type][1]+'</span>';
	}
	// visual 2 ist immer rot
	if (EFFECTTYPE_VISUAL[effect.type][0] == 2){
		text += ' <span style="color:#f00">'+effect.amount[lvl]+EFFECTTYPE_VISUAL[effect.type][1]+'</span>';
	}
	// ist das gebiet wo es wirkt nicht &uuml;berall so zeige an wo es nur wirkt
	if(effect.loc != EL.EVERYWHERE) {
		text += " im Gebiet "+EFFECTLOCATION[effect.loc];
	}
	// wo es wirkt ( dabei wird bei ALly -> enemy "beim" benutzt und bei Allem "bei" )
	if((effect.side == ES.ALLY ) || (effect.side == ES.SELFANDALLY ) || (effect.side == ES.ENEMY))
		text += " beim "+EFFECTAT[effect.side];
	if(effect.side == ES.ALL)
		text += " bei "+EFFECTAT[effect.side];
	// gibt es etwas rassenspezifisches :
	if (effect.race != ER.ALLWAYS){
		// dagegen oder daf&uuml;r ?
		if (effect.special == EC.AGAINST)
			text += " in der Schlacht gegen "+EFFECTRACE[effect.race];
		else
			text += " bei eigener Rasse "+EFFECTRACE[effect.race];
	}
	// nun die spezialf&auml;lle
	if (effect.special == EC.ONLYASDEFENDER)
		text += " als Sippenburgverteidiger";
	if (effect.special == EC.AGAINSTFRACTION)
		text +=  " in der Schlacht gegen feindliche Fraktion";
	return text;
}
function effect2Text(effect,lvl){
	if (effect == false)
		return "";
	var str = "";
	if ($.isArray(effect)){
		for(var i = 0;  i < effect.length; i++){
			str += effect2Textinner(effect[i],lvl) + "</br>";
		}
		str = str.substring(0,str.length-5);
	}
	else
		str += effect2Textinner(effect,lvl);
	return str;
}
const MAGIC_NAME = [
	"Schutz",
	"Schutz f&uuml;r Alliierten",
	"Alliiertenschutz",
	"Bergbautarnung",
	"W&uuml;stentarnung",
	"Waldtarnung",
	"Steppentarnung",
	"Schutzgeist der Ritterlandes",
	"Schutzgeist des Lichtelfenlandes",
	"Schutzgeist des D&auml;monenlandes",
	"Schutzgeist des Finsterelefenlandes",
	"Kenntnisse &uuml;ber Monster-Angewohnheiten",
	"Magierschutz",
	"Verteidigungs-Meisterschaft",
	"Fluch der Verwundbarkeit",
	
	"Armeeausdauer",
	"Alliiertenausdauer",
	"Standfestigkeit der Alliierten",
	"Tr&auml;gerausdauer",
	"Standfestigkeit der Tr&auml;ger",
	"Standfestigkeit der Krieger",
	"Standfestigkeit der Reiter",
	"Standfestigkeit der Flieger",
	"Standfestigkeit der Sch&uuml;tzen",
	"Standfestigkeit der Heiler",
	"Standfestigkeit der Magier",
	
	"Armeest&auml;rke",
	"St&auml;rke f&uuml;r den Allierten",
	"Wut der Berge",
	"Wut der W&uuml;ste",
	"Wut des Waldes",
	"Wut der Steppe",
	"Kenntnisse &uuml;ber Schwachstellen der Monster",
	"Wut aller Krieger",
	"Wut aller Reiter",
	"Wut aller Flieger",
	"Wut aller Sch&uuml;tzen",
	"Wut der Magier",
	"Magierinspiration",
	"Wut der Ritterkrieger",
	"Wut der reitenden Ritter",
	"Wut der fliegenden Ritter",
	"Wut der Rittersch&uuml;tzen",
	"Wut der Lichtelfenkrieger",
	"Wut der reitenden Lichtelfen",
	"Wut der fliegenden Lichtelfen",
	"Wut der Lichtelfensch&uuml;tzen",
	"Wut der D&auml;monenkrieger",
	"Wut der reitenden D&auml;monen",
	"Wut der fliegenden D&auml;monen",
	"Wut der D&auml;monensch&uuml;tzen",
	"Wut der Finsterelfenkrieger",
	"Wut der reitenden Finsterelfen",
	"Wut der fliegenden Finsterelfen",
	"Wut der Finsterelfensch&uuml;tzen",
	"Anpassung ans Gel&auml;nder",
	"Schw&auml;che des Feindes",
	"Monsterunterdr&uuml;ckung",
	"Schw&auml;che der feindlichen Magier",
	"Schw&auml;che aller Magier",
	"Fluch der Schw&auml;che",
	"Virus",
	
	"Allgemeine Verfolgung",
	"Krieger-Verfolger",
	"Reiter-Verfolger",
	"Flieger-Verfolger",
	"Sch&uuml;tzen-Verfolger",
	"Verfolgungsgeist des Ritterlandes",
	"Verfolgungsgeist des Lichtelfenlandes",
	"Verfolgungsgeist des D&auml;monenlandes",
	"Verfolgungsgeist des Finsterelfenlandes",
	"Schw&auml;che der Verfolger",
	"Verbesserung der Heiler",
	"Verbesserung der Heiler vom Alliierten",
	"Verbesserung der Magier",
	"Schutzmagier",
	"Unterdr&uuml;ckung der gegnerischen Heiler",
	"Unterdr&uuml;ckung der gegnerischen Magier",
	
	"Erleuchtung",
	"Erlecuhtung des Alliierten",
	"Rittervernichter",
	"Lichtelfenvernichter",
	"D&auml;monenvernichter",
	"Finsterelfenvernichter",
	"Monstervernichter",
	"Verminderung der feindlichen Erfahrung",
	
	"Horror",
	"Furchtlosigkeit",
	"Verwundete t&ouml;ten",
	"Katapult",
	"Trojanisches Pferd",
	"Balliste",
	"Bilde",
	"Erdbeben",
	"Belagerungsturm",
	"Balliste der Helden",
	"Balliste",
	"FUCKING ARMAGEDDOOOOOOOON BOOOOM!",
	"Totenbeschw&ouml;rung der eigenen Truppen",
	"Alliiertentotenbeschw&ouml;rung",
	"Erweckung der gefallenen Feinde",
	"Supertotenbeschw&ouml;rung",
	"Kriegerunterhalt",
	"Reiterunterhalt",
	"Fliegerunterhalt",
	"Sch&uuml;tzenunterhalt",
	"Heilerunterhalt",
	"S&ouml;ldnerunterhalt",
	"Magierunterhalt",
	
	"Krone",
	"Nachricht aus der H&ouml;lle",
	"D&auml;monenring",
	"Verwundbarkeit des Gegners",
	"Fluch des Maximalschutzes",
	"Allgemeine Schw&auml;che",
	"Mitleid",
	"Falle",
	"Teerkessel des Feindes",
	"Verteidigungsbilde",
	"Unterdr&uuml;ckung der Festungen",
	"Unterdr&uuml;cken der T&uuml;rme",
	"Unterdr&uuml;ckung der magischen T&uuml;rme",
	"Modernisierung der Festungen",
	"Festungstaktik",
	"Verbesserung der normalen T&uuml;rme",
	"Verbesserung der magischen T&uuml;rme",
	"Fluch der Festungen",
	"Fluch der T&uuml;rme",
	"Fluch der magischen T&uuml;rme",
	
	"Arznei gegen Langeweile",
	"Truppenverst&auml;rkung",
	"Feuerwut von S&ouml;ldnern",
	"Monsterunterwerfung",
	"Verteidigung gleich Kriegsst&uuml;tze",
	"Chitin ist auch R&uuml;stung",
	"Chitin f&uuml;r alle",
	"Lebenskraft von Harnischm&auml;nnern",
	"Standhaftigkeit von Tr&auml;gern",
	"Feld&auml;rzte",
	"Komet-Verteidiger",
	"Blockierung - einen Schirtt vorran",
	"Keine Ahnung",
	"Milit&auml;rgeschichteuntericht",
	"Supoer Horror",
	
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
	"Sippenburgstandarte",
];

const HEROSKILL_NAME = [
	["Turmmeister",
	"Mobilfestung",
	"Festungstaktik",
	"Verteidigungsmeisterschaft",
	"Geist des Altruismus"],
	["Totenbeschw&ouml;rung der eigenen Truppen",
	"Wut der Magier",
	"Armeeasudauer",
	"Alliiertenausdauer",
	"Verbesserung der Heiler",
	"Heilerunterhaltung",
	"Magierschutz",
	"Magierunterhaltung",
	"Schw&auml;che der feindlichen Magier",
	"Unterdr&uuml;ckung der gegnerischen Heiler",
	"Unterdr&uuml;cker der magischen T&uuml;rme"],
	["Schutz gegen Festungen",
	"Schutz",
	"Schutz f&uuml;r Alliierten",
	"Vermiderung der feindlichen Erfahrung",
	"Monstervernichter",
	"Armeest&auml;rke",
	"St&auml;rke f&uuml;r den Alliierten"],
	["Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer",
	"Greuel",
	"Unterdr&uuml;ckung der gegnerischen Heiler"],
	["Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer",
	"Greuel"],
	["Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer",
	"Greuel",
	"Unterdr&uuml;ckung der gegnerischen Heiler"],
	["Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer",
	"Greuel",
	"Unterdr&uuml;ckung der gegnerischen Heiler",
	"Armeest&auml;rke",
	"St&auml;rke f&uuml;r den Alliierten",
	"Schutz",
	"Schutz f&uuml;r Alliierten"],
	["Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer",
	"Greuel",
	"Schutz",
	"Schutz f&uuml;r Alliierten"],
	["Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer",
	"Greuel"],
	["Falle",
	"Furchtlosigkeit",
	"Krone",
	"Unterdr&uuml;ckung der gegnerischen Heiler",
	"Verwundete t&ouml;ten",
	"Unterdr&uuml;ckung aller Truppen",
	"Verwundbarkeit der Angreifer"],
	];
const ARTEFACT_BELT_TOOLTIP = [];
{
	ARTEFACT_BELT_TOOLTIP[0] = 'Taschenumfang <span style="color:#0f0">+5</span><br>Beschleunigung der Alchemistenlabore <span style="color:#0f0">+5%</span>';
	ARTEFACT_BELT_TOOLTIP[1] = 'Taschenumfang <span style="color:#0f0">+10</span><br>Beschleunigung der Alchemistenlabore <span style="color:#0f0">+10%</span>';
	ARTEFACT_BELT_TOOLTIP[2] = 'Taschenumfang <span style="color:#0f0">+15</span><br>Beschleunigung der Alchemistenlabore <span style="color:#0f0">+15%</span>';
	ARTEFACT_BELT_TOOLTIP[3] = 'Taschenumfang <span style="color:#0f0">+20</span><br>Beschleunigung der Alchemistenlabore <span style="color:#0f0">+20%</span>';
	ARTEFACT_BELT_TOOLTIP[4] = 'Taschenumfang <span style="color:#0f0">+25</span><br>Beschleunigung der Alchemistenlabore <span style="color:#0f0">+25%</span>';
}
const ARTEFACT_SET_TOOLTIP = [];
{
	ARTEFACT_SET_TOOLTIP[0] = '<br>Wissenschaft <span style="color:#0f0">+1000</span> auch unterwegs<br>Zeigt geschlossene Tore auch unterwegs';
	ARTEFACT_SET_TOOLTIP[1] = '<br>Wissenschaft <span style="color:#0f0">+2000</span> auch unterwegs<br>Zeigt geschlossene Tore auch unterwegs';
	ARTEFACT_SET_TOOLTIP[2] = '<br>Wissenschaft <span style="color:#0f0">+3000</span> auch unterwegs<br>Zeigt geschlossene Tore auch unterwegs';
	ARTEFACT_SET_TOOLTIP[3] = '<br>Wissenschaft <span style="color:#0f0">+4000</span> auch unterwegs<br>Zeigt geschlossene Tore auch unterwegs';
	ARTEFACT_SET_TOOLTIP[4] = '<br>Wissenschaft <span style="color:#0f0">+5000</span> auch unterwegs<br>Zeigt geschlossene Tore auch unterwegs';
}
	
const ARTEFACT_TOOLTIP = [];
{
	ARTEFACT_TOOLTIP[0] = 
		[['Holzf&auml;llergl&uuml;ck','<span style="color:#0f0">+1500</span> Holz / Stunde'],
		 ['Kapuze der Waldg&ouml;tter',''],
		 ['Heiliger Klee','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+10%</span>'],
		 ['Holzschlagring',''],
		 ['Waldpanzerhemd',''],
		 ['G&uuml;rtel des Heeerf&uuml;hres',''],
		 ['Elfenbogen',''],
		 ['Waldmeilenstiefel','Geschwindigkeit <span style="color:#0f0">-15%</span> im Terrain W&auml;lder'],
		 ['Elfenbogen',''],
		 ['']];     
	ARTEFACT_TOOLTIP[1] = 
		[['Talisman der Bauarbeiterbegrenzung','Beim Sieg : Sanierungsdauer <span style="color:#f00">+100%</span> f&uuml;r 1 Tag'],
		 ['Barbuta des Bauarbeiters','Wissenschafft Sanierung <span style="color:#0f0">+10</span>'],
		 ['Magische S&auml;ge des Bauarbeiters','Bau- und Ausbauzeit <span style="color:#0f0">-10%</span>'],
		 ['Ring der Bauarbeiterbegrenzung','Beim Sieg : Sanierungsdauer <span style="color:#f00">+100%</span> f&uuml;r 1 Tag'],
		 ['Panzerung des Bauarbeiters','Bau- und Ausbauzeit <span style="color:#0f0">-10%</span>'],
		 ['G&uuml;rtel des Bauarbeiters',''],
		 ['Hellebarde des Bauarbeiters',''],
		 ['Lederstiefel der Verlangsamung','Dauer der eingehenden Angriffe <span style="color:#0f0">+50%</span>'],
		 ['Schild  des Bauarbeiters',''],
		 ['<br>Wissenschafft Geb�udebau <span style="color:#0f0">+1</span>']];
	ARTEFACT_TOOLTIP[2] = 
		[['Nomadentalisman','Wahrscheinlichkeit eines Minimalangriffs <span style="color:#f00">+15%</span> beim Gegner'],
		 ['Nomadenhut',''],
		 ['Nomadenb&uuml;ndel',''],
		 ['Nomadenring','Wissenschafft Diplomatie <span style="color:#0f0">+2</span>'],
		 ['Lederausr&uuml;stung des Nomaden',''],
		 ['Nomadeng&uuml;rtel',''],
		 ['Nomadenkn&uuml;ppel',''],
		 ['Nomadenstiefel','Geschwindigkeit <span style="color:#0f0">-15%</span> im Terrain Steppe'],
		 ['Leichter Nomadenschild',''],
		 ['']];
	ARTEFACT_TOOLTIP[3] = 
		[['Bergbewohnertalisman','Beim Sieg : Stoppt Geb&auml;udetyp Steinbruch f&uuml;r 1 Tag'],
		 ['Bergbewohnerhelm',''],
		 ['Bergerfahrung',''],
		 ['Bergbewohnersiegel',''],
		 ['Bergbewohnerhemd',''],
		 ['Bergbewohnerg&uuml;rtel',''],
		 ['Wutklinge des Bergbewohners',''],
		 ['Bergschuhe','Geschwindigkeit <span style="color:#0f0">-15%</span> im Terrain Berge'],
		 ['Bergschild',''],
		 ['']];
	ARTEFACT_TOOLTIP[4] = 
		[['Erfoschermasskote','Sterbewahrscheinlichkeit des Erfoschers <span style="color:#0f0">-10%</span>'],
		 ['Erfoscherhut','Beim Sieg : Sterbewahrscheinlichkeit des Erfoschers <span style="color:#f00">+20%</span> f&uuml;r 3 Tage'],
		 ['Gro&szlig;er Kartenkatalog','Wissenschafft Kartographie <span style="color:#0f0">+3</span>'],
		 ['Unterdr&uuml;ckungsring des Erfoschers','Beim Sieg : Missionsdauer Erfoscher <span style="color:#f00">+100%</span> f&uuml;r 3 Tage'],
		 ['Erforscherhemd',''],
		 ['Erfoscherg&uuml;rtel',''],
		 ['Marschdegen des Erforschers',''],
		 ['Erfoscherstiefel','Missionsdauer Erfoscher <span style="color:#0f0">-15%</span>'],
		 ['Marschschild des Erfoschers',''],
		 ['<br>Wissenschafft Kartographie <span style="color:#0f0">+10</span>']];
	ARTEFACT_TOOLTIP[5] = 
		[['W&uuml;stenmaskotte','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+25%</span> in der W&uuml;ste'],
		 ['Manaturban','Maximalmana <span style="color:#0f0">+2000</span>'],
		 ['W&uuml;stengeist','Manaregeneration <span style="color:#0f0">+200/Std</span>'],
		 ['Handelsring','Wissenschafft Markt <span style="color:#0f0">+2</span>'],
		 ['W&uuml;stenweste',''],
		 ['W&uuml;steng�rtel',''],
		 ['Yatagan',''],
		 ['W&uuml;stenstiefel','Geschwindigkeit <span style="color:#0f0">-25%</span> im Terrain W&uuml;ste'],
		 ['W&uuml;stenschild',''],
		 ['<br>Scheitern des gegnerischen Zaubers <span style="color:#0f0">25%</span>']];
	ARTEFACT_TOOLTIP[6] = 
		[['Talisman der Sch&uuml;tzenunterdr&uuml;ckung',''],
		 ['Helm des Sch&uuml;tzen',''],
		 ['K&ouml;cher des Sch&uuml;tzen',''],
		 ['Schw&auml;chering des Sch&uuml;tzers',''],
		 ['Ringplattenr&uuml;stung des Scharsch&uuml;tzen',''],
		 ['G&uuml;rtel des Scharfsch&uuml;tzen',''],
		 ['Titanbogen des Scharfsch&uuml;tzen',''],
		 ['Stiefel des Scharfsch&uuml;tzen','Trainigszeit Sch&uuml;tzen <span style="color:#0f0">-25%</span>'],
		 ['Titanbogen des Scharfsch&uuml;tzen',''],
		 ['']];
	ARTEFACT_TOOLTIP[7] = 
		[['Talisman der Sonderausbildung','Automatische Ausbildung der Sonderunits'],
		 ['Todesmaske der S&ouml;ldner','Beim Sieg : Stoppt Produktion S&ouml;ldner f&uuml;r 1 Tag'],
		 ['Todesumhang der Spione','Beim Sieg : Stoppt Geb&auml;udetyp Spionagegilde f&uuml;r 1 Tag'],
		 ['Armband der Hellseher','Beim Sieg : Stoppt Geb&auml;udetyp Hellsehergeb&auml;ude f&uuml;r 1 Tag'],
		 ['Draufg&auml;ngersoutane',''],
		 ['Draufg&auml;ngerg&uuml;rtel',''],
		 ['Draufg&auml;ngerdegen',''],
		 ['Siebenmeilenstiefel','Wissenschafft Spionage <span style="color:#0f0">+6</span>'],
		 ['St&auml;rkedolch',''],
		 ['<br>Beim Sieg : Stoppt Produktion aller Kampfeinheiten f&uuml;r 1 Tag']];
	ARTEFACT_TOOLTIP[8] = 
		[['Steppentalisman','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+25%</span> in der Steppe'],
		 ['Helm der Turmherabsetzung',''],
		 ['Beschw&ouml;rerstab','Zauberreichweite <span style="color:#0f0">+6</span>'],
		 ['Ring des Steppenkriegers',''],
		 ['Panzer des Steppenkriegers',''],
		 ['G&uuml;rtel des Steppenkriegers',''],
		 ['Stab des Steppenkriegers',''],
		 ['Stiefel des Steppenkriegers','Geschwindigkeit <span style="color:#0f0">-25%</span> im Terrain Steppe<br>Missionsdauer H&auml;ndler <span style="color:#0f0">-25%</span> in der Steppe'],
		 ['Steppenschild',''],
		 ['']];
	ARTEFACT_TOOLTIP[9] = 
		[['Gl&uuml;cksb&uuml;ndel','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+25%</span> gegen Monster'],
		 ['Helm des Monstervernichters',''],
		 ['Maskotte der Fliegerst&auml;rke',''],
		 ['Ring des Monstervernichters',''],
		 ['Panzerung des Monstervernichters',''],
		 ['Tasche des Monstervernichters',''],
		 ['Monsteralbtraum',''],
		 ['Stiefel des Monstervernichters','Dauer der eingehenden Monsterangriffe <span style="color:#0f0">+2000%</span>'],
		 ['Angstschild der Monster',''],
		 ['']];
	ARTEFACT_TOOLTIP[10] = 
		[['Amulett der verdammten Magier',''],
		 ['Helm der Verletzbarkeit von Magiern',''],
		 ['Alchemistenm&uuml;nze','<span style="color:#0f0">+5000</span> Gold / Stunde'],
		 ['Schutzring vor Magie','Scheitern des gegnerischen Zaubers <span style="color:#0f0">20%</span>'],
		 ['Panzerhemd des Antimagiers',''],
		 ['G&uuml;rtel des Antimagiers',''],
		 ['Klinge des Magiertodes','Beim Sieg : Stoppt Produktion Magier f&uuml;r 1 Tag'],
		 ['Eisenstiefel der Verlangsamung','Dauer der eingehenden Angriffe <span style="color:#0f0">+100%</span>'],
		 ['Antimagierschild',''],
		 ['</br>Beim Sieg : Trainigszeit Magier <span style="color:#f00">+100%</span> f&uuml;r 3 Tage']];
	ARTEFACT_TOOLTIP[11] = 
		[['Halskette der Kriegerkraft',''],
		 ['Helm der Kriegerverletzbarkeit',''],
		 ['Manatopf','Maximalmana <span style="color:#0f0">+2000</span>'],
		 ['Ring der Kriegerschw&auml;che',''],
		 ['R&uuml;stung des Kriegers',''],
		 ['Kriegerg&uuml;rtel',''],
		 ['Schwert der Kriegerkraft',''],
		 ['Stiefel der Kriegerausbilder','Trainigszeit Krieger <span style="color:#0f0">-25%</span>'],
		 ['Kriegerschild',''],
		 ['']];
	ARTEFACT_TOOLTIP[12] = 
		[['Kreuz der Verletzbarkeit der Gegner',''],
		 ['Topfhelm des St&uuml;rmers','Beim Sieg : Stoppt Geb&auml;udetyp Festung f&uuml;r 2 Stunden'],
		 ['Leitung zum &Uuml;berwinden der Festungen',''],
		 ['Ring der Schutzaufhebung',''],
		 ['Leminarr&uuml;stung des St&uuml;rmers',''],
		 ['G&uuml;rtel des St&uuml;rmers',''],
		 ['Stab der Zerst&ouml;rung','Ben&ouml;tigte Angriffst&auml;rke bei Geb&auml;udezerst&ouml;rung <span style="color:#0f0">-40%</span>'],
		 ['Stiefel des St&uuml;rmers','<br>Geschwindigkeit <span style="color:#f00">+40%</span>'],
		 ['Turmschild',''],
		 ['</br>Beim Sieg : Stoppt Geb&auml;udetyp Turm f&uuml;r 2 Stunden']];
	ARTEFACT_TOOLTIP[13] = 
		[['Amulett der Gegnerschw&auml;che',''],
		 ['Gepanzerter Helm',''],
		 ['Manafl&auml;schchen','Maximalmana <span style="color:#0f0">+2000</span>'],
		 ['Ring der Unterdr&uuml;ckung von Verfolgern',''],
		 ['R&uuml;stung des Lebens',''],
		 ['Gepanzerte Tasche',''],
		 ['Festungsbeil',''],
		 ['Stiefel des Panzertr&auml;gers','<br>Geschwindigkeit <span style="color:#f00">+40%</span>'],
		 ['Gepanzerter Schild',''],
		 ['']];
	ARTEFACT_TOOLTIP[14] = 
		[['Amulett der R&uuml;stung','Beim Sieg : Zerst&ouml;rt <span style="color:#f00">1.000.000</span> Eisen'],
		 ['Bergarbeiterhelm','Ertrag der Steinbr&uuml;che <span style="color:#0f0">+250%</span>'],
		 ['Amboss','<span style="color:#0f0">+250</span> Eisen / Stunde'],
		 ['Ring der Holzgewinnung','Ertrag der Holzf&auml;llerh&uuml;tten <span style="color:#0f0">+400%</span>'],
		 ['Berarbeiterweste','Ertrag der Eisenmienen <span style="color:#0f0">+400%</span>'],
		 ['Bergarbeiterg&uuml;rtel',''],
		 ['Turmbeil',''],
		 ['Stiefel der Steinzerst&ouml;rung','Beim Sieg : Zerst&ouml;rt <span style="color:#f00">5.000.000</span> Stein'],
		 ['Garnisionsschild',''],
		 ['']];
	ARTEFACT_TOOLTIP[15] = 
		[['Seeamulett des Gl&uuml;cks','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+40%</span> im Salzsee'],
		 ['Verteidigungsseehelm','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#f00">-40%</span> im Salzsee beim Gegner'],
		 ['Netz des Seeschutzes',' im Salzsee'],
		 ['Seearmband der Unterwerfung',' im Salzsee'],
		 ['Seer&uuml;stung',' im Salzsee'],
		 ['Seeg&uuml;rtel',''],
		 ['Seedreieck des Angriffs',' im Salzsee'],
		 ['Seestiefel der Verlangsamung','Dauer der eingehenden Angriffe <span style="color:#0f0">+200%</span> im Salzsee'],
		 ['Seedreieck des Angriffs',' im Salzsee'],
		 [' im Salzsee']];
	ARTEFACT_TOOLTIP[16] = 
		[['Unterirdisches Gl&uuml;ckstalisman','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+25%</span> im Verlies'],
		 ['Unterirdische Angstmaske',''],
		 ['Allersichtiges Gew&ouml;lbeauge','Erlaubt echte Angriffe zu sehen im Verlies'],
		 ['Ring der Gew&ouml;lbeverteidigung','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#f00">-40%</span> im Verlies beim Gegner'],
		 ['Gebw&ouml;lbepanzer',''],
		 ['Gebw&ouml;lbeg&uuml;rtel',''],
		 ['Unterirdisches Zornschwert',''],
		 ['Gebw&ouml;lbestiefel der Verlangsamung','Dauer der eingehenden Angriffe <span style="color:#0f0">+150%</span> im Verlies'],
		 ['Unterirdisches Schild',''],
		 ['']];
	ARTEFACT_TOOLTIP[17] = 
		[['Freundschaftstotem',''],
		 ['Freundschaftshelm','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#f00">-25%</span> beim Gegner'],
		 ['Fernrohr der Hellseherei','Wissenschafft �berwachung <span style="color:#0f0">+10</span>'],
		 ['Freundschaftsring','Wissenschafft Diplomatie <span style="color:#0f0">+4</span>'],
		 ['Freundschaftsharnisch',''],
		 ['Schutzherrg&uuml;rtel',''],
		 ['S&auml;bel der Verfolgung',''],
		 ['Bronzestiefel der Verlangsamung','Dauer der eingehenden Angriffe <span style="color:#0f0">+100%</span>'],
		 ['Freundschaftsschild',''],
		 ['</br>Informiert &uuml;ber Gegenangriffe auch unterwegs<br>Zeigt Alliierte auf der Karte auch unterwegs']];
	ARTEFACT_TOOLTIP[18] = 
		[['Elexir der Erkenntnis','Trainigszeit aller Kampfunits <span style="color:#0f0">-30%</span> beim Verb&uuml;ndeten als Sippenburgverteidiger'],
		 ['Geschlossenes Fallgatter',''],
		 ['Hochporal',''],
		 ['Schlosssiegel',''],
		 ['Korslet von Koloss',''],
		 ['Sch&auml;rpe von Gargouille',''],
		 ['Sagaris des Schutzmannes',''],
		 ['Sch&uuml;tze von Schlosshartschier','Dauer der eingehenden Angriffe <span style="color:#0f0">+200%</span> beim Verb&uuml;ndeten als Sippenburgverteidiger'],
		 ['Letzes Bollwerk',''],
		 ['']];
	ARTEFACT_TOOLTIP[19] = 
		[['Halskette des Magierunterdr&uuml;cker',''],
		 ['Grauensmaske',''],
		 ['Kristalle des Magierb&ouml;sblicks',''],
		 ['Ring des Antimagiers','Scheitern des gegnerischen Zaubers <span style="color:#0f0">30%</span>'],
		 ['Kurasse der Magierunterdr&uuml;ckung',''],
		 ['G&uuml;rtel des Magierunterdr&uuml;ckers',''],
		 ['Flegel der Zerst&ouml;rung','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#f00">+60%</span>'],
		 ['Metrische Hindernisstiefel','Dauer der eingehenden Angriffe <span style="color:#0f0">+150%</span>'],
		 ['Turmschild des Antimagiers',''],
		 ['<br>Beim Sieg : Trainigszeit Magier <span style="color:#f00">+200%</span> f&uuml;r 3 Tage']];
	ARTEFACT_TOOLTIP[20] = 
		[['Diversionskreuz','Beim Sieg : Bau- und Ausbauzeit <span style="color:#f00">+200%</span> f&uuml;r 1 Tag'],
		 ['Morion der Kr&auml;fteauff&uuml;llung','Dauer von Benommenheit <span style="color:#0f0">-30%</span>'],
		 ['Manalampe','Manaregenration <span style="color:#0f0">+300</span>'],
		 ['Armband des kranken Restaurators','Beim Sieg : Sanierungsdauer <span style="color:#f00">+200%</span> f&uuml;r 1 Tag'],
		 ['Brustlatz des Bauarbeiters','Bau- und Ausbauzeit <span style="color:#0f0">-35%</span>'],
		 ['G&uuml;rtel des Bauarbeiters',''],
		 ['Kampfhellbarde des Bauarbeiters',''],
		 ['Stiefel der Missionsleitung','Wissenschafft Missionsleitung <span style="color:#0f0">+5</span>'],
		 ['Mittern&auml;chtiger Schild des Bauarbeiters',''],
		 ['<br>Wissenschafft Geb&auml;udebau <span style="color:#0f0">+1</span>']];
	ARTEFACT_TOOLTIP[21] = 
		[['Amulett der Verfolgung',''],
		 ['Helm der Reiter&uuml;berlegnheit',''],
		 ['Hufeisen des Gl&uuml;cks','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+30%</span>'],
		 ['Ring der Kraft&uuml;berlegenheit',''],
		 ['Ritterharnisch',''],
		 ['Satteltasche',''],
		 ['Reiterhammer',''],
		 ['Kanonenstiefel der Ausbildung','Trainigszeit Reiter <span style="color:#0f0">-35%</span>'],
		 ['Sterneschild',''],
		 ['']];
	ARTEFACT_TOOLTIP[22] = 
		[['Totem des Gro&szlig;em Templars',''],
		 ['Helm des gro&szlig;en Templers','Trainigskosten Heiler <span style="color:#0f0">-30%</span>'],
		 ['Heilige Blume','<span style="color:#0f0">+500</span> Getreide/Stunde'],
		 ['Ring der Heilerangst',''],
		 ['Harnisch vom gro&szlig;en Templar',''],
		 ['Templertasche',''],
		 ['Lebenschwert des Heilers',''],
		 ['Templerstiefel','Beim Sieg : Lohn Heiler <span style="color:f00">+100%</span> f&uuml;r 3 Tage'],
		 ['Verteidigungschild der Heiler',''],
		 ['']];
	ARTEFACT_TOOLTIP[23] = 
		[['Blutmarke',''],
		 ['Larve vom Bluttvetter','Die Tr&auml;ger rauben <span style="color:#0f0">20%</span> vom Wert der zerst�rten Einheiten des Gegner gegen feindliche Fraktion',''],
		 ['Panzerung des Paukanten',''],
		 ['Ring des R&auml;chers',''],
		 ['Schrammige Brigantine',''],
		 ['G&uuml;rtel des Paukanten',''],
		 ['Guisarme des R&auml;chers',''],
		 ['Eisenschuhe der R&auml;cher','<br>Geschwindigkeit <span style="color:#f00">+50%</span>'],
		 ['Guisarme des R&auml;chers',''],
		 ['']];
	ARTEFACT_TOOLTIP[24] = 
		[['Talisman der Gruben','Ertrag der Goldgruben <span style="color:#0f0">+500%</span>'],
		 ['Helm des Gro&szlig;en Herschers','Pl&uuml;nderung der Lagerh&auml;user <span style="color:#0f0">-50%</span>'],
		 ['Goldener Staat','<span style="color:#0f0">+7000</span> Gold/Stunde'],
		 ['Monoploistenring','Marktpreisrange <span style="color:#0f0">+4</span>'],
		 ['H&auml;ndlerharnisch','Traglast der H&auml;ndler <span style="color:#0f0">+250%</span>'],
		 ['Tasche des Gro&szlig;en Herschers',''],
		 ['Schwert des Gro&szlig;en Herschers',''],
		 ['H&auml;ndlerstiefel','Missionsdauer H&auml;ndler <span style="color:#0f0">-50%</span>'],
		 ['Schild des Gro&szlig;en Herschers',''],
		 ['<br>Wissenschafft Au&szlig;enl&auml;nderei <span style="color:#0f0">+1</span>']];
	ARTEFACT_TOOLTIP[25] = 
		[['Talisman des Legion&auml;rs',''],
		 ['Helm des erfahrenen Gladiatoren',''],
		 ['Fackel des Legion&auml;rs','Beim Sieg : <span style="color:#f00">-10.000</span> Holz/Stunde f�r 1 Tag<br>Beim Sieg : Stoppt Geb&auml;udetyp Holzf&auml;llerh&uuml;tte f&uuml;r 1 Tag'],
		 ['Kaisersiegel','Wissenschafft Diplomatie <span style="color:#0f0">+6</span>'],
		 ['Brustharnisch des Legion&auml;rs',''],
		 ['G&uuml;rtel des Legion&auml;rs',''],
		 ['Gladius des Legion&auml;rs','Trainigszeit Krieger <span style="color:#0f0">-35%</span>'],
		 ['Marschsandalen des Legion&auml;rs','Geschwindigkeit <span style="color:#0f0">-30%</span>'],
		 ['Schild des Legion&auml;rs',''],
		 ['']];
	ARTEFACT_TOOLTIP[26] = 
		[['Amulett der alliierten Handlungen',''],
		 ['Helm der Geb&auml;udestabilit&auml;t','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#f00">-35%</span> beim Gegner'],
		 ['Horn des Verteidigers vom Alliiertem','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+20%</span> beim Alliiertem und sich'],
		 ['Armband der Diplomatie','Wissenschafft Diplomatie <span style="color:#0f0">+6</span>'],
		 ['Plegeharnisch',''],
		 ['G&uuml;rtel des Verteidigers',''],
		 ['D&ouml;rne der Umz&auml;unung',''],
		 ['Verst&auml;rkungsstiefel','Dauer der eingehenden Verst&auml;rkungssmissionen <span style="color:#0f0">-30%</span><br>Versetzungsdauer der eingehenden Versetzungsmissionen <span style="color:#0f0">-30%</span>'],
		 ['Schild des Verteidigers vom Alliiertem',''],
		 ['<br>Informiert &uuml;ber Gegenangriffe auch unterwegs<br>Zeigt Alliierte auf der Karte auch unterwegs']];
	ARTEFACT_TOOLTIP[27] = 
		[['Amulett der Gl&uuml;cks&uuml;bernahme','Wahrscheinlichkeit eines Minimalangriffs <span style="color:#f00">+30%</span> beim Gegner'],
		 ['Gl&uuml;ckshelm','Schutz gegen negative Ereignisse auch unterwegs'],
		 ['Gl&uuml;cksknochen','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+30%</span>'],
		 ['Zufallsring','Allt&auml;gliche Chance auf ein zuf&auml;lliges Ereigniss <span style="color:#0f0">50%</span> auch unterwegs<br>Verl&auml;ngerungchance des Ereignisses <span style="color:#0f0">75%</span> auch unterwegs'],
		 ['Tr&auml;gerharnisch',''],
		 ['Gl&uuml;cksg&uuml;rtel des Soldaten',''],
		 ['Pernatsch der Zerst&ouml;rung','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#0f0">+60%</span>'],
		 ['Gl&uuml;cksstiefel der Erfoscher','Sterbewahrscheinlichkeit des Erfoschers <span style="color:#0f0">-40%</span>'],
		 ['Gl&uuml;cksschild des Soldaten',''],
		 ['<br>Chance auf Fund in Ruinen <span style="color:#0f0">+350%</span>']];
	ARTEFACT_TOOLTIP[28] = 
		[['Amulett des Luftkriegers',''],
		 ['Helm des Luftkriegers',''],
		 ['Schl&uuml;&szlig;el zu Gruben','<span style="color:#0f0">50%</span> der Geb&auml;ude in Gruben erleiden beim Angriff keinen Schaden'],
		 ['Ring des Luftkriegers',''],
		 ['Luftharnisch',''],
		 ['Fliegertasche',''],
		 ['Schwert des Luftkriegers',''],
		 ['Luftstiefel','Trainigszeit Flieger <span style="color:#0f0">-35%</span>'],
		 ['Schild des Luftkriegers',''],
		 ['']];
	ARTEFACT_TOOLTIP[29] = 
		[['Amulett der Truppenungehorsam','Beim Sieg : Lohn <span style="color:#f00">+60%</span>'],
		 ['Helm der Geb�udenfestigung','Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#f00">-35%</span> beim Gegner'],
		 ['Tuch der Befriedigung der Verfolger',''],
		 ['Friedensring',''],
		 ['Friedensbote',''],
		 ['G&uuml;rtel des Friedensstifters',''],
		 ['Dolch der Entlassung','Beim Sieg : Stoppt Produktion aller Kampfeinheiten f&uuml;r 1 Tag'],
		 ['Goldene Antimarschstiefel','Dauer der eingehenden Angriffe <span style="color:#0f0">+150%</span>'],
		 ['Schild des Friedenstifters',''],
		 ['</br>Beim Sieg : Truppen sind in der L&auml;nderei gefangen f&uuml;r 12 Stunden']];
	ARTEFACT_TOOLTIP[30] = 
		[['Talisman des Erfoschers','Sterbewahrscheinlichkeit des Erfoschers <span style="color:#0f0">-100%</span>'],
		 ['Helm der Erfoscherdivision','Beim Sieg : Stoppt Geb&auml;udetyp Expedtionscorps f&uuml;r 1 Tag'],
		 ['Kompa&szlig; des Erfoschers','Wissenschafft Kartographie <span style="color:#0f0">+12</span>'],
		 ['Schutzring der Sch&uuml;tzen',''],
		 ['Sch&uuml;tzenharnisch',''],
		 ['Erfoschertasche',''],
		 ['Armbrust des Sch&uuml;tzenzorns',''],
		 ['Meilenstiefel des Erfoschers','Missionsdauer Erfoscher <span style="color:#0f0">-45%</span>'],
		 ['Armbrust des Sch&uuml;tzenzorns',''],
		 ['<br>Wissenschafft Heldenleitung <span style="color:#0f0">+1</span> ( Maximum 4)']];
	ARTEFACT_TOOLTIP[31] = 
		[['Amulett des Monsterverm&auml;chtnisses','Erh&auml;lten <span style="color:#0f0">100%</span> Rohstoffe aus dem von Monstern verlassene Ruinen im K&ouml;nigreich'],
		 ['Helm der Monstervernichtung',''],
		 ['Gl&uuml;ckspokal','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+45%</span> gegen Monster'],
		 ['Armband der Nichtber&uuml;hrung','Monster k&ouml;nnen ihre L&auml;nderei nicht angreifen'],
		 ['R&uuml;stung aus Monsterharnischen',''],
		 ['G&uuml;rtel aus Monsterleder',''],
		 ['Speer des Monsterherrschers',''],
		 ['Stiefel des Artefaktenj&auml;gers','Chance auf Fund in Ruinen <span style="color:#0f0">+400%</span>'],
		 ['Schilde des Monsterhrerschers',''],
		 ['']];
	ARTEFACT_TOOLTIP[32] = 
		[['Amulett der Spionendiversion','Beim Sieg : Stoppt Geb&auml;udetyp Spionengilde f&uuml;r 2 Tage'],
		 ['Spionenhelm','Wissenschafft Spionage <span style="color:#0f0">+12</span>'],
		 ['Spionenfeder',''],
		 ['Ring der Hellsehervernichtung','Beim Sieg : Stoppt Geb&auml;udetyp Hellseherturm f&uuml;r 2 Tage'],
		 ['R&uuml;stung der H&auml;ndlerdiversion','Beim Sieg : Stoppt Geb&auml;udetyp H&auml;ndlergilde f&uuml;r 1 Tag und 12 Stunden'],
		 ['Spioneng&uuml;rtel',''],
		 ['Diversionspfote der Antispione','Beim Sieg : Stoppt Geb&auml;udetyp Antipsionengilde f&uuml;r 3 Tage'],
		 ['Armeemeilenstiefel','Geschwindigkeit <span style="color:#0f0">-40%</span>'],
		 ['Schild der Spiegeldiversion','Beim Sieg : Stoppt Geb&auml;udetyp Spiegelturm f&uuml;r 3 Tage'],
		 ['<br>Wissenschafft �berwachung <span style="color:#0f0">+12</span>']];
	ARTEFACT_TOOLTIP[33] = 
		[['H&auml;ndlerkragen','Lagerkapazit&auml;t <span style="color:#0f0">+200%</span>'],
		 ['Helm der globalen Bebauung','Wissenschafft Geb&auml;udebau <span style="color:#0f0">+1</span>'],
		 ['Handschuh des Diebesvernichters','Pl&uuml;nderung der Lagerh&auml;user <span style="color:#0f0">-75%</span>'],
		 ['Armband des freien H&auml;ndlers','Marktpreisrange <span style="color:#0f0">+6</span>'],
		 ['Mantel des Gro&szlig;en H&auml;ndlers','Wissenschafft Markt <span style="color:#0f0">+12</span>'],
		 ['H&auml;ndlerg&uuml;rtel',''],
		 ['Schwert der Konkurenzunterdr&uuml;ckung','Beim Sieg : Stoppt Geb�udetyp Markt f&uuml;r 3 Tage'],
		 ['H&auml;ndlermeilenstiefel','Missionsdauer H&auml;ndler <span style="color:#0f0">-75%</span>'],
		 ['Schild der S&ouml;ldnerbestechung',''],
		 ['<br>Wissenschafft Kolonisation <span style="color:#0f0">+1</span>']];
	ARTEFACT_TOOLTIP[34] = 
		[['Blutige Rose der Qual',''],
		 ['Helm der Imdulgenz','Negatives Fraktionsranking f�r das Angreifen eigener Fraktion <span style="color:#0f0">-100%</span>'],
		 ['Heilnadel der Genesung',''],
		 ['Ring der Verleugnung',''],
		 ['Panzerhemd des Schmerzes',''],
		 ['G&uuml;rtel des Inquisitors',''],
		 ['Totschl&auml;ger der Verst&uuml;mmelung',''],
		 ['Stachelstiefel','Wissenschafft Missionsleitung <span style="color:#0f0">+10</span>'],
		 ['Schild der Reue',''],
		 ['']];
	ARTEFACT_TOOLTIP[35] = 
		[['Amulett des Totenbeschw&ouml;rers',''],
		 ['Pestsch&auml;del','Beim Sieg : <span style="color:#f00">-1000</span> Bewohner/Stunde f&uuml;r 1 Tag'],
		 ['Pl&uuml;nderkugel','Die Tr&auml;ger rauben <span style="color:#0f0">40%</span> vom Wert der zerst&ouml;rten Geb&auml;ude des Gegner'],
		 ['Ring des Schutzes vor Magie','Scheitern des gegnerischen Zaubers <span style="color:#0f0">40%</span>'],
		 ['Harnisch des Totenbeschw&ouml;rers',''],
		 ['G&uuml;rtel des Totenbeschw&ouml;rers',''],
		 ['Stab des Totenbeschw&ouml;rers',''],
		 ['Stiefel des Totenbeschw&ouml;rers',''],
		 ['Schild der Monsterl&auml;hmung','Monster k&ouml;nnen ihre L&auml;ndereien nicht angreifen',''],
		 ['']];
	ARTEFACT_TOOLTIP[36] = 
		[['Talisman des Magiermeisters','Manaregeneration <span style="color:#0f0">+400/Std</span>'],
		 ['Helm der Magierverteigung',''],
		 ['Kugel der magichen Kraft','Maximalmana <span style="color:#0f0">+4000</span>'],
		 ['Ring der magischen Schw&auml;che',''],
		 ['Magiermantel',''],
		 ['G&uuml;rtel des Magiermeisters',''],
		 ['Stab der Magierst&auml;rke',''],
		 ['Stiefel des Magiermeisters','Zauberreichweite <span style="color:#0f0">+12</span>'],
		 ['Stab der Magierst&auml;rke',''],
		 ['<br>Scheitern des gegnerischen Zaubers <span style="color:#0f0">45%</span>']];
	ARTEFACT_TOOLTIP[37] = 
		[['Talisman des Gehorsams','Verlassen der Wohnh&auml;user <span style="color:#0f0">-40%</span>'],
		 ['Helm der Sklavenunterwerfung','Beim Sieg : Stoppt Geb�udetyp Wohnhaus f&uuml;r 3 Tage'],
		 ['Ketten der Versklavung','Sklavennahme aus <span style="color:#0f0">20%</span>'],
		 ['Armband des Sklavenhalters',''],
		 ['R&uuml;stung des Sklavenhalters',''],
		 ['G&uuml;rtel des Sklavenhalters',''],
		 ['Schwert der Sklavenbestrafung','Beim Sieg : T&ouml;tet <span style="color:#f00">1.000.000</span> Bewohner'],
		 ['Titanstiefel der Verlangsamung','Dauer der eingehenden Angriffe <span style="color:#0f0">+200%</span>'],
		 ['Schild des Sklavenhalters',''],
		 ['<br>Sklavennahme aus <span style="color:#0f0">40%</span> ins Reservehaus']];
	ARTEFACT_TOOLTIP[38] = 
		[['Talisman des Gro&szlig;en Sp&auml;her','Informiert &uuml;ber Gegenangriffe auch unterwegs'],
		 ['Helm der doppelten Weisheit',''],
		 ['Siegreiches Gl&uuml;ckshorn','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+40%</span> beim Alliiertem und sich'],
		 ['Ring der Gro&szlig;en Diplomatie','Wissenschafft Diplomatie <span style="color:#0f0">+8</span>'],
		 ['Herrf&uuml;hrerr&uuml;stung',''],
		 ['G&uuml;rtel des Feldherren',''],
		 ['Schwert des gemeinsamen Angriffs',''],
		 ['Stiefel der schnellen Verst&auml;rkung','Dauer der eingehenden Verst&auml;rkungssmissionen <span style="color:#0f0">-75%</span>'],
		 ['Schild des doppelten Schutzes',''],
		 ['<br>Zeigt Alliierte auf der Karte auch unterwegs<br>Wissenschafft Lager <span style="color:#0f0">+2</span>']];
	ARTEFACT_TOOLTIP[39] = 
		[['Amulett der G&ouml;ttlichen Sehkraft','Erlaubt echte Angriffe zu sehen'],
		 ['Helm der g&ouml;ttlichen Weisheit','<br>Wissenschaft <span style="color:#0f0">+2000</span>'],
		 ['G&ouml;ttliches Instrument der Befriedung',''],
		 ['Gottes Armband','Ertrag der Eisenminen <span style="color:#0f0">+100%</span><br>Ertrag der Steinbr&uuml;che <span style="color:#0f0">+100%</span><br>Ertrag der Goldgruben <span style="color:#0f0">+100%</span><br>Ertrag der M&uuml;hlen <span style="color:#0f0">+100%</span><br>Ertrag der Holzf&auml;llerh&uuml;tten <span style="color:#0f0">+100%</span><br>Ertrag der Kaufl&auml;den <span style="color:#0f0">+100%</span>'],
		 ['Gottes Panzerhemd',''],
		 ['Gottes G&uuml;rtel',''],
		 ['Gottes Bogen','<br>Bev&ouml;lkerungszuwachs in Wohnh&auml;usern <span style="color:#0f0">+25</span>'],
		 ['Gottes Stiefel','Armee nimmt an einen ung�nstigen Kampf bei Angriff nicht statt'],
		 ['Gottes Schild',''],
		 ['<br>Armee versteckt sich im Versteck beim ung�nstigen Kampf']];
	ARTEFACT_TOOLTIP[40] = 
		[['Magischer Scropio','Trainigszeit Magier <span style="color:#0f0">-55%</span><br>Beim Sieg : Trainigszeit aller Kampfunits <span style="color:#f00">+200%</span> f&uuml;r 3 Tage'],
		 ['Helm der Desinformation','Desinformiert den Gegner durch das zuf&auml;llige &auml;ndern der Einheitenanzahl von 0% bis 400%'],
		 ['Lampe der Gro&szlig;en Spionage','Wissenschafft Spionage <span style="color:#0f0">+15</span>Zauberreichweite <span style="color:#0f0">+15</span>'],
		 ['Armband der Mordskerlbande','Wissenschafft Diplomatie <span style="color:#0f0">+10</span><br>Beim Sieg : <span style="color:#f00">-10.000</span> Holz/Stunde f&uuml;r 1 Tag<br>Beim Sieg : Stoppt Geb&auml;udetyp Holzf&auml;llerh&uuml;tte f&uuml;r 1 Tag'],
		 ['Panzerhemd des Mordskerls',''],
		 ['G&uuml;rtel des Mordskerls',''],
		 ['Beil des Mordskerls','<br>Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#0f0">+100%</span>'],
		 ['Expansionsstiefel','Wissenschafft Missionsleitung <span style="color:#0f0">+15</span>'],
		 ['Schild des Mordskerls',''],
		 ['']];
	ARTEFACT_TOOLTIP[41] = 
		[['Amulett der magischen Kraft','Maximalmana <span style="color:#0f0">+5000</span>'],
		 ['Helm des Archimagiers',''],
		 ['Stab des Schreckens',''],
		 ['Armband des Archimagiers','Stiehlt <span style="color:#0f0">50%</span> Mana des gegnerischen Heldens<br>Scheitern des gegnerischen Zaubers <span style="color:#0f0">50%</span>'],
		 ['Panzerhemd der magischen Gesundheit',''],
		 ['G&uuml;rtel des Archimagiers',''],
		 ['Zepter des Archimagiers',''],
		 ['Stiefel des Archimagiers','Wissenschafft &Uuml;berwachung <span style="color:#0f0">+15</span><br>Zauberreichweite <span style="color:#0f0">+15</span>'],
		 ['Schild des Archimagiers',''],
		 ['<br>Genaue Truppenzahl ist unbekannt']];
	ARTEFACT_TOOLTIP[42] = 
		[['Uraltes Amulett des Pillendrehers','Armee versteckt sich im Versteck nach einer Niederlage<br>Ertrag der Goldgruben <span style="color:#0f0">+1000%</span>'],
		 ['Helm des Weltherrschers',''],
		 ['Gro&szlig;er Pillendreher des Gl&uuml;cks','Wahrscheinlichkeit eines Maximalangriffs <span style="color:#0f0">+50%</span>'],
		 ['Legend&auml;res Armband der Einsparung','Goldkosten zum versenden von Missionen <span style="color:#0f0">-50%</span>'],
		 ['R&uuml;stung des Weltherrschers',''],
		 ['G&uuml;rtel des Weltherrschers',''],
		 ['Myriche Arcballiste',''],
		 ['Meilenstiefel des Weltherrschers','Geschwindigkeit <span style="color:#0f0">-50%</span>'],
		 ['Myriche Arcballiste',''],
		 ['<br>Angriffsmissionen des Helden sind unsichtbar<br>Zeigt Alliierte auf der Karte auch unterwegs']];
	ARTEFACT_TOOLTIP[43] = 
		[['Amulett des k&ouml;niglichen Kopfgelds','<br>Maximalmana <span style="color:#0f0">+5000</span><br>Manaregeneration <span style="color:#0f0">+500/Std</span>'],
		 ['Helm der k&ouml;niglichen Bildung','<br>Wissenschaft <span style="color:#0f0">+5000</span>'],
		 ['Handschuhe der k&ouml;niglichen Hingabe',''],
		 ['Ring der k&ouml;niglichen Macht','Scheitern des gegnerischen Zaubers <span style="color:#0f0">50%</span><br>Wissenschafft &Uuml;berwachung <span style="color:#0f0">+15</span><br>Wissenschafft Spionage <span style="color:#0f0">+15</span>'],
		 ['R&uuml;stung des k&ouml;niglichen Wiederstand',''],
		 ['G&uuml;rtel des k&ouml;niglichen Adel','<br>Chance auf Fund in Ruinen <span style="color:#0f0">+400%</span>'],
		 ['Schwert der k&ouml;niglichen Vergeltung','<br>Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#0f0">+100%</span>'],
		 ['Stiefel der k&ouml;niglichen Geschwindigkeit','Geschwindigkeit <span style="color:#0f0">-50%</span><br>Zauberreichweite <span style="color:#0f0">+15</span><br>Wissenschafft Missionsleitung <span style="color:#0f0">+25</span>'],
		 ['Schild der k&ouml;niglichen Unzug&auml;nglichkeit',''],
		 ['<br>Wissenschafft Heldenleitung <span style="color:#0f0">+1</span> ( Maximum 4)<br>Wissenschafft Kolonisation <span style="color:#0f0">+1</span><br>Angriffsmissionen des Helden sind unsichtbar']];
}

const ARTEFACT_CRYSTAL_TOOLTIP = [
	['Chance auf Fund in Ruinen <span style="color:#0f0">+25%</span>','Chance auf Fund in Ruinen <span style="color:#0f0">+50%</span>','Chance auf Fund in Ruinen <span style="color:#0f0">+100%</span>','Chance auf Fund in Ruinen <span style="color:#0f0">+150%</span>','Chance auf Fund in Ruinen <span style="color:#0f0">+200%</span>'],
	['</br>Wissenschafft Missionsleitung <span style="color:#0f0">+1</span>','</br>Wissenschafft Missionsleitung <span style="color:#0f0">+3</span>','</br>Wissenschafft Missionsleitung <span style="color:#0f0">+5</span>','</br>Wissenschafft Missionsleitung <span style="color:#0f0">+9</span>','</br>Wissenschafft Missionsleitung <span style="color:#0f0">+15</span>'],
	['','','','',''],
	['','','','',''],
	['','','','',''],
	['Taschenumfang <span style="color:#0f0">+3</span>','Taschenumfang <span style="color:#0f0">+6</span>','Taschenumfang <span style="color:#0f0">+9</span>','Taschenumfang <span style="color:#0f0">+12</span>','Taschenumfang <span style="color:#0f0">+15</span>'],
	['','','','',''],
	['Dauer der eingehenden Angriffe <span style="color:#0f0">+15%</span>','Dauer der eingehenden Angriffe <span style="color:#0f0">+25%</span>','Dauer der eingehenden Angriffe <span style="color:#0f0">+50%</span>','Dauer der eingehenden Angriffe <span style="color:#0f0">+100%</span>','Dauer der eingehenden Angriffe <span style="color:#0f0">+150%</span>'],
	['','','','',''],
];

const RUNE_NAMES = [];
{
	RUNE_NAMES[0] = "Feoh";
	RUNE_NAMES[1] = "Ur";
	RUNE_NAMES[2] = "Torn";
	RUNE_NAMES[3] = "Io";
	RUNE_NAMES[4] = "Rad";
	RUNE_NAMES[5] = "Tir";
	RUNE_NAMES[6] = "Gifu";
	RUNE_NAMES[7] = "Jar";
	RUNE_NAMES[8] = "Chegl";
}

const RUNE_JAR_EXTRA = ['Geschwindigkeit <span style="color:#0f0">-2%</span>',
                        'Geschwindigkeit <span style="color:#0f0">-4%</span>',
                        'Geschwindigkeit <span style="color:#0f0">-6%</span>',
                        'Geschwindigkeit <span style="color:#0f0">-8%</span>'];

// die verschiedenen spezeillen runenw&ouml;rter
const RUNE_WORD_NAMES = [];
{
	RUNE_WORD_NAMES[0] = 'Wissenschaft <span style="color:#0f0">+(500-700)</span>';
	RUNE_WORD_NAMES[1] = 'Wissenschaft <span style="color:#0f0">+(1000-1200)</span>';
	RUNE_WORD_NAMES[2] = 'Manaregeneration <span style="color:#0f0">+(100-120)/Std</span>';
	RUNE_WORD_NAMES[3] = 'Manaregeneration <span style="color:#0f0">+(200-240)/Std</span>';
	RUNE_WORD_NAMES[4] = 'Scheitern des gegnerischen Zaubers <span style="color:#0f0">(15-18)%</span>';
	RUNE_WORD_NAMES[5] = 'Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#0f0">+(25-30)%</span>';
	RUNE_WORD_NAMES[6] = 'Maximalmana <span style="color:#0f0">+(3000-3600)</span>';
	RUNE_WORD_NAMES[7] = 'Maximalmana <span style="color:#0f0">+(1000-1200)</span>';
	RUNE_WORD_NAMES[8] = 'Manaregeneration <span style="color:#0f0">+(300-360)/Std</span>';
	RUNE_WORD_NAMES[9] = 'Chance jedes Geb&auml;ude zu besch&auml;digen <span style="color:#0f0">+(50-60)%</span>';
	
}
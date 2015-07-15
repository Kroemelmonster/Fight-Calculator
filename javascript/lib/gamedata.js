// Allgemeine Daten
const ATTACKER_SQUAD_MAX = 3;
const DEFENDER_SQUAD_MAX = 4;
// 1. Bergbauserver 2. Kriegserver
const ATTACKER_EXP_WIN_FAKTOR 			= [5000,2000];
const ATTACKER_EXP_LOOSE_FAKTOR 		= [200000,200000];
const DEFENDER_EXP_WIN_FAKTOR 			= [20000,20000];
const DEFENDER_EXP_LOOSE_FAKTOR 		= [333333,333333];

const ATTACKER_MONST_EXP_WIN_FAKTOR 	= [2500,5000];
const ATTACKER_MONST_EXP_LOOSE_FAKTOR 	= [100000,50000];
const DEFENDER_MONST_EXP_WIN_FAKTOR		= [10000,50000];
const DEFENDER_MONST_EXP_LOOSE_FAKTOR	= [166666,833333];

const ATTACKER_GATE_EXP_WIN_FAKTOR 		= [1000000,2000000];
const ATTACKER_GATE_EXP_LOOSE_FAKTOR 	= [40000000,200000000];

const WARPOINTS_FAKTOR 					= 500000;

const TREASURYFAKTOR = [[100,90,80,70,60,50,40,30],[100,95,90,85,80,75,70,65]];
// Allgemeine Kampf Daten
const UNITDATA = [
	[{ Ranking: [78,25], Lohn: 0.1, Attack: [0,0], Hp: 8, Special : 50},{ Ranking: [96,25], Lohn: 0.1, Attack: [0,0], Hp: 12, Special : 50 },{ Ranking: [110,1], Lohn: 0.1, Attack: [0,0], Hp: 15, Special : 50 }],
	[{ Ranking: [185,50], Lohn: 0.2, Attack: [2,3], Hp: 10, Special : 100 },{ Ranking: [320,50], Lohn: 0.3, Attack: [4,6], Hp: 15, Special : 100 },{ Ranking: [493,5], Lohn: 0.4, Attack: [6,8], Hp: 25, Special : 100 }],
	[{ Ranking: [268,75], Lohn: 0.2, Attack: [3,4], Hp: 15, Special : 100 },{ Ranking: [453,75], Lohn: 0.4, Attack: [5,7], Hp: 25, Special : 100 },{ Ranking: [656,6], Lohn: 0.6, Attack: [8,10], Hp: 35, Special : 100 }],
	[{ Ranking: [370,100], Lohn: 0.3, Attack: [4,6], Hp: 20, Special : 100 },{ Ranking: [608,100], Lohn: 0.5, Attack: [8,10], Hp: 30, Special : 100 },{ Ranking: [776,7], Lohn: 0.7, Attack: [10,12], Hp: 40, Special : 100 }],
	[{ Ranking: [490,100], Lohn: 0.4, Attack: [25,35], Hp: 6, Special : 100 },{ Ranking: [740,100], Lohn: 0.7, Attack: [35,45], Hp: 10, Special : 100 },{ Ranking: [1013,10], Lohn: 0.9, Attack: [45,55], Hp: 15, Special : 100 }],
	[{ Ranking: [3560,80], Lohn: 3.0, Attack: [0,1], Hp: 10, Special : 1 },{ Ranking: [5180,50], Lohn: 4.6, Attack: [1,1], Hp: 15, Special : 2 },{ Ranking: [6910,70], Lohn: 6.1, Attack: [1,2], Hp: 20, Special : 3 }],
	[{ Ranking: [75,10], Lohn: 0.1, Attack: [3,5], Hp: 1, Special : 0 },{ Ranking: [90,10], Lohn: 0.1, Attack: [5,7], Hp: 1, Special : 0 },{ Ranking: [105,1], Lohn: 0.1, Attack: [7,9], Hp: 1, Special : 0 }],
	[{ Ranking: [2327,80], Lohn: 2.1, Attack: [3,3], Hp: 5, Special : 10 },{ Ranking: [3268,50], Lohn: 2.9, Attack: [4,4], Hp: 10, Special : 20 },{ Ranking: [4390,44], Lohn: 3.9, Attack: [5,5], Hp: 15, Special : 30 }]];
const RACEUNIT = [
	[100,100,100],
	[2,3,4],
	[[5,7],[8,10],[11,13]],
	[20,40,60],
	[100,160,200],
	[100,160,200]];
const TOWER_DAMAGE 			= [[600,700],[1100,1200],[2000,2500],[5000,7000],[10000,12000],[15000,18000],[20000,25000],[50000,60000]];
const BURG_TOWER_DAMAGE 	= [[3600,4200],[6600,7200],[12000,15000],[30000,35000],[60000,72000],[90000,108000],[120000,150000]];
const MTOWER_DAMAGE 		= [0.5,0.7,0.9,1.1,1.3,1.5,1.8,2.2];
const BURG_MTOWER_DAMAGE 	= [1.0,1.4,1.8,2.2,2.6,3.0,3.6];
const FORT_KILL 			= [30,60,90,120,150,180,210,300];
const BURG_FORT_KILL 		= [300,900,1200,1500,1800,2400,3000,5000];
const FORT_DEFENSE 			= [2,3,4,5,6,7,8,10];
const BURG_FORT_DEFENSE 	= [3,4,5,6,7,11,15,20];
const SPECIAL_TOWERBONUS 	= [0,50,75,100];
const SPECIAL_FORT_KILL_BONUS = [10,20,30];
const SPECIAL_FORT_DEFENSE_BONUS = [1,2,3];
const GATE_DEFENCE 			= [2000000,3000000,4000000,5000000,6000000,8000000,10000000];
const GATE_BLOCK 			= [100000,200000,300000,400000,500000,600000,800000];

// Image Hilfe
const HERO = {
	Player : [["BUILDER","DEFENDER","GURU","MINER","TRADER"],
			  ["BATTLE_MAGE","CLERIC","ILLUSIONIST","WHISPERER","DEFUSER"],
			  ["PALADIN","HIPPY","SABOTEUR","SCOUT","WARRIOR","BOMBERMAN"]]
}
const HEROICON_RACE = ["M","E","D","F","MONST","MONST"];
const HEROICON_GENDER = ["MALE","FEMALE"];

const ICON_SPECIAL = ["carrier","victim","victim","victim","victim","healer","","mage"];
const ICON_UNIT = ["carrier","warrior","rider","flyer","shooter","healer","merc","mage"];

const MONSTER_HERO =  [];
{
	// Aggro heroes
	MONSTER_HERO[0] = [{ Image : "JUGG", Arte : 35, Skillid : 3, Nameid : 0},
	                   { Image : "HEX", Arte : 19, Skillid : 4, Nameid : 1 },
	                   { Image : "MONST", Arte : 41, Skillid : 5, Nameid : 2 }];
	// Stonehedge heroes
	MONSTER_HERO[1] = [{ Image : "MONST", Arte : 36, Skillid : 6, Nameid : 3 },
	                   { Image : "JUGG", Arte : 19, Skillid : 7, Nameid : 0 }];
	// Burg heroes
	MONSTER_HERO[2] = [{ Image : "HEX", Arte : 19, Skillid : 8, Nameid : 1 },
	                   { Image : "MONST", Arte : 41, Skillid : 9, Nameid : 3}];
}


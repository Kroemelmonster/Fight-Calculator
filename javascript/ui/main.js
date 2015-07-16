var ForceAttacker;
var ForceDefender;

function main() {
	$('input').mouseenter(function() {
		$(this).focus();
	}).mouseleave(function() {
		$(this).blur();
	});
	
	ServerData = new ServerDataObject();
	
	if (PAGETYPE == "SQUAD") {
		ForceDefender = [new Squad($('#Page .squad'),1)];
		ForceAttacker = [];
	}
	else {
		ForceAttacker = [new Squad($('#Page .attacker .squad').eq(0),0),
		                 new Squad($('#Page .attacker .squad').eq(1),0),
		                 new Squad($('#Page .attacker .squad').eq(2),0)];
		ForceDefender = [new Squad($('#Page .defender .squad').eq(0),1),
		                 new Squad($('#Page .defender .squad').eq(1),1),
		                 new Squad($('#Page .defender .squad').eq(2),1),
		                 new Squad($('#Page .defender .squad').eq(3),1)];
		ForceAttacker[0].enablehide();
		ForceAttacker[1].enablehide();
		ForceAttacker[2].enablehide();
		ForceDefender[0].enablehide();
		ForceDefender[1].enablehide();
		ForceDefender[2].enablehide();
		ForceDefender[3].enablehide();
	}
	SystemMain();
	SaveBoxMain();
	HeroBoxMain();
	ArtefactBoxMain();
	MagicBoxMain();
	
	if (PAGETYPE == "SQUAD") {
		HeroBox.select(ForceDefender[0]);
		
		if (DATA) {
			ForceDefender[0].loadCode(DATA);
			HeroBox.heroIconRefresh();
			HeroBox.refreshEffects();
		}
		ForceDefender[0].reloadElement();
	}
	else {
		CalculationBoxMain();
		
		if (DATA) {
			ServerData.loadFight(DATA);
		}
		else {
			ForceDefender[0].reloadElement();
			ForceAttacker[0].reloadElement();
			ForceAttacker[1].hide();
			ForceAttacker[1].hide();
			ForceDefender[1].hide();
			ForceDefender[1].hide();
			ForceDefender[1].hide();
		}
		
	}
	EffectHandler.refresh();
}
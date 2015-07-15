function numberWithCommas(n) {
	if (n == null || isNaN(n))
		return "0";
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

function CalculationBoxObject() {
	
	this.Attacker;
	this.Defender;
	
	this.createResultRound = function(winner) {
		var html = '<div class="box">';
		if (winner == 1)
			html +='<div class="header">'+GENERAL.ATTACKER+RESULT_END+'</div>';
		else
			html +='<div class="header">'+GENERAL.DEFENDER+RESULT_END+'</div>';
		html += '<table><tbody>';
		
		// daten zusammenfassen
		var allfraction = 0;
		var allarmyA = 0;
		var allarmyD = 0;
		var allarmyLostD = 0;
		for(var i = 0;(i < ForceAttacker.length); i++) {
			allfraction += CalculationBox.Attacker[i].fraction;
			CalculationBox.Attacker[i].armylost = 0;
			CalculationBox.Attacker[i].armystart = 0;
			CalculationBox.Attacker[i].startamount = 0;
			for (var i2 = 0;(i2 < 8); i2++) {
				CalculationBox.Attacker[i].startamount += ForceAttacker[i].army[i2].amount;
				if (ForceAttacker[i].army[i2].amount >= CalculationBox.Attacker[i].army[i2].amount) {
					var cost = 0;
					if (i2 != 6)
						var cost = (ForceAttacker[i].army[i2].amount - CalculationBox.Attacker[i].army[i2].amount) * ForceAttacker[i].army[i2].getScore();
					else
						var cost = (ForceAttacker[i].army[i2].amount - CalculationBox.Attacker[i].army[i2].amount + CalculationBox.Attacker[i].necroamount) * ForceAttacker[i].army[i2].getScore();
					CalculationBox.Attacker[i].armylost += cost;
					cost = ForceAttacker[i].army[i2].amount * ForceAttacker[i].army[i2].getScore();
					CalculationBox.Attacker[i].armystart += cost;
					allarmyA += cost;
				}
			}
		}
		
		for(var i = 0;(i < ForceDefender.length); i++) {
			CalculationBox.Defender[i].armylost = 0;
			CalculationBox.Defender[i].armystart = 0;
			CalculationBox.Defender[i].startamount = 0;
			for (var i2 = 0;(i2 < 8); i2++) {
				CalculationBox.Defender[i].startamount += ForceDefender[i].army[i2].amount;
				if (ForceDefender[i].army[i2].amount >= CalculationBox.Defender[i].army[i2].amount) {
					var cost = 0;
					if (i2 != 6)
						var cost = (ForceDefender[i].army[i2].amount - CalculationBox.Defender[i].army[i2].amount) * ForceDefender[i].army[i2].getScore();
					else
						var cost = (ForceDefender[i].army[i2].amount - CalculationBox.Defender[i].army[i2].amount + CalculationBox.Defender[i].necroamount) * ForceDefender[i].army[i2].getScore();
									CalculationBox.Defender[i].armylost += cost;
					allarmyLostD += cost;
					cost = ForceDefender[i].army[i2].amount * ForceDefender[i].army[i2].getScore();
					CalculationBox.Defender[i].armystart += cost;
					allarmyD += cost;
				}
			}
		}
		
		// exp berechnen
		for(var i = 0;(i < ForceAttacker.length); i++) {
			var faktor;
			if (winner == 1)
				faktor = ATTACKER_EXP_WIN_FAKTOR[ServerData.type];
			else
				faktor = ATTACKER_EXP_LOOSE_FAKTOR[ServerData.type];
			
			CalculationBox.Attacker[i].exp = [0,0,0,0,0,0]
			
			for(var i2 = 0;(i2 < ForceDefender.length); i2++) {
				var rfaktor = faktor;
				if (ForceDefender[i2].race == 4) {
					if (winner == 1)
						rfaktor = ATTACKER_MONST_EXP_WIN_FAKTOR[ServerData.type];
					else
						rfaktor = ATTACKER_MONST_EXP_LOOSE_FAKTOR[ServerData.type];
				}
				else if (ForceDefender[i2].race == 5) {
					if (winner == 1)
						rfaktor = ATTACKER_GATE_EXP_WIN_FAKTOR[ServerData.type];
					else
						rfaktor = ATTACKER_GATE_EXP_LOOSE_FAKTOR[ServerData.type];
				}
				
				// get the base looses
				var lost = CalculationBox.Defender[i2].armylost * ( CalculationBox.Attacker[i].armystart / allarmyA);
				CalculationBox.Attacker[i].exp[ForceDefender[i2].race] += lost / rfaktor;
			}
		}
		
		for(var i = 0;(i < ForceDefender.length); i++) {
			var faktor;
			if (winner == 1)
				faktor = DEFENDER_EXP_WIN_FAKTOR[ServerData.type];
			else
				faktor = DEFENDER_EXP_LOOSE_FAKTOR[ServerData.type];
			
			CalculationBox.Defender[i].exp = [0,0,0,0,0,0]
			
			for(var i2 = 0;(i2 < ForceAttacker.length); i2++) {
				var rfaktor = faktor;
				if (ForceAttacker[i2].race == 4) {
					if (winner == 1)
						rfaktor = DEFENDER_MONST_EXP_WIN_FAKTOR[ServerData.type];
					else
						rfaktor = DEFENDER_MONST_EXP_LOOSE_FAKTOR[ServerData.type];
				}
				
				// get the base looses
				var lost = CalculationBox.Attacker[i2].armylost * ( CalculationBox.Defender[i].armystart / allarmyD);
				CalculationBox.Defender[i].exp[ForceAttacker[i2].race] = lost / rfaktor;
			}
			
		}
		
		for(var i = 0;(i < ForceAttacker.length); i++) {
			html += '<tr class="attacker">';
			for (var i2 = 0;(i2 < 8); i2++) {
				html += '<td>';
				if (i == 0) {
					html += '<div class="icon '+ICON_UNIT[i2]+'"></div>';
				}
				html += '<div>'+numberWithCommas(ForceAttacker[i].army[i2].amount)+'</div>';
				if (ForceAttacker[i].army[i2].amount >= CalculationBox.Attacker[i].army[i2].amount)
					html += '<div style="color:red">-'+numberWithCommas(ForceAttacker[i].army[i2].amount-CalculationBox.Attacker[i].army[i2].amount)+'</div>';
				else
					html += '<div style="color:blue">+'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount-ForceAttacker[i].army[i2].amount)+'</div>';
				html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
				html += '</td>';
			}
			html += '</tr>'
			html += '<tr>';
			
			html += '<th colspan="2" class="tabinfo">'+GENERAL.RANKING;
			html += '<div style="color:#f00">-'+numberWithCommas(CalculationBox.Attacker[i].armylost);
			html += '  <span style="color:#000">('+Math.round((CalculationBox.Attacker[i].lostamount / CalculationBox.Attacker[i].startamount)*-100)+'%)</span></div></th>';
			
			html += '<th colspan="2" class="tabinfo">'+GENERAL.EXP;
			var exp = 0;
			for(var i2 = 0;(i2 < ForceAttacker[i].effect.exp.length); i2++) {
				exp += CalculationBox.Attacker[i].exp[i2] * Math.max(0,(ForceAttacker[i].effect.exp[i2]/100));
			}
			html += '<div><u class="aexp" style="color:#0f0;cursor:pointer"> '+numberWithCommas(Math.round(exp))+'</u></div></th>';
			
			
			// fraction
			var frac = allarmyLostD * (CalculationBox.Attacker[i].fraction / allfraction);
			html += '<th colspan="2" class="tabinfo">'+GENERAL.FRACTION;
			frac = frac * ForceAttacker[i].fractionFactor(ForceDefender[0])*-1;
			if (frac >= 0)
				html += '<div style="color:green">+'+numberWithCommas(Math.round(frac))+'</div></th>';
			else
				html += '<div style="color:red">'+numberWithCommas(Math.round(frac))+'</div></th>';
			
			html += '<th colspan="2" class="tabinfo"><div class="warpointicon">';
			html += '<div style="color:#0f0"> +'+numberWithCommas(Math.round(Math.abs(frac / WARPOINTS_FAKTOR)))+'</div></div></th>';
			html += '</tr>';
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			html += '<tr class="defender">';
			for (var i2 = 0;(i2 < 8); i2++) {
				html += '<td>';
				html += '<div>'+numberWithCommas(ForceDefender[i].army[i2].amount)+'</div>';
				if (ForceDefender[i].army[i2].amount >= CalculationBox.Defender[i].army[i2].amount)
					html += '<div style="color:red">-'+numberWithCommas(ForceDefender[i].army[i2].amount-CalculationBox.Defender[i].army[i2].amount)+'</div>';
				else
					html += '<div style="color:blue">+'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount-ForceDefender[i].army[i2].amount)+'</div>';
				html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
				html += '</td>';
			}
			html += '</tr>'
			html += '<tr>';
			html += '<th colspan="4" class="tabinfo">'+GENERAL.RANKING;
			html += '<div style="color:#f00">-'+numberWithCommas(CalculationBox.Defender[i].armylost);
			html += '  <span style="color:#000">('+Math.round((CalculationBox.Defender[i].lostamount / CalculationBox.Defender[i].startamount)*-100)+'%)</span></div></th>';
			
			html += '<th colspan="4" class="tabinfo">'+GENERAL.EXP;
			var exp = 0;
			for(var i2 = 0;(i2 < ForceDefender[i].effect.exp.length); i2++) {
				exp += CalculationBox.Defender[i].exp[i2] * Math.max(0,(ForceDefender[i].effect.exp[i2]/100));
			}
			html += '<div><u class="aexp" style="color:#0f0;cursor:pointer"> '+numberWithCommas(Math.round(exp))+'</u></div></th>';
			
			html += '</tr>'
		}
		html +='</div>';
		$('#Calculation').prepend(html);
	}
	
	this.createTerrorRound = function() {
		// get the highets terror
		var maxA = 0;
		var maxD = 0;
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (ForceAttacker[i].effect.terror > maxA) {
				maxA = ForceAttacker[i].effect.terror;
			}
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (ForceDefender[i].effect.terror > maxD) {
				maxD = ForceDefender[i].effect.terror;
			}
		}
		// only show terror round if there is one
		if (maxA == 0 && maxD == 0)
			return
		var html = '<div class="box">';
		// generate the String that shows how much everyone gets terrored
		var string = "";
		if (maxA > 0) {
			for(var i = 0;(i < ForceAttacker.length); i++) {
				if (ForceAttacker[i].effect.fearless >= 1) {
					string += '<span style="color:#B11E1E">0%</span>- ';
				}
				else {
					string += '<span style="color:#B11E1E">'+maxA+'%</span>'+" - "
				}
			}
			string = string.substring(0, string.length - 3);
		}
		// only when maxA and maxD show the " | " in between
		if (maxA > 0 && maxD > 0) {
			string += " | ";
		}
		if (maxD > 0) {
			for(var i = 0;(i < ForceDefender.length); i++) {
				if (ForceDefender[i].effect.fearless >= 1) {
					string += '<span style="color:#158D37">0%</span>- ';
				}
				else {
					string += '<span style="color:#158D37">'+maxD+'%</span>'+" - "
				}
			}
			string = string.substring(0, string.length - 3);
		}
		html +='<div class="header">'+GENERAL.ROUNDTERROR+' '+string+'</div>';
		html += '<table><tbody>';
		// now caluclate it and save the reduced amount on extra so its easier for the terrorEnd round
		if (maxA > 0) {
			for(var i = 0;(i < ForceAttacker.length); i++) {
				html += '<tr class="attacker">';
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					// Fearless or no amount equals in no reduction
					if (ForceAttacker[i].effect.fearless >= 1 || ForceAttacker[i].army[i2].amount == 0) {
						html += '<div style="color:red">-0</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
						CalculationBox.Attacker[i].army[i2].terrorAmount = 0;
					}
					else {
						CalculationBox.Attacker[i].army[i2].terrorAmount = Math.round(CalculationBox.Attacker[i].army[i2].amount * (maxA/100));
						CalculationBox.Attacker[i].army[i2].amount -= CalculationBox.Attacker[i].army[i2].terrorAmount;
						ForceAttacker[i].army[i2].amount -= CalculationBox.Attacker[i].army[i2].terrorAmount;
						html += '<div style="color:red">-'+numberWithCommas(CalculationBox.Attacker[i].army[i2].terrorAmount)+'</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					}
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>';
			}
		}
		if (maxD > 0) {
			for(var i = 0;(i < ForceDefender.length); i++) {
				html += '<tr class="defender">';
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					if (ForceDefender[i].effect.fearless >= 1 || ForceDefender[i].army[i2].amount == 0) {
						html += '<div style="color:red">-0</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
						CalculationBox.Defender[i].army[i2].terrorAmount = 0;
					}
					else {
						CalculationBox.Defender[i].army[i2].terrorAmount = Math.round(CalculationBox.Defender[i].army[i2].amount * (maxD/100));
						CalculationBox.Defender[i].army[i2].amount -= CalculationBox.Defender[i].army[i2].terrorAmount;
						ForceDefender[i].army[i2].amount -= CalculationBox.Defender[i].army[i2].terrorAmount;
						html += '<div style="color:red">-'+numberWithCommas(CalculationBox.Defender[i].army[i2].terrorAmount)+'</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					}
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>'
			}
		}
		html +='</div>';
		$('#Calculation').append(html);
	}
	
	this.createKillRound = function() {
		// count the kills together
		// forts count
		var killA = 0;
		if (ForceDefender[0].race != 5) {
			for(var i = 0;(i < 8); i++) {
				killA += (FORT_KILL[i] + (ServerData.special * 10)) * ServerData.defence.fort[i];
			}
		}
		else {
			for(var i = 0;(i < 7); i++) {
				killA += (BURG_FORT_KILL[i]) * ServerData.defence.fort[i];
			}
		}
		killA = killA * Math.max(0,ForceDefender[0].effect.fort/100);
		killA += ForceAttacker[0].effect.fortdeath;
		var killD = ForceDefender[0].effect.fortdeath;
		if (killA == 0 && killD == 0)
			return;
		var html = '<div class="box">';
		// generate the String that shows how much everyone gets killed
		var string = "";
		if (killA > 0) {
			string += '<span style="color:#B11E1E">'+killA+'</span>';
		}
		// only when maxA and maxD show the " | " in between
		if (killA > 0 && killD > 0) {
			string += " | ";
		}
		if (killD > 0) {
			string += '<span style="color:#158D37">'+killD+'</span>';
		}
		
		
		// now murder them !
		html +='<div class="header">'+GENERAL.ROUNDDEATH+' '+string+'</div>';
		html += '<table><tbody>';
		if (killA > 0) {
			// first add all amounts togeteher so we can see what should die
			var amount = 0;
			for(var i = 0;(i < ForceAttacker.length); i++) {
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					if (i2 != 6) // no mercs allowed
						amount += CalculationBox.Attacker[i].army[i2].amount;
				}
			}
			// now kill based on the amount
			for(var i = 0;(i < ForceAttacker.length); i++) {
				html += '<tr class="attacker">';
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					// no amount or mercs will not get changed
					if (ForceAttacker[i].army[i2].amount == 0 || i2 == 6) {
						html += '<div style="color:red">-0</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					}
					else {
						var kill = Math.min(Math.round(CalculationBox.Attacker[i].army[i2].amount / amount * killA),CalculationBox.Attacker[i].army[i2].amount);
						CalculationBox.Attacker[i].army[i2].amount -= kill;
						html += '<div style="color:red">-'+numberWithCommas(kill)+'</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					}
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>';
			}
		}
		if (killD > 0) {
			// first add all amounts togeteher so we can see what should die
			var amount = 0;
			for(var i = 0;(i < ForceDefender.length); i++) {
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					if (i2 != 6) // no mercs allowed
						amount += CalculationBox.Defender[i].army[i2].amount;
				}
			}
			// now kill based on the amount
			for(var i = 0;(i < ForceDefender.length); i++) {
				html += '<tr class="defender">';
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					// no amount or mercs will not get changed
					if (ForceDefender[i].army[i2].amount == 0 || i2 == 6) {
						html += '<div style="color:red">-0</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					}
					else {
						var kill = Math.min(Math.round(CalculationBox.Defender[i].army[i2].amount / amount * killD),CalculationBox.Defender[i].army[i2].amount);
						CalculationBox.Defender[i].army[i2].amount -= kill;
						html += '<div style="color:red">-'+numberWithCommas(kill)+'</div>';
						html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					}
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>';
			}
		}
		html +='</div>';
		$('#Calculation').append(html);
	}
	
	this.checkWinner = function() {
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (CalculationBox.Attacker[i].fights) {
				var amount = [0,0];
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					amount[0] += CalculationBox.Attacker[i].army[i2].amount;
					amount[1] += ForceAttacker[i].army[i2].amount;
				}
				if ((amount[0] == 0) || (amount[0] / amount[1] <= (Math.round((100-ForceAttacker[i].retreat)*100)/10000))){
					CalculationBox.Attacker[i].fights = false;
				}
			}
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (CalculationBox.Defender[i].fights) {
				var amount = [0,0];
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					amount[0] += CalculationBox.Defender[i].army[i2].amount;
					amount[1] += ForceDefender[i].army[i2].amount;
				}
				if ((amount[0] == 0) || (amount[0] / amount[1] <= (Math.round((100-ForceDefender[i].retreat)*100)/10000))){
					CalculationBox.Defender[i].fights = false;
				}
			}
		}
		var lost = [true,true];
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (CalculationBox.Attacker[i].fights)
				lost[0] = false;
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (CalculationBox.Defender[i].fights)
				lost[1] = false;
		}
		return lost;
	}
	
	this.createNormalRound = function(round) {
		var fracdamage = [0,0,0];
		var damage = [0,0];
		var vdamage = [[0,0,0,0],[0,0,0,0]];
		var amount = [0,0];
		var vamount = [[0,0,0,0],[0,0,0,0]];
		var block = 0;
		var magicdefence = [0,0];
		
		// Addition of all the damage
		for(var i = 0;(i < ForceAttacker.length); i++) {
			var rounddmg = 0;

			if (CalculationBox.Attacker[i].fights) {
				// save the mageprotect
				if (ForceAttacker[i].army[7].effect.mage > 0)
					magicdefence[0] += ForceAttacker[i].army[7].effect.mage * CalculationBox.Attacker[i].army[7].amount;
				// get the tower protect
				block += ForceAttacker[i].army[7].getSpecial() * CalculationBox.Attacker[i].army[7].amount * Math.max(0,(ForceAttacker[i].army[7].effect.special / 100));
				// now get the damage
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					var dmg = ForceAttacker[i].army[i2].getAttack(ForceAttacker[i].chance) * CalculationBox.Attacker[i].army[i2].amount;
					dmg = dmg * (Math.max(ForceAttacker[i].army[i2].effect.attack + (ForceAttacker[i].army[i2].effect.roundattack * round),10)/100);
					rounddmg += dmg;
					amount[0] += CalculationBox.Attacker[i].army[i2].amount;
					// start abspeichern
					CalculationBox.Attacker[i].army[i2].startamount = CalculationBox.Attacker[i].army[i2].amount;
					
					// verfolgerschaden aufschreiben
					if ((i2 >= 1) && (i2 <= 4)){
						var tempdmg = Math.max(dmg * (Math.max(ForceAttacker[i].army[i2].effect.special,10)/100),0);
						CalculationBox.Attacker[i].fraction += tempdmg;
						if (i2 >= 2){
							vdamage[1][i2-2] += tempdmg;
						}
						else{
							vdamage[1][3] += tempdmg;
						}
						vamount[0][i2-1] += CalculationBox.Attacker[i].army[i2].amount;
					}
				}
				// nun Armeeschaden % dazu und Runden schaden + abspeichern ob ein cata dabei ist
				damage[1] += rounddmg * (ForceAttacker[i].effect.armydamage/100);
				
				CalculationBox.Attacker[i].fraction += rounddmg * (ForceAttacker[i].effect.armydamage/100);
			}
		}
		// Same for defender
		for(var i = 0;(i < ForceDefender.length); i++) {
			var rounddmg = 0;
			if (CalculationBox.Defender[i].fights) {
				// save the mageprotect
				if (ForceDefender[i].army[7].effect.mage > 0)
					magicdefence[1] += ForceDefender[i].army[7].effect.mage * CalculationBox.Defender[i].army[7].amount;
				// now get the damage
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					var dmg = ForceDefender[i].army[i2].getAttack(ForceDefender[i].chance) * CalculationBox.Defender[i].army[i2].amount;
					dmg = dmg * (Math.max(ForceDefender[i].army[i2].effect.attack + (ForceDefender[i].army[i2].effect.roundattack * round),10)/100);
					rounddmg += dmg;
					amount[1] += CalculationBox.Defender[i].army[i2].amount;
					// start abspeichern
					CalculationBox.Defender[i].army[i2].startamount = CalculationBox.Defender[i].army[i2].amount;
					
					// verfolgerschaden aufschreiben
					if ((i2 >= 1) && (i2 <= 4)){
						var tempdmg = dmg * (Math.max(ForceDefender[i].army[i2].effect.special,10)/100);
						if (i2 >= 2){
							vdamage[0][i2-2] += tempdmg;
						}
						else{
							vdamage[0][3] += tempdmg;
						}
						vamount[1][i2-1] += CalculationBox.Defender[i].army[i2].amount;
					}
				}
				
				damage[0] += rounddmg * (ForceDefender[i].effect.armydamage/100);
				
			}
		}
		
		damage[0] += ForceAttacker[0].effect.damage;
		damage[1] += ForceDefender[0].effect.damage;
		
		
		
		// Catapult
		var towerdamage = [];
		towerdamage[0] = ServerData.getRawTowerDamageWithLevel(0,CalculationBox.tower[0],false,CalculationBox.Defender[0].army);
		towerdamage[1] = ServerData.getRawTowerDamageWithLevel(1,CalculationBox.tower[1],false,CalculationBox.Defender[0].army);
		
		// Catapult
		if (ForceDefender[0].effect.catapult > 0) {
			if (towerdamage[0] > towerdamage[1]){
				CalculationBox.tower[0] = Math.max(0,CalculationBox.tower[0]-1);
				towerdamage[0] = ServerData.getRawTowerDamageWithLevel(0,CalculationBox.tower[0],false,CalculationBox.Defender[0].army);
			}
			else{
				CalculationBox.tower[1] = Math.max(0,CalculationBox.tower[1]-1);
				towerdamage[1] = ServerData.getRawTowerDamageWithLevel(1,CalculationBox.tower[1],false,CalculationBox.Defender[0].army);
			}
		}
		// now add Tower damage
		damage[0] += Math.max(0,towerdamage[0] + towerdamage[1] - block);
		// reduce mage normal block now
		damage[0] = Math.max(0,damage[0]-magicdefence[0]);
		damage[1] = Math.max(0,damage[1]-magicdefence[1]);
		// deal normal damage
		
		var overdmg = [0,0];
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (CalculationBox.Attacker[i].fights) {
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					if (CalculationBox.Attacker[i].army[i2].startamount > 0) {
						var dmg = Math.round(damage[0] * (CalculationBox.Attacker[i].army[i2].startamount / amount[0]) * 10000) / 10000;
						// schaden h�her als effektive hp der einheit ?
						if (dmg > CalculationBox.Attacker[i].army[i2].chp){
							overdmg[0] += dmg - CalculationBox.Attacker[i].army[i2].chp;
							CalculationBox.Attacker[i].army[i2].chp = 0;
							CalculationBox.Attacker[i].army[i2].amount = 0;
						}
						else{
							CalculationBox.Attacker[i].army[i2].chp -= dmg;
							var kills = parseInt(CalculationBox.Attacker[i].army[i2].chp / CalculationBox.Attacker[i].army[i2].hp) + 1;
							CalculationBox.Attacker[i].army[i2].amount = kills;
							// clear kill of one
							if ((CalculationBox.Attacker[i].army[i2].amount -1) * CalculationBox.Attacker[i].army[i2].hp == CalculationBox.Attacker[i].army[i2].chp){
								CalculationBox.Attacker[i].army[i2].amount --;
							}
						}
					}
				}
			}
		}
	
		
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (CalculationBox.Defender[i].fights) {
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					if (CalculationBox.Defender[i].army[i2].startamount > 0) {
						var dmg = Math.round(damage[1] * (CalculationBox.Defender[i].army[i2].startamount / amount[1]) * 10000) / 10000;
						// schaden h�her als effektive hp der einheit ?
						if (dmg > CalculationBox.Defender[i].army[i2].chp){
							overdmg[1] += dmg - CalculationBox.Defender[i].army[i2].chp;
							CalculationBox.Defender[i].army[i2].chp = 0;
							CalculationBox.Defender[i].army[i2].amount = 0;
						}
						else{
							CalculationBox.Defender[i].army[i2].chp -= dmg;
							var kills = parseInt(CalculationBox.Defender[i].army[i2].chp / CalculationBox.Defender[i].army[i2].hp) + 1;
							CalculationBox.Defender[i].army[i2].amount = kills;
							// clear kill of one
							if ((CalculationBox.Defender[i].army[i2].amount -1) * CalculationBox.Defender[i].army[i2].hp == CalculationBox.Defender[i].army[i2].chp){
								CalculationBox.Defender[i].army[i2].amount --;
							}
						}
					}
				}
			}
		}
		
		
		// deal the overdamage
		var bool = true;
		while((overdmg[0] > 0) && (bool)){
			overdmg[0] = parseInt(overdmg[0]+0.5);
			var dealdmg = overdmg[0];
			// calc the new amount
			amount[0] = 0;
			for(var i = 0;(i < ForceAttacker.length); i++) {
				if (CalculationBox.Attacker[i].fights) {
					for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++)
						amount[0] += CalculationBox.Attacker[i].army[i2].amount;
				}
			}
			bool = false;
			for(var i = 0;(i < ForceAttacker.length); i++) {
				if (CalculationBox.Attacker[i].fights) {
					for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++){
						if (CalculationBox.Attacker[i].army[i2].amount > 0){
							var dmg = Math.round(dealdmg * (CalculationBox.Attacker[i].army[i2].amount / amount[0]) * 10000) / 10000;
							if (dmg > CalculationBox.Attacker[i].army[i2].chp){
								overdmg[0] -= CalculationBox.Attacker[i].army[i2].chp;
								CalculationBox.Attacker[i].army[i2].chp = 0;
								CalculationBox.Attacker[i].army[i2].amount = 0;
							}
							else{
								overdmg[0] -= dmg;
								CalculationBox.Attacker[i].army[i2].chp -= dmg;
								var kills = parseInt(CalculationBox.Attacker[i].army[i2].chp / CalculationBox.Attacker[i].army[i2].hp) + 1;
								CalculationBox.Attacker[i].army.amount = kills;
								if ((CalculationBox.Attacker[i].army[i2].amount -1) * CalculationBox.Attacker[i].army[i2].hp == CalculationBox.Attacker[i].army[i2].chp){
									CalculationBox.Attacker[i].army[i2].amount --;
								}
							}
							if (CalculationBox.Attacker[i].army[i2].amount > 0){
								bool = true;
							}
						}
					}
				}
			}
		}
		var bool = true;
		while((overdmg[1] > 0) && (bool)){
			overdmg[1] = parseInt(overdmg[1]+0.5);
			var dealdmg = overdmg[1];
			// calc the new amount
			amount[1] = 0;
			for(var i = 0;(i < ForceDefender.length); i++) {
				if (CalculationBox.Defender[i].fights) {
					for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++)
						amount[1] += CalculationBox.Defender[i].army[i2].amount;
				}
			}
			bool = false;
			for(var i = 0;(i < ForceDefender.length); i++) {
				if (CalculationBox.Defender[i].fights) {
					for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++){
						if (CalculationBox.Defender[i].army[i2].amount > 0){
							var dmg = Math.round(dealdmg * (CalculationBox.Defender[i].army[i2].amount / amount[1]) * 10000) / 10000;
							if (dmg > CalculationBox.Defender[i].army[i2].chp){
								overdmg[1] -= CalculationBox.Defender[i].army[i2].chp;
								CalculationBox.Defender[i].army[i2].chp = 0;
								CalculationBox.Defender[i].army[i2].amount = 0;
							}
							else{
								overdmg[1] -= dmg;
								CalculationBox.Defender[i].army[i2].chp -= dmg;
								var kills = parseInt(CalculationBox.Defender[i].army[i2].chp / CalculationBox.Defender[i].army[i2].hp) + 1;
								CalculationBox.Defender[i].army.amount = kills;
								if ((CalculationBox.Defender[i].army[i2].amount -1) * CalculationBox.Defender[i].army[i2].hp == CalculationBox.Defender[i].army[i2].chp){
									CalculationBox.Defender[i].army[i2].amount --;
								}
							}
							if (CalculationBox.Defender[i].army[i2].amount > 0){
								bool = true;
							}
						}
					}
				}
			}
		}
		
		// nun vschaden ausgeben
		var overvdamage = [[0,0,0,0],[0,0,0,0]];
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (CalculationBox.Attacker[i].fights) {
				for (var i2 = 1;(i2 <= 4); i2++) {
					if (CalculationBox.Attacker[i].army[i2].startamount > 0){
						var dmg = Math.round(vdamage[0][i2-1] * (CalculationBox.Attacker[i].army[i2].startamount / vamount[0][i2-1]) * 10000) / 10000;
						if (dmg > CalculationBox.Attacker[i].army[i2].chp){
							overvdamage[0][i2-1] += dmg - CalculationBox.Attacker[i].army[i2].chp;
							CalculationBox.Attacker[i].army[i2].chp = 0;
							CalculationBox.Attacker[i].army[i2].amount = 0;
						}
						else{
							CalculationBox.Attacker[i].army[i2].chp -= dmg;
							CalculationBox.Attacker[i].army[i2].amount = parseInt(CalculationBox.Attacker[i].army[i2].chp / CalculationBox.Attacker[i].army[i2].hp) + 1;
							if ((CalculationBox.Attacker[i].army[i2].amount -1) * CalculationBox.Attacker[i].army[i2].hp == CalculationBox.Attacker[i].army[i2].chp)
								CalculationBox.Attacker[i].army[i2].amount --;
						}
					}
				}
			}
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (CalculationBox.Defender[i].fights) {
				for (var i2 = 1;(i2 <= 4); i2++) {
					if (CalculationBox.Defender[i].army[i2].startamount > 0){
						var dmg = Math.round(vdamage[1][i2-1] * (CalculationBox.Defender[i].army[i2].startamount / vamount[1][i2-1]) * 10000) / 10000;
						if (dmg > CalculationBox.Defender[i].army[i2].chp){
							overvdamage[1][i2-1] += dmg - CalculationBox.Defender[i].army[i2].chp;
							CalculationBox.Defender[i].army[i2].chp = 0;
							CalculationBox.Defender[i].army[i2].amount = 0;
						}
						else{
							CalculationBox.Defender[i].army[i2].chp -= dmg;
							CalculationBox.Defender[i].army[i2].amount = parseInt(CalculationBox.Defender[i].army[i2].chp / CalculationBox.Defender[i].army[i2].hp) + 1;
							if ((CalculationBox.Defender[i].army[i2].amount -1) * CalculationBox.Defender[i].army[i2].hp == CalculationBox.Defender[i].army[i2].chp)
								CalculationBox.Defender[i].army[i2].amount --;
						}
					}
				}
			}
		}
		// v overdmg ausgeben
		bool = true;
		var count = overvdamage[0][0] + overvdamage[0][1] +overvdamage[0][2] +overvdamage[0][3];
		var cc = 4;
		while((count > 0) && (bool) && (cc > 0)){
			cc --;
			overvdamage[0][0]  = parseInt(overvdamage[0][0] +0.5);
			overvdamage[0][1]  = parseInt(overvdamage[0][1] +0.5);
			overvdamage[0][2]  = parseInt(overvdamage[0][2] +0.5);
			overvdamage[0][3]  = parseInt(overvdamage[0][3] +0.5);
			var dealdmg = overvdamage[0].slice();
			vamount[0] = [0,0,0,0];
			for(var i = 0;(i < ForceAttacker.length); i++) {
				if (CalculationBox.Attacker[i].fights) {
					for (var i2 = 1;(i2 <= 4); i2++)
						vamount[0][i2-1] += CalculationBox.Attacker[i].army[i2].amount;
				}
			}
			bool = false;
			for(var i = 0;(i < ForceAttacker.length); i++) {
				if (CalculationBox.Attacker[i].fights) {
					for (var i2 = 1;(i2 <= 4); i2++) {
						if (CalculationBox.Attacker[i].army[i2].amount > 0){
							var dmg = Math.round(dealdmg[i2-1] * (CalculationBox.Attacker[i].army[i2].amount / vamount[0][i2-1]) * 10000) / 10000;
							if (dmg > CalculationBox.Attacker[i].army[i2].chp){
								overvdamage[0][i2-1] -= CalculationBox.Attacker[i].army[i2].chp;
								CalculationBox.Attacker[i].army[i2].chp = 0;
								CalculationBox.Attacker[i].army[i2].amount = 0;
							}
							else{
								overvdamage[0][i2-1] -= dmg;
								CalculationBox.Attacker[i].army[i2].chp -= dmg;
								var kills = parseInt(CalculationBox.Attacker[i].army[i2].chp / CalculationBox.Attacker[i].army[i2].hp) + 1;
								CalculationBox.Attacker[i].army[i2].amount = kills;
								if ((CalculationBox.Attacker[i].army[i2].amount -1)* CalculationBox.Attacker[i].army[i2].hp == CalculationBox.Attacker[i].army[i2].chp){
									CalculationBox.Attacker[i].army[i2].amount --;
								}
							}
							if (CalculationBox.Attacker[i].army[i2].amount > 0){
								bool = true;
							}
						}
					}
				}
			}
			count = overvdamage[0][0] + overvdamage[0][1] +overvdamage[0][2] +overvdamage[0][3];
		}
		bool = true;
		var count = overvdamage[1][0] + overvdamage[1][1] +overvdamage[1][2] +overvdamage[1][3];
		var cc = 4;
		while((count > 0) && (bool) && (cc > 0)){
			cc --;
			overvdamage[1][0]  = parseInt(overvdamage[1][0] +0.5);
			overvdamage[1][1]  = parseInt(overvdamage[1][1] +0.5);
			overvdamage[1][2]  = parseInt(overvdamage[1][2] +0.5);
			overvdamage[1][3]  = parseInt(overvdamage[1][3] +0.5);
			var dealdmg = overvdamage[1].slice();
			vamount[1] = [0,0,0,0];
			for(var i = 0;(i < ForceDefender.length); i++) {
				if (CalculationBox.Defender[i].fights) {
					for (var i2 = 1;(i2 <= 4); i2++)
						vamount[1][i2-1] += CalculationBox.Defender[i].army[i2].amount;
				}
			}
			bool = false;
			for(var i = 0;(i < ForceDefender.length); i++) {
				if (CalculationBox.Defender[i].fights) {
					for (var i2 = 1;(i2 <= 4); i2++) {
						if (CalculationBox.Defender[i].army[i2].amount > 0){
							var dmg = Math.round(dealdmg[i2-1] * (CalculationBox.Defender[i].army[i2].amount / vamount[1][i2-1]) * 10000) / 10000;
							if (dmg > CalculationBox.Defender[i].army[i2].chp){
								overvdamage[1][i2-1] -= CalculationBox.Defender[i].army[i2].chp;
								CalculationBox.Defender[i].army[i2].chp = 0;
								CalculationBox.Defender[i].army[i2].amount = 0;
							}
							else{
								overvdamage[1][i2-1] -= dmg;
								CalculationBox.Defender[i].army[i2].chp -= dmg;
								var kills = parseInt(CalculationBox.Defender[i].army[i2].chp / CalculationBox.Defender[i].army[i2].hp) + 1;
								CalculationBox.Defender[i].army[i2].amount = kills;
								if ((CalculationBox.Defender[i].army[i2].amount -1)* CalculationBox.Defender[i].army[i2].hp == CalculationBox.Defender[i].army[i2].chp){
									CalculationBox.Defender[i].army[i2].amount --;
								}
							}
							if (CalculationBox.Defender[i].army[i2].amount > 0){
								bool = true;
							}
						}
					}
				}
			}
			count = overvdamage[1][0] + overvdamage[1][1] +overvdamage[1][2] +overvdamage[1][3];
		}
		
		// now show it :O
		var html = '<div class="box">';
		html +='<div class="header">'+GENERAL.ROUND+' '+(round+1)+'</div>';
		html += '<table><tbody>';
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (CalculationBox.Attacker[i].fights) {
				html += '<tr class="attacker">';
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].startamount)+'</div>';
					html += '<div style="color:red">-'+numberWithCommas(CalculationBox.Attacker[i].army[i2].startamount-CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>';
			}
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (CalculationBox.Defender[i].fights) {
				html += '<tr class="defender">';
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].startamount)+'</div>';
					html += '<div style="color:red">-'+numberWithCommas(CalculationBox.Defender[i].army[i2].startamount-CalculationBox.Defender[i].army[i2].amount)+'</div>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>';
			}
		}
		html +='</div>';
		$('#Calculation').append(html);
		
	}
	
	this.calculateHealSquad = function(squad, startarmy, amount) {
		/* Thorie
		durch alle durchgehen die Heilung brauchen, von denen den mit den kleinsten zu brauchenden heal aussuchen
		Der Anteil wird zu den Maximum von diesen Wert und der heal durch die �brig gebliebenen geteilt
		Der Anteil wird runtergerundet aber minimal 1
		In Jeder Runde bekommt nun jeder der heal brauchte diesen Anteil hinzugerechnet.
		Dabei wird immer der ingesammte heal von diesen Anteil abgezogen.
		Sollte der insgesammte heal w�rhend des prozesses ( dann wen der anteil 1 ist ) zu 0 schrumpfen so wird nicht mehr geheilt.
		Alles geht so lange bis der gesammte heal 0 erreicht oder jegliche Einheit geheilt worden ist */
		if ( amount > 0){
			var nochzumachen = [0,1,2,3,4,5,6,7];
			var minneededheal = Number.MAX_VALUE;
			for(var i = 0;  i < nochzumachen.length ; i++){
				if (startarmy[nochzumachen[i]].amount == squad.army[nochzumachen[i]].amount){
					nochzumachen.splice(i, 1);
					i--;
				}
				else
					minneededheal = Math.min(minneededheal,(startarmy[nochzumachen[i]].amount - squad.army[nochzumachen[i]].amount));
			}
			do{
				var mincanheal = Math.max(parseInt(amount / nochzumachen.length),1);
				var roundheal = Math.min(mincanheal,minneededheal);
				for(var i = 0;  i < nochzumachen.length ; i++){
					if (amount > 0){
						amount -= roundheal;
						squad.maximumheal -= roundheal;
						squad.army[nochzumachen[i]].amount += roundheal;
					}
				}
				minneededheal = Number.MAX_VALUE;
				for(var i = 0;  i < nochzumachen.length ; i++){
					if (startarmy[nochzumachen[i]].amount == squad.army[nochzumachen[i]].amount){
						nochzumachen.splice(i, 1);
						i--;
					}
					else
						minneededheal = Math.min(minneededheal,(startarmy[nochzumachen[i]].amount - squad.army[nochzumachen[i]].amount));
				}
			} while ((amount > 0) && (nochzumachen.length > 0))
		}
		return amount;
	}
	
	this.createHealRound = function() {
		/* Theorie
		Zusammenrechnen von verwundete toeten da hier eindeutig anders geheilt werden muss
		Wenn Verwundete toeten nicht vorhanden ist 
			Heile jeden Squad f�r sich selber addiere den �berschuss
			Sofern �bershcuss vorhanden wirf diesen Armee aus der Benoetigungsliste heraus.
			Nun solange durch alle aus der Benoetigungsliste gehen bis diese leer ist oder kein Ueberschuss mehr vorhanden
				Gib den Benoetigenden immer so viel  wie Uebershcuss / Anzahl der Benoetigend heruntergerundet
				Aber minimal 1
				wenn nun noch genug �bershcuss vorhanden ist 
					Heile den Bnoetigenden um diese Anazahl
					Ziehe nun vom Ueberschuss den geheilten anteil ab und entferne den Benoetigenden aus der Liste sofern ein Uebershcuss enstanden ist.
		*/
		var Ueberschuss = 0;
		var VerwundeteToetenProzent = ForceAttacker[0].effect.death; 
		var nochzumachen = [];
		var healpowerstr = '';
		// Daten speichern
		for(var i = 0;(i < ForceAttacker.length); i++) {
			CalculationBox.Attacker[i].needhealamount = 0;
			for(var i2 = 0; i2 < ForceAttacker[i].army.length; i2++){
				CalculationBox.Attacker[i].army[i2].startamount = CalculationBox.Attacker[i].army[i2].amount;
				CalculationBox.Attacker[i].needhealamount += ForceAttacker[i].army[i2].amount - CalculationBox.Attacker[i].army[i2].amount;
			}
		}
		if (VerwundeteToetenProzent == 0){
			for(var i = 0;(i < ForceAttacker.length); i++) {
				var heal = Math.max(0,parseInt(ForceAttacker[i].army[5].getSpecial() * CalculationBox.Attacker[i].army[5].amount * (ForceAttacker[i].army[5].effect.special / 100) + 0.5));
				var temp = CalculationBox.calculateHealSquad(CalculationBox.Attacker[i],ForceAttacker[i].army,heal);
				Ueberschuss += temp;
				var healpower = heal - CalculationBox.Attacker[i].needhealamount;
				// string handeling
				if (healpower >= 0)
					healpowerstr += '<span style="color:green">+'+healpower+'</span> , ';
				else
					healpowerstr += '<span style="color:red">'+healpower+'</span> , ';
				
				
				if (temp == 0)
					nochzumachen.push(i);
			}
			// string
			healpowerstr = healpowerstr.substring(0,healpowerstr.length-2) +" - ";
			
			while ((Ueberschuss > 0) && (nochzumachen.length > 0)){
				var heal = Math.max(parseInt(Ueberschuss / nochzumachen.length),1);
				for(var i = 0;  i < nochzumachen.length ; i++){
					if (Ueberschuss > 0){
						var temp = CalculationBox.calculateHealSquad(CalculationBox.Attacker[nochzumachen[i]],ForceAttacker[nochzumachen[i]].army,heal);
						Ueberschuss -= (heal - temp);
						if (temp > 0){
							nochzumachen.splice(i,1);
							i--;
						}
					}
				}
			}
		}
		else{
			for(var i = 0;(i < ForceAttacker.length); i++) {
				var heal = Math.max(0,parseInt(ForceAttacker[i].army[5].getSpecial() * CalculationBox.Attacker[i].army[5].amount * (ForceAttacker[i].army[5].effect.special / 100) + 0.5));
				CalculationBox.Attacker[i].maximumheal = Math.max(0,parseInt(CalculationBox.Attacker[i].needhealamount * (100-VerwundeteToetenProzent)/100 +0.5));
				var max = CalculationBox.Attacker[i].maximumheal;
				CalculationBox.calculateHealSquad(CalculationBox.Attacker[i],ForceAttacker[i].army,Math.min(heal,CalculationBox.Attacker[i].maximumheal));
				if ((heal - CalculationBox.Attacker[i].maximumheal) > 0){
					healpowerstr += '<span style="color:green">+'+(heal-CalculationBox.Attacker[i].maximumheal)+'</span> , ';
					Ueberschuss += (heal-CalculationBox.Attacker[i].maximumheal);
				}
				else{
					healpowerstr += '<span style="color:red">'+(heal-CalculationBox.Attacker[i].maximumheal)+'</span> , ';
					nochzumachen.push(i);
				}
			}
			healpowerstr = healpowerstr.substring(0,healpowerstr.length-2) +" - ";
			while ((Ueberschuss > 0) && (nochzumachen.length > 0)){
				var heal = Math.max(parseInt(Ueberschuss / nochzumachen.length),1);
				for(var i = 0;  i < nochzumachen.length ; i++){
					if (Ueberschuss > 0){
						var max = CalculationBox.Attacker[nochzumachen[i]].maximumheal;
						CalculationBox.calculateHealSquad(CalculationBox.Attacker[nochzumachen[i]],ForceAttacker[nochzumachen[i]].army,Math.min(heal,max));
						Ueberschuss -= (heal - temp);
						if ((heal - max) > 0){
							Ueberschuss += (heal-max);
							nochzumachen.splice(i,1);
							i--;
						}
					}
				}
			}
		}
		// now for the defender
		
		Ueberschuss = 0;
		VerwundeteToetenProzent = ForceDefender[0].effect.death; 
		nochzumachen = [];
		// Daten speichern
		for(var i = 0;(i < ForceDefender.length); i++) {
			CalculationBox.Defender[i].needhealamount = 0;
			for(var i2 = 0; i2 < ForceDefender[i].army.length; i2++){
				CalculationBox.Defender[i].army[i2].startamount = CalculationBox.Defender[i].army[i2].amount;
				CalculationBox.Defender[i].needhealamount += ForceDefender[i].army[i2].amount - CalculationBox.Defender[i].army[i2].amount;
			}
		}
		if (VerwundeteToetenProzent == 0){
			for(var i = 0;(i < ForceDefender.length); i++) {
				var heal = Math.max(0,parseInt(ForceDefender[i].army[5].getSpecial() * CalculationBox.Defender[i].army[5].amount * (ForceDefender[i].army[5].effect.special / 100) + 0.5));
				var temp = CalculationBox.calculateHealSquad(CalculationBox.Defender[i],ForceDefender[i].army,heal);
				Ueberschuss += temp;
				var healpower = heal - CalculationBox.Defender[i].needhealamount;

				// string handeling
				if (healpower >= 0)
					healpowerstr += '<span style="color:green">+'+healpower+'</span> , ';
				else
					healpowerstr += '<span style="color:red">'+healpower+'</span> , ';

				if (temp == 0)
					nochzumachen.push(i);
			}
			
			while ((Ueberschuss > 0) && (nochzumachen.length > 0)){
				var heal = Math.max(parseInt(Ueberschuss / nochzumachen.length),1);
				for(var i = 0;  i < nochzumachen.length ; i++){
					if (Ueberschuss > 0){
						var temp = CalculationBox.calculateHealSquad(CalculationBox.Defender[nochzumachen[i]],ForceDefender[nochzumachen[i]].army,heal);
						Ueberschuss -= (heal - temp);
						if (temp > 0){
							nochzumachen.splice(i,1);
							i--;
						}
					}
				}
			}
		}
		else{
			for(var i = 0;(i < ForceDefender.length); i++) {
				var heal = Math.max(0,parseInt(ForceDefender[i].army[5].getSpecial() * CalculationBox.Defender[i].army[5].amount * (ForceDefender[i].army[5].effect.special / 100) + 0.5));
				CalculationBox.Defender[i].maximumheal = Math.max(0,parseInt(CalculationBox.Defender[i].needhealamount * (100-VerwundeteToetenProzent)/100 +0.5));
				var max = CalculationBox.Defender[i].maximumheal;
				CalculationBox.calculateHealSquad(CalculationBox.Defender[i],ForceDefender[i].army,Math.min(heal,CalculationBox.Defender[i].maximumheal));
				if ((heal - CalculationBox.Defender[i].maximumheal) > 0){
					healpowerstr += '<span style="color:green">+'+(heal-CalculationBox.Defender[i].maximumheal)+'</span> , ';
					Ueberschuss += (heal-CalculationBox.Defender[i].maximumheal);
				}
				else{
					healpowerstr += '<span style="color:red">'+(heal-CalculationBox.Defender[i].maximumheal)+'</span> , ';
					nochzumachen.push(i);
				}
			}
			healpowerstr = healpowerstr.substring(0,healpowerstr.length-2) +" - ";
			while ((Ueberschuss > 0) && (nochzumachen.length > 0)){
				var heal = Math.max(parseInt(Ueberschuss / nochzumachen.length),1);
				for(var i = 0;  i < nochzumachen.length ; i++){
					if (Ueberschuss > 0){
						var max = CalculationBox.Defender[nochzumachen[i]].maximumheal;
						CalculationBox.calculateHealSquad(CalculationBox.Defender[nochzumachen[i]],ForceDefender[nochzumachen[i]].army,Math.min(heal,max));
						Ueberschuss -= (heal - temp);
						if ((heal - max) > 0){
							Ueberschuss += (heal-max);
							nochzumachen.splice(i,1);
							i--;
						}
					}
				}
			}
		}
		
		healpowerstr = healpowerstr.substring(0,healpowerstr.length-2);
		
		// now show it :O
		var html = '<div class="box">';
		html +='<div class="header">'+GENERAL.ROUNDHEAL+' '+healpowerstr+'</div>';
		html += '<table><tbody>';
		for(var i = 0;(i < ForceAttacker.length); i++) {
			html += '<tr class="attacker">';
			for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
				html += '<td>';
				html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].startamount)+'</div>';
				html += '<div style="color:green">+'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount-CalculationBox.Attacker[i].army[i2].startamount)+'</div>';
				html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
				html += '</td>';
			}
			html += '</tr>';
			html += '<tr style="height:2px"></tr>';
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			html += '<tr class="defender">';
			for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
				html += '<td>';
				html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].startamount)+'</div>';
				html += '<div style="color:green">+'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount-CalculationBox.Defender[i].army[i2].startamount)+'</div>';
				html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
				html += '</td>';
			}
			html += '</tr>';
			html += '<tr style="height:2px"></tr>';
		}
		html +='</div>';
		$('#Calculation').append(html);
	}
	
	this.createTerrorRoundEnd = function() {
		// get the highets terror
		var maxA = 0;
		var maxD = 0;
		for(var i = 0;(i < ForceAttacker.length); i++) {
			if (ForceAttacker[i].effect.terror > maxA) {
				maxA = ForceAttacker[i].effect.terror;
			}
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			if (ForceDefender[i].effect.terror > maxD) {
				maxD = ForceDefender[i].effect.terror;
			}
		}
		// only show terror round if there is one
		if (maxA == 0 && maxD == 0)
			return
		var html = '<div class="box">';
		// generate the String that shows how much everyone gets terrored
		html +='<div class="header">'+GENERAL.ROUNDTERROR+'</div>';
		html += '<table><tbody>';
		// now caluclate it and save the reduced amount on extra so its easier for the terrorEnd round
		if (maxA > 0) {
			for(var i = 0;(i < ForceAttacker.length); i++) {
				html += '<tr class="attacker">';
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					// Fearless or no amount equals in no reduction
					CalculationBox.Attacker[i].army[i2].amount += CalculationBox.Attacker[i].army[i2].terrorAmount;
					ForceAttacker[i].army[i2].amount += CalculationBox.Attacker[i].army[i2].terrorAmount;
					html += '<div style="color:green">+'+numberWithCommas(CalculationBox.Attacker[i].army[i2].terrorAmount)+'</div>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>';
			}
		}
		if (maxD > 0) {
			for(var i = 0;(i < ForceDefender.length); i++) {
				html += '<tr class="defender">';
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					CalculationBox.Defender[i].army[i2].amount += CalculationBox.Defender[i].army[i2].terrorAmount;
					ForceDefender[i].army[i2].amount += CalculationBox.Defender[i].army[i2].terrorAmount;
					html += '<div style="color:green">+'+numberWithCommas(CalculationBox.Defender[i].army[i2].terrorAmount)+'</div>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					html += '</td>';
				}
				html += '</tr>';
				html += '<tr style="height:2px"></tr>'
			}
		}
		html +='</div>';
		$('#Calculation').append(html);
	}
	
	this.createNecroRound = function(){
		var necroA = 0;
		var necroD = 0;
		var showA = false;
		var showD = false;
		
		// varibalen setzen
		for(var i = 0;(i < ForceAttacker.length); i++) {
			CalculationBox.Attacker[i].lostamount = 0;
			CalculationBox.Attacker[i].necro = 0;
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			CalculationBox.Defender[i].lostamount = 0;
			CalculationBox.Defender[i].necro = 0;
		}
		
		
		for(var i = 0;(i < ForceAttacker.length); i++) {
			// verluste abspeichern
			for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
				CalculationBox.Attacker[i].lostamount += (ForceAttacker[i].army[i2].amount - CalculationBox.Attacker[i].army[i2].amount);
			}
			// hasse ?
			if (( ForceAttacker[i].effect.necro[0] + ForceAttacker[i].effect.necro[1] + ForceAttacker[i].effect.necro[2]) > 0) {
				showA = true;
				// eigener necro dazuaddieren
				CalculationBox.Attacker[i].necro += ForceAttacker[i].effect.necro[0];
				
				// alle allierten necros
				for(var i2 = 0;(i2 < ForceAttacker.length); i2++) {
					if (i2 != i) {
						CalculationBox.Attacker[i2].necro += ForceAttacker[i].effect.necro[1];
					}
				}
				
				// alle feindlichen necros
				for(var i2 = 0;(i2 < ForceDefender.length); i2++) {
					CalculationBox.Defender[i2].necro += ForceAttacker[i].effect.necro[2];
				}
			}
		}
		
		for(var i = 0;(i < ForceDefender.length); i++) {
			// verluste abspeichern
			for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
				CalculationBox.Defender[i].lostamount += (ForceDefender[i].army[i2].amount - CalculationBox.Defender[i].army[i2].amount);
			}
			// hasse ?
			if (( ForceDefender[i].effect.necro[0] + ForceDefender[i].effect.necro[1] + ForceDefender[i].effect.necro[2]) > 0) {
				showD = true;
				// eigener necro dazuaddieren
				CalculationBox.Defender[i].necro += ForceDefender[i].effect.necro[0];
				
				// alle allierten necros
				for(var i2 = 0;(i2 < ForceDefender.length); i2++) {
					if (i2 != i) {
						CalculationBox.Defender[i2].necro += ForceDefender[i].effect.necro[1];
					}
				}
				
				// alle feindlichen necros
				for(var i2 = 0;(i2 < ForceAttacker.length); i2++) {
					CalculationBox.Attacker[i2].necro += ForceDefender[i].effect.necro[2];
				}
			}
		}
		
		if (showA==false && showD==false)
			return;
		
		
		var html = '<div class="box">';
		html +='<div class="header">'+GENERAL.ROUNDNECRO+'</div>';
		html += '<table><tbody>';
		
		//
		if (showA){
			for(var i = 0;(i < ForceAttacker.length); i++) {
				html += '<tr class="attacker">';
				for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					if (i2 == 6) {
						// own necro
						var necro = Math.min((30.0/CalculationBox.Attacker[i].necro),1) * ForceAttacker[i].effect.necro[0];
						var amount = (necro/100) * CalculationBox.Attacker[i].lostamount;
						// ally necro
						
						for(var i3 = 0;(i3 < ForceAttacker.length); i3++) {
							if (i3 != i) {
								necro = Math.min((30.0/CalculationBox.Attacker[i3].necro),1) * ForceAttacker[i].effect.necro[1];
								amount += (necro/100) * CalculationBox.Attacker[i3].lostamount;
							}
						}
						// enemy necro
						for(var i3 = 0;(i3 < ForceDefender.length); i3++) {
							necro = Math.min((30.0/CalculationBox.Defender[i3].necro),1) * ForceAttacker[i].effect.necro[2];
							amount += (necro/100) * CalculationBox.Defender[i3].lostamount;
						}
						
						
						amount = Math.round(amount);
						
						CalculationBox.Attacker[i].army[i2].amount += amount;
						CalculationBox.Attacker[i].necroamount = amount;
						html += '<div style="color:blue">+'+numberWithCommas(amount)+'</div>';
					}
					else {
						html += '<div style="color:green">+0</div>';
					}
					
					html += '<div>'+numberWithCommas(CalculationBox.Attacker[i].army[i2].amount)+'</div>';
					html += '</td>';
				}
				html += '</tr><tr style="height:2px"></tr>';
			}
		}
		if (showD){
			for(var i = 0;(i < ForceDefender.length); i++) {
				html += '<tr class="defender">';
				for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
					html += '<td>';
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					if (i2 == 6) {
						// own necro
						var necro = Math.min((30.0/CalculationBox.Defender[i].necro),1) * ForceDefender[i].effect.necro[0];
						var amount = (necro/100) * CalculationBox.Defender[i].lostamount;
						// ally necro
						
						for(var i3 = 0;(i3 < ForceDefender.length); i3++) {
							if (i3 != i) {
								necro = Math.min((30.0/CalculationBox.Defender[i3].necro),1) * ForceDefender[i].effect.necro[1];
								amount += (necro/100) * CalculationBox.Defender[i3].lostamount;
							}
						}
						// enemy necro
						for(var i3 = 0;(i3 < ForceAttacker.length); i3++) {
							necro = Math.min((30.0/CalculationBox.Attacker[i3].necro),1) * ForceDefender[i].effect.necro[2];
							amount += (necro/100) * CalculationBox.Attacker[i3].lostamount;
						}
						
						amount = Math.round(amount);
						
						CalculationBox.Defender[i].army[i2].amount += amount;
						CalculationBox.Defender[i].necroamount = amount;
						html += '<div style="color:blue">+'+numberWithCommas(amount)+'</div>';
					}
					else {
						html += '<div style="color:green">+0</div>';
					}
					
					html += '<div>'+numberWithCommas(CalculationBox.Defender[i].army[i2].amount)+'</div>';
					html += '</td>';
				}
				html += '</tr><tr style="height:2px"></tr>';
			}
		}
		html +='</div>';
		$('#Calculation').append(html);
	}
	
	$('#CalculationButton').click(function() {
		$('#Calculation').empty();
		// kopiere die Armeen7
		CalculationBox.tower = [ServerData.defence.tower[0].level,ServerData.defence.tower[1].level]
		CalculationBox.Attacker = [];
		for(var i = 0;(i < ForceAttacker.length); i++) {
			CalculationBox.Attacker.push( {
				fights : true,
				army : [],
				fraction : 0,
				necroamount : 0,
			})
			for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
				CalculationBox.Attacker[i].army.push( {
					amount : ForceAttacker[i].army[i2].amount,
					attack : 0,
					chp : ForceAttacker[i].army[i2].getCalculatedHp() * ForceAttacker[i].army[i2].amount,
					hp : ForceAttacker[i].army[i2].getCalculatedHp(),
					});
			}
		}
		CalculationBox.Defender = [];
		for(var i = 0;(i < ForceDefender.length); i++) {
			CalculationBox.Defender.push( {
				fights : true,
				army : [],
				necroamount : 0,
			})
			for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
				CalculationBox.Defender[i].army.push( {
					amount : ForceDefender[i].army[i2].amount,
					attack : 0,
					chp : ForceDefender[i].army[i2].getCalculatedHp() * ForceDefender[i].army[i2].amount,
					hp : ForceDefender[i].army[i2].getCalculatedHp(),
					});
			}
		}
		CalculationBox.createTerrorRound();
		CalculationBox.createKillRound();
		
		for(var i = 0;(i < ForceAttacker.length); i++) {
			for (var i2 = 0;(i2 < ForceAttacker[i].army.length); i2++) {
				CalculationBox.Attacker[i].army[i2].chp = ForceAttacker[i].army[i2].getCalculatedHp() * CalculationBox.Attacker[i].army[i2].amount;
			}
		}
		for(var i = 0;(i < ForceDefender.length); i++) {
			for (var i2 = 0;(i2 < ForceDefender[i].army.length); i2++) {
				CalculationBox.Defender[i].army[i2].chp = ForceDefender[i].army[i2].getCalculatedHp() * CalculationBox.Defender[i].army[i2].amount;
			}
		}
		
		var winner = 0;
		var round = 0;
		while((winner == 0) && (round < 20)) {
			CalculationBox.createNormalRound(round);
			var bool = CalculationBox.checkWinner();
			if (bool[0] == true)
				winner = 2;
			else if (bool[1] == true)
				winner = 1;
			round++;
		}
		if (winner == 0)
			winner = 2;
		
		CalculationBox.createHealRound();
		CalculationBox.createTerrorRoundEnd();
		CalculationBox.createNecroRound();
		
		CalculationBox.createResultRound(winner);
	});	
}	
var CalculationBox;

function CalculationBoxMain() {
	CalculationBox = new CalculationBoxObject();
}
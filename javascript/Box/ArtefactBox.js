function ArtefactBoxObject() {
	squad = null;
	this.id;
	this.selectid = -1;

	this.open = function(s,e,id) {
		this.id = id;
		squad = s;
		window.setTimeout(function() {
			$('#ArtefactBox').css('top',($(e.target).position().top+36)+'px').css('left',($(e.target).position().left+36)+'px').show();
			ArtefactBox.refresh();
			ArtefactBox.selectid = squad.hero.artefact[ArtefactBox.id].index;
			if (squad.hero.artefact[ArtefactBox.id].crystal)
				$('#ArtefactBox .menu .crystal').addClass("active");
			else
				$('#ArtefactBox .menu .crystal').removeClass("active");
			runeword = ArtefactBox.getRuneWord(ArtefactBox.id,squad.hero.artefact[ArtefactBox.id].rune);
			 if (runeword == false)
				 $('#ArtefactBox .menu .rune div').html("");
			 else if (typeof runeword == 'string')
				$('#ArtefactBox .menu .rune div').html("T");
			 else
				$('#ArtefactBox .menu .rune div').html(squad.hero.artefact[ArtefactBox.id].runeword);
		},1);
		
	}
	this.tooltip = function(id, index, crystal, artefacts) {
		if (index == -1) return "";
		var text = '<div class="artebox"><div class="header">';
		text += ARTEFACT_TOOLTIP[index][id][0] + " ["+(ARTEFACT_DATA[index][1]+1)+"] ";
		text += '<div style="float:right"><div class="pearl"></div>'+Trenner(ARTEFACT_DATA[index][3][id]*1000)+'</div></div>';
		
		text += '<div style="margin-top:10px">';
		text += effect2Text(ARTEFACT_DATA[index][2][id],0);
		// id 5 also belt ist immer gleich hol data von da
		if ( id == 5)
			text += ARTEFACT_BELT_TOOLTIP[ARTEFACT_DATA[index][1]]
		text += ARTEFACT_TOOLTIP[index][id][1];
		text += '</div>';
		// ### crystal
		if (crystal)
			text += '<div style="margin-top:10px;color:rgb(131, 180, 255);">';
		else 
			text += '<div style="margin-top:10px;color:rgb(100,100,100);">';
		text += effect2Text(ARTEFACT_CRYSTAL_DATA[id],ARTEFACT_DATA[index][1]);
		text += ARTEFACT_CRYSTAL_TOOLTIP[id][ARTEFACT_DATA[index][1]];
		text += '</div>';
		
		// ### rune
		text += '<div style="margin-top:10px;color:rgb(0, 225, 255);">';
		var runes = artefacts[id].rune;
		for (var i = 0; (i < runes.length); i++) {
			if (runes[i] != 0) {
				// füge effekt hinzu
				text += effect2Text(RUNE_DATA[i],runes[i]-1);
				if (RUNE_DATA[i] == false)
					text += RUNE_JAR_EXTRA[runes[i]-1];
				text += '<br>';
			}
		}
		text += '</div>';
		// ### runeword
		var word = this.getRuneWord(id,artefacts[id].rune);
		if (!(word == false)) {
			text += '<div style="margin-top:10px;color:rgb(235, 219, 0);">';
			if (typeof word == 'string')
				text += word;
			else
				text += effect2Text(word,artefacts[id].runeword);
			text += '</div>';
		}
		// ### set
		var count = 0;
		for(var i = 0;(i < artefacts.length); i++) {
			if (artefacts[i].index == index) count ++;
		}
		if (count == 9)
			text += '<div style="margin-top:10px;">';
		else
			text += '<div style="margin-top:10px;color:rgb(100,100,100);">';
		// wenns ein effekt gibt kombiniere ihn mit dem standart exp
		if (!(ARTEFACT_DATA[index][2][9] == false))
			combinedEffects = [ARTEFACT_DATA[index][2][9],ARTEFACT_SET_STANDART_EFFECT[ARTEFACT_DATA[index][1]]];
		else
			combinedEffects = ARTEFACT_SET_STANDART_EFFECT[ARTEFACT_DATA[index][1]];
		text += effect2Text(combinedEffects,0);
		// füge spezial hinzu
		text += ARTEFACT_TOOLTIP[index][9];
		// füge allgemein hinzu
		text += ARTEFACT_SET_TOOLTIP[ARTEFACT_DATA[index][1]];
		text += '</div>';
		
		text += '</div>';
		return text;
	}
	this.runeTooltip = function(id,runes) {
		var text = '<div class="artebox"><div class="header">';
		text += RUNE_NAMES[id] + " ["+runes[id]+"] </div>";
		
		if (runes[id] == 0)
			text += '<div style="margin-top:10px;color:rgb(100,100,100);">';
		else
			text += '<div style="margin-top:10px;">';
		
		text += effect2Text(RUNE_DATA[id],Math.max(0,runes[id]-1));
		if (RUNE_DATA[id] == false)
			text += RUNE_JAR_EXTRA[Math.max(0,runes[id]-1)];
		
		text += '</div>';
		return text;
	}
	this.getRuneWord = function(id,runes) {
		for (var i = 0; (i < RUNE_WORD[id].length); i++) {
			// gehe durch alle runenwörter
			var check = true;
			for (var i2 = 0; (i2 < runes.length); i2++) {
				if (runes[i2] != RUNE_WORD[id][i][0][i2])
					check = false;
			}
			if (check)
				return RUNE_WORD[id][i][1];
		}
		return false;
	}
	this.refresh = function() {
		var html = "";
		var search = $('#ArtefactBox .menu .search').val();
		var reg = new RegExp(search,"i")
		if (search.length != 0) {
			// suchen
			for(var i = 0; (i < ARTEFACT_TOOLTIP.length); i++) {
				if (ARTEFACT_TOOLTIP[i][this.id][0].search(reg) != -1)
					html += '<div class="outer" id="arteid_'+i+'"><div class="icon sprite-arte-'+ARTEFACT_DATA[i][0]+ARTEFACT_TYPE2SPRITE[this.id]+'"></div></div>';
			}
		}
		else {
			var level = 0;
			for(var i = 0; (i < ARTEFACT_DATA.length); i++) {
				if (level != ARTEFACT_DATA[i][1]) {
					level = ARTEFACT_DATA[i][1];
					html += '<div class="line"></div>';
				}
				html += '<div class="outer" id="arteid_'+i+'"><div class="icon sprite-arte-'+ARTEFACT_DATA[i][0]+ARTEFACT_TYPE2SPRITE[this.id]+'"></div></div>';
			}
		}
		$('#ArtefactBox .artefacts').html(html);
		$('#ArtefactBox .artefacts .outer').click(function(e) {
			var index = parseInt(this.id.substring(7));
			
			if (ArtefactBox.selectid == index) {
				// doppelklick -> raus
				$('#ArtefactBox').hide();
				return;
			}
			ArtefactBox.selectid = index;
			
			HeroBox.setArtefact(ArtefactBox.id,index,squad.hero.artefact[ArtefactBox.id].crystal);
		}).mouseenter(function(e) {
			var index = parseInt(this.id.substring(7));
			var html = ArtefactBox.tooltip(ArtefactBox.id,index,squad.hero.artefact[ArtefactBox.id].crystal,squad.hero.artefact);
			if (html != "") {
				Tooltip.show(e,20,20,html);
			}
		}).mouseleave(function() {
			Tooltip.hide();
		});
		$('#ArtefactBox .iconrune').each(function( index ) {
			$(this).html(squad.hero.artefact[ArtefactBox.id].rune[index]);
		});
		 runeword = ArtefactBox.getRuneWord(ArtefactBox.id,squad.hero.artefact[ArtefactBox.id].rune);
		 if (runeword == false)
			 $('#ArtefactBox .menu .rune div').html("");
		 else if (typeof runeword == 'string')
			$('#ArtefactBox .menu .rune div').html("T");
		 else
			$('#ArtefactBox .menu .rune div').html(squad.hero.artefact[ArtefactBox.id].runeword);
	}
	
	$('#ArtefactBox .menu .search').change(function() {
		ArtefactBox.refresh();
	});	
	$('#ArtefactBox .menu .crystal').click(function() {
		HeroBox.setArtefact(ArtefactBox.id,ArtefactBox.selectid,(! squad.hero.artefact[ArtefactBox.id].crystal));
		if (squad.hero.artefact[ArtefactBox.id].crystal)
			$('#ArtefactBox .menu .crystal').addClass("active");
		else
			$('#ArtefactBox .menu .crystal').removeClass("active");
	});
	$('#ArtefactBox .menu .rune').click(function(e) {
		var runes = squad.hero.artefact[ArtefactBox.id].rune;
		var word = ArtefactBox.getRuneWord(ArtefactBox.id,runes);
		var text = '<div class="artebox">';
		if (e.altKey) {
			text += '<div style="margin-top:10px;color:rgb(235, 219, 0);">';
			// bei alt key wird zwischen den möglichen runenwörter geswitchd
			
			// gibt es noch kein runenwort gehe zum ersten
			if (word == false) {
				// check erstmal ob es überhaupt ein runenwort gibt..
				if (RUNE_WORD[ArtefactBox.id].length == 0)
					return;
				// setze die runen
				for (var i = 0; (i < runes.length); i++) {
					runes[i] = RUNE_WORD[ArtefactBox.id][0][0][i];
				}
				word = RUNE_WORD[ArtefactBox.id][0][1];
				squad.hero.artefact[ArtefactBox.id].runeword = 0;
				if (typeof word == 'string')
					text += word;
				else {
					text += effect2Text(word,squad.hero.artefact[ArtefactBox.id].runeword);
				}
			}
			else {
				// ansonten gehe eine tick weiter
				var check = false;
				// hol das i als runenwort i
				var i = 0;
				for (i = 0; ((i < RUNE_WORD[ArtefactBox.id].length) && (check == false) ); i++) {
					// gehe durch alle runenwörter1
					check = true;
					for (var i2 = 0; (i2 < runes.length); i2++) {
						if (runes[i2] != RUNE_WORD[ArtefactBox.id][i][0][i2])
							check = false;
					}
				}
				if (i >= RUNE_WORD[ArtefactBox.id].length)
					i = 0
				// setze die runen
				for (var i2 = 0; (i2 < runes.length); i2++) {
					runes[i2] = RUNE_WORD[ArtefactBox.id][i][0][i2];
				}
				word = RUNE_WORD[ArtefactBox.id][i][1];
				squad.hero.artefact[ArtefactBox.id].runeword = 0;
				if (typeof word == 'string')
					text += word;
				else {
					text += effect2Text(word,squad.hero.artefact[ArtefactBox.id].runeword);
				}
			}
		}
		else {
			// ansonten erhöhe den runenwort index sofenr möglich
			if (!(word == false)) {
				text += '<div style="margin-top:10px;color:rgb(235, 219, 0);">';
				if (typeof word == 'string')
					text += word;
				else {
					squad.hero.artefact[ArtefactBox.id].runeword ++;
					if (e.shiftKey)
						squad.hero.artefact[ArtefactBox.id].runeword = runeword.amount.length-1;
					if (squad.hero.artefact[ArtefactBox.id].runeword >= runeword.amount.length)
						squad.hero.artefact[ArtefactBox.id].runeword = 0;
					text += effect2Text(word,squad.hero.artefact[ArtefactBox.id].runeword);
				}
				text += '</div>';
			}
			else
				return;
		}
		text += "</div>";
		ArtefactBox.refresh();
		EffectHandler.refresh();
		Tooltip.show(e,20,20,text);
	}).mouseenter(function(e) {
		var word = ArtefactBox.getRuneWord(ArtefactBox.id,squad.hero.artefact[ArtefactBox.id].rune);
		var text = '<div class="artebox">'
		if (!(word == false)) {
			text += '<div style="margin-top:10px;color:rgb(235, 219, 0);">';
			if (typeof word == 'string')
				text += word;
			else
				text += effect2Text(word,squad.hero.artefact[ArtefactBox.id].runeword);
			text += '</div>';
		}
		else
			return;
		text += "</div>";
		Tooltip.show(e,20,20,text);
	}).mouseleave(function() {
		Tooltip.hide();
	});
	$('#ArtefactBox .menu .clear').click(function() {
		// runen null setzen
		var runes = squad.hero.artefact[ArtefactBox.id].rune;
		for (var i = 0; (i < runes.length); i++) {
			 squad.hero.artefact[ArtefactBox.id].rune[i] = 0;
		}
		squad.hero.artefact[ArtefactBox.id].runeword = 0;
		// artefact 0 setzen
		HeroBox.setArtefact(ArtefactBox.id,-1,0);
		ArtefactBox.refresh();
		//$('#ArtefactBox').hide();
	});
	$('#ArtefactBox .iconrune').each(function( index ) {
		 $(this).click(function(e) {
			 var runes = squad.hero.artefact[ArtefactBox.id].rune;
			 var domore = false; // checkt ob man nach runenwort schauen muss
			 // altkey ist immer alles auf 0 setzen daher ..
			 if (e.altKey) {
				 $(this).html(0);
				 if (runes[index] != 0) {
					 domore = true;
					 runes[index] = 0;
				 }
			 }
			 else {
				 // erstmal alles zählen
				 var count = 0;
				 for (var i = 0; (i < runes.length); i++) {
					 count += runes[i];
				 }
				 // so nun schau ob du es löschen musst
				 if ((count == 4) && (runes[index] != 0)){
					 squad.hero.artefact[ArtefactBox.id].rune[index] = 0;
					 $(this).html(0);
					 domore = true;
				 }
				 // ansonten einfach erhöhen
				 else if (count != 4) {
					 if (e.shiftKey)
						 squad.hero.artefact[ArtefactBox.id].rune[index] = (4-count);
					 else
						 squad.hero.artefact[ArtefactBox.id].rune[index] ++;
					 $(this).html(squad.hero.artefact[ArtefactBox.id].rune[index]);
					 domore = true;
				 }
				// wenn count 4 ist und coutnIndex nicht belegt kann man da nix machen
			 }
			 if (domore) {
				 // wird aufgerufen wenn die runes etwas verändert haben
				 squad.hero.artefact[ArtefactBox.id].runeword = 0;
				 // runesindex also ändern
				 var html = ArtefactBox.runeTooltip(index,squad.hero.artefact[ArtefactBox.id].rune);
				 if (html != "") {
					Tooltip.show(e,20,20,html);
				 }
				 EffectHandler.refresh();
				 // runenwort schauen und anzeigen ( oben )
				 runeword = ArtefactBox.getRuneWord(ArtefactBox.id,squad.hero.artefact[ArtefactBox.id].rune);
				 if (runeword == false)
					 $('#ArtefactBox .menu .rune div').html("");
				 else if (typeof runeword == 'string')
					$('#ArtefactBox .menu .rune div').html("T");
				 else
					$('#ArtefactBox .menu .rune div').html(squad.hero.artefact[ArtefactBox.id].runeword);
			 }
			 
			 
		 }).mouseenter(function(e) {
			var html = ArtefactBox.runeTooltip(index,squad.hero.artefact[ArtefactBox.id].rune);
			if (html != "") {
				Tooltip.show(e,20,20,html);
			}
		}).mouseleave(function() {
			Tooltip.hide();
		});
	});
	this.onDocumentClick = function(e) {
		if ($('#ArtefactBox').is(":visible")){
			if (($('#ArtefactBox').find(e.target).length == 0) && ($(e.target).is('#ArtefactBox') == false)) {
				$('#ArtefactBox').hide();
			}
		}
	}
}	
var ArtefactBox;

function ArtefactBoxMain() {
	ArtefactBox = new ArtefactBoxObject();
}
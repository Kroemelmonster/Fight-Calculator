function MagicBoxObject() {
	squad = null;
	
	this.open = function(squad,e) {
		squad = squad;
		window.setTimeout(function() {
			var top = $('#HeroBox .magic').position().top + $('#HeroBox .magic .button.add').position().top;
			var left = $('#HeroBox .magic').position().left + $('#HeroBox .magic .button.add').position().left;
			$('#MagicBox').css('top',(top-50)+'px').css('left',(left+150)+'px').show();
		},1);
		MagicBox.refresh();
	}
	
	this.tooltip = function(index) {
		var html = '<div class="buffbox';
		if (!(squad.hero.magic[index])) html += ' nolevel';
		html += '"><div class="header">';
		html += MAGIC_NAME[index];
		if (squad.hero.magic[index]) {
			html += ' ['+squad.hero.magic[index]+']';
		}
		html += '</div>';
		var lvl = 0;
		if (squad.hero.magic[index]) lvl = squad.hero.magic[index]-1;
		html += effect2Text(MAGIC_DATA[index][3],lvl);
		
		html += '</div>';
		return html;
	}
	this.checkValidation = function(magic,name,search) {
		var bool = true;
		// zuerst muss der name passen
		if (search != null){
			if(name.search(search) == -1)
				bool = false;
		}
		if ($('#MagicBox_work').prop('checked') == true){
			// erstmal terrain check
			var effect = magic[3]; // wir gehen davon aus dass alle stufen gleich sind...
			if ($.isArray(effect)){
				var i2 = 0;
				for(var i = 0; (i < effect.length); i++){
					if ((effect[i].loc == 0) || (effect[i].loc == (ServerData.terrain+1))) {
						i2++;
					}
				}
				if (i2 == 0)
					bool = false;
			}
			else{ 
				if ((effect.loc != 0) && ( effect.loc != (ServerData.terrain+1)))
					bool = false;
			}
		}
		// nun checken ob alles ausgewählt ist
		if (($('#MagicBox_all').prop('checked') == true)){
			return bool;
		}
		if (($('#MagicBox_attack').prop('checked') == false) &&  (magic[2] == MAGIC_TYPE.ATTACK)){
			bool = false;
		}
		else if (($('#MagicBox_schutz').prop('checked') == false) &&  (magic[2] == MAGIC_TYPE.DEFENCE)){
			bool = false;
		}
		else if (($('#MagicBox_leben').prop('checked') == false) &&  (magic[2] == MAGIC_TYPE.HITPOINTS)){
			bool = false;
		}
		else if (($('#MagicBox_special').prop('checked') == false) &&  (magic[2] == MAGIC_TYPE.SPECIAL)){
			bool = false;
		}
		else if (($('#MagicBox_exp').prop('checked') == false) &&  (magic[2] == MAGIC_TYPE.EXP)){
			bool = false;
		}
		else if (($('#MagicBox_other').prop('checked') == false) &&  (magic[2] == MAGIC_TYPE.OTHER)){
			bool = false;
		}
		return bool;
	}
	this.refresh = function() {
		var magic = [[],[],[],[],[]];
		var search = $('#MagicBox .menu .search').val();
		var reg;
		if (search.length > 0)
			reg = new RegExp($('#MagicBox .menu .search').val(),"i");
		else
			reg = null;
		for(var i = 0; (i < MAGIC_DATA.length); i++) {
			if (this.checkValidation(MAGIC_DATA[i],MAGIC_NAME[i],reg))
				magic[MAGIC_DATA[i][1]].push(i);
		}
		var html = "";
		for(var i = 0; (i < magic.length); i++) {
			var show = true;
			if (i == MAGIC_RUBRIC.KINGDOM)
				show = (squad == ForceDefender[0]);
			if (i == MAGIC_RUBRIC.FORTSTANDART)
				show = (squad == ForceDefender[0]) && (squad.race == 5);
			if (show) {
				for(var i2 = 0; (i2 < magic[i].length); i2++) {
					html += '<div class="outer';
					if (squad.hero.magic[magic[i][i2]]) {
						html += ' active';
					}
					html += '" id="magicid_'+magic[i][i2]+'"><div class="icon sprite-magic-'+MAGIC_DATA[magic[i][i2]][0]+'"></div></div>';
				}
				html += '<hr style="height:3px; margin: 0; visibility:hidden;" />';
			}
		}
		html = html.substr(0,html.length-56);
		$('#MagicBox .magic').html(html).children().click(function(e) {
			var index = parseInt(this.id.substring(8));
			// alt = loeschen sofern m�glich
			if (e.altKey) {
				if (squad.hero.magic[index]) {
					delete squad.hero.magic[index];
					$(this).removeClass("active");
				}
			}
			else {
				// erstell es erstaml
				if (!squad.hero.magic[index]) {
					squad.hero.magic[index] = 0;
					$(this).addClass("active");
				}
				// bei shift auf max
				if (e.shiftKey){
					var maxlvl = 1;
					if ($.isArray(MAGIC_DATA[index][3]))
						maxlvl = MAGIC_DATA[index][3][0].amount.length;
					else
						maxlvl = MAGIC_DATA[index][3].amount.length;
					squad.hero.magic[index] = maxlvl;
				}
				// ansonten immer eins dazu bis es auf maxium ist dann wieder l�schen
				else {
					var maxlvl = 1;
					if ($.isArray(MAGIC_DATA[index][3]))
						maxlvl = MAGIC_DATA[index][3][0].amount.length;
					else
						maxlvl = MAGIC_DATA[index][3].amount.length;
					squad.hero.magic[index] += 1;
					if (squad.hero.magic[index] > maxlvl){
						delete squad.hero.magic[index];
						$(this).removeClass("active");
					}
				}
			}
			HeroBox.magicRefresh();
			EffectHandler.refresh();
			Tooltip.show(e,20,20,MagicBox.tooltip(index));
		}).mouseenter(function(e) {
			var index = parseInt(this.id.substring(8));
			Tooltip.show(e,20,20,MagicBox.tooltip(index));
		}).mouseleave(function(e) {
			Tooltip.hide();
		});
	}
	
	$('#MagicBox input[type=checkbox]').change(function() {
		// changing somehting besides all puts all on off
		if (($(this).attr('id') != "MagicBox_all") && ($(this).attr('id') != "MagicBox_work"))
			$('#MagicBox_all').prop('checked',false);
		MagicBox.refresh();
	});
	$('#MagicBox .menu .search').change(function() {
		MagicBox.refresh();
	});
	this.onDocumentClick = function(e) {
		if ($('#MagicBox').is(":visible")){
			if (($('#MagicBox').find(e.target).length == 0) && ($(e.target).is('#MagicBox') == false)) {
				$('#MagicBox').hide();
			}
		}
	}
}	
var MagicBox;

function MagicBoxMain() {
	MagicBox = new MagicBoxObject();
}
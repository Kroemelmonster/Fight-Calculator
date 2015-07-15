function SaveBoxObject() {
	// type 0 = squad, 1 = hero
	this.type = 0;
	
	thissquad = null;
	
	$('#SaveBox .save input.code').click(function() {
		this.focus();
		this.select();
	});
	$('#SaveBox .save input.cookie').change(function() {
		if (SaveBox.type == 0) 
			thissquad.updateName($(this).val());
		else{
			$('#HeroBox .hero .name').val($(this).val());
			thissquad.hero.name = $(this).val();
		}	
	});
	$('#SaveBox .save .button.cookie').click(function() {
		if (SaveBox.type == 0)
			setCookie('squad_'+$('#SaveBox .save input.cookie').val(),thissquad.toCode(),365);
		else
			setCookie('hero_'+$('#SaveBox .save input.cookie').val(),thissquad.heroToCode(false),365);
		Message.color('rgb(110, 255, 53)');
		Message.show('Saved',1000);
	});
	
	$('#SaveBox .load .code.button').click(function() {
		var result;
		if (SaveBox.type == 0)
			result = thissquad.loadCode($('#SaveBox .load input.code').val());
		else
			result = thissquad.heroLoadCode($('#SaveBox .load input.code').val(),true);
		if (result != "success") {
			Message.color('rgb(255,50,50)');
			Message.show(result,1000);
		}
		else if(result == "success") {
			Message.color('rgb(110, 255, 53)');
			Message.show('Success',1000);
			if (SaveBox.type == 0){
				thissquad.reloadElement();
				HeroBox.heroNameRefresh();
				HeroBox.heroIconRefresh();
				EffectHandler.refresh();
			}
			else {
				HeroBox.artefactRefresh();
				HeroBox.heroRefresh();
				HeroBox.heroNameRefresh();
				thissquad.heroIconRefresh();
				HeroBox.magicRefresh();
				EffectHandler.refresh();
			}
		}
	});
	
	$('#SaveBox .load .cookie.button').click(function() {
		var cookie;
		if (SaveBox.type == 0)
			cookie = getCookie('squad_'+$('#SaveBox .load input.cookie').val());
		else
			cookie = getCookie('hero_'+$('#SaveBox .load input.cookie').val());
		if (cookie == false) {
			Message.color('rgb(255,50,50)');
			Message.show('Nothing Found',1000);
		}
		var result;
		if (SaveBox.type == 0)
			result = thissquad.loadCode(cookie);
		else
			result = thissquad.heroLoadCode(cookie,false);
		if (result == "failed") {
			Message.color('rgb(255,50,50)');
			Message.show('Failed',1000);
		}
		else if(result == "success") {
			Message.color('rgb(110, 255, 53)');
			Message.show('Success',1000);
			if (SaveBox.type == 0){
				thissquad.reloadElement();
				thissquad.heroIconRefresh();
				EffectHandler.refresh();
			}
			else {
				HeroBox.artefactRefresh();
				HeroBox.heroRefresh();
				HeroBox.heroNameRefresh();
				thissquad.heroIconRefresh();
				HeroBox.magicRefresh();
				EffectHandler.refresh();
			}
		}
	});
	
	this.open = function(squad,e,type) {
		thissquad = squad;
		this.type = type;
		var windowtop = e.pageY ? e.pageY : e.clientY + body.scrollTop - body.clientTop;
		var windowleft = e.pageX ? e.pageX : e.clientX + body.scrollLeft  - body.clientLeft;
		$('#SaveBox').css('top',(windowtop-50)+'px').css('left',(windowleft-50)+'px').show();
		
		if (this.type == 0) {
			$('#SaveBox .save .link').show().attr("href", "http://kroemelcombat.bplaced.net/Kampfrechner/squad.php?l="+LANG+"&d="+thissquad.toCode());
			$('#SaveBox .save input.code').val(thissquad.toCode());
			$('#SaveBox .save input.cookie').val(thissquad.name);
		}
		else if(this.type == 1){
			$('#SaveBox .save .link').hide();
			$('#SaveBox .save input.code').val(thissquad.heroToCode(true));
			$('#SaveBox .save input.cookie').val(thissquad.hero.name);
		}
	}
	
	this.onDocumentClick = function(windowtop,windowleft) {
		if ($('#SaveBox').is(":visible")){
			var t = windowtop - parseInt($('#SaveBox').position().top);
			var z = windowleft - parseInt($('#SaveBox').position().left);
			if ((t < 0) || (t > parseInt($('#SaveBox').height())) || (z < 0) || (z > parseInt($('#SaveBox').width()))){
				$('#SaveBox').hide();
			}
		}
	}
	
}
var SaveBox;

function SaveBoxMain() {
	SaveBox = new SaveBoxObject();
	$('#SaveBox .save div.code').html(SAVE_BOX.CODE);
	$('#SaveBox .save div.cookie').eq(0).html(SAVE_BOX.SAVE_NAME);
	$('#SaveBox .save .link').html(SAVE_BOX.LINK);
	$('#SaveBox .save .button').html(SAVE_BOX.SAVE);
	$('#SaveBox .load .button').html(SAVE_BOX.LOAD);
	$('#SaveBox .load div.code').eq(0).html(SAVE_BOX.LOAD_CODE);
	$('#SaveBox .load div.cookie').eq(0).html(SAVE_BOX.LOAD_NAME);
}
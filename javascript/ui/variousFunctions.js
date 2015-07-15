var CHARS = "qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM1234567890()"

function GetCharPosition(str){
	var i = 0;
	for(i = 0; (str != CHARS.charAt(i)); i++){};
	return i;
}
function Char2Number(str){
	var numb = 0;
	var multi = 1;
	for(i = 0; (i < str.length); i++){
		numb += GetCharPosition(str.charAt(i)) * multi;
		multi *= 64;
	}
	return numb;
}
function Number2Char(numb,chars){
	var str = "";
	var multi = Math.pow(64,chars-1);
	if (numb >= Math.pow(64,chars))
		numb = Math.pow(64,chars) - 1;
	for(i = 0; (i < chars); i++){
		var dope = Math.floor(numb/multi);
		str = CHARS[dope] + str;
		if ((multi*dope) <= numb)
			numb -= (multi*dope);
		multi /= 64;
	}
	return str;
}

function Trenner(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output+= '.' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output); 
	} 
	else
		return number; 
}

function eraseCookie(name) {
	setCookie(name,"",-1);
}
function getCookie(c_name){
	if (!c_name) return false;
	if (c_name.length == 0) return false;
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}
function setCookie(c_name,value,exdays){
	if (!c_name) return false;
	if (c_name.length == 0) return false;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
	return true;
}

function MessageObject() {
	this.color = function(color) {
		$('#Message').find('.text').css('background',color).css('-webkit-box-shadow','0px 0px 10px 5px '+color)
					 .css('-moz-box-shadow','0px 0px 10px 5px '+color).css('box-shadow','0px 0px 10px 5px '+color);
	}
	this.show = function(text,time) {
		$('#Message').stop().css('opacity','1').show().fadeOut(time).find('.text').html(text);
	}
}
var Message;

function TooltipObject() {
	this.offsetX = 0;
	this.offsetY = 0;
	this.show = function(e,x,y,text) {
		this.offsetX = x;
		this.offsetY = y;
		this.move(e);
		$('#Tooltip').show().html(text);
	}
	this.hide = function() {
		$('#Tooltip').hide();
	}
	this.move = function(e) {
		var windowtop = e.pageY ? e.pageY : e.clientY + document.body.scrollTop - document.body.clientTop;
		var windowleft = e.pageX ? e.pageX : e.clientX + document.body.scrollLeft  - document.body.clientLeft;
		$('#Tooltip').css('top',(windowtop+this.offsetY)+'px').css('left',(windowleft+this.offsetX)+'px');
	}
}
var Tooltip;

function SystemMain() {
	$(document).click(function(e) {
		var windowtop = e.pageY ? e.pageY : e.clientY + body.scrollTop - body.clientTop;
		var windowleft = e.pageX ? e.pageX : e.clientX + body.scrollLeft  - body.clientLeft;
		SaveBox.onDocumentClick(windowtop,windowleft);
		ArtefactBox.onDocumentClick(e);
		MagicBox.onDocumentClick(e);
		HeroBox.onDocumentClick(e,windowtop,windowleft);
	}).mousemove(function(e) {
		Tooltip.move(e);
	});
	$('#Message').css('display','table').hide();
	Message = new MessageObject();
	$('#Tooltip').css('display','block').hide();
	Tooltip = new TooltipObject();
}


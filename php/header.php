<?php
	$ln =(isset($_COOKIE['language']) ? $_COOKIE['language'] : 'de');
	$menue_lang = array(0 => "Kampfrechner", 1 => 'Tipps', 2 => 'Impressum', 3 => 'Über');
	if ($ln == "en") $menue_lang = array(0 => "Combat Calculator", 1 => 'Tipps', 2 => 'Site notice', 3 => 'About');
	else if ($ln == "pl") $menue_lang = array(0 => "Kalkulator bojowy", 1 => 'Wskazówki', 2 => 'Warunki użytkowania', 3 => 'O Mnie');
?>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link href="/Kampfrechner/css/basic.css" rel="stylesheet" type="text/css" />
<script src="javascript/jquery.js"></script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36016258-6']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<body onload="main()">
<div id="Tooltip" class="tooltip"></div>
<div id="Message">
	<div><div class="text"></div></div>
</div>
<div id="Container">
	<div id="Header">
		
		<div id="Menu">
			<a class="button" href="calc.php"><?php echo $menue_lang[0]; ?></a>
			<a class="button" href="tipps.php"><?php echo $menue_lang[1]; ?></a>
			<a class="button" href="impressum.php"><?php echo $menue_lang[2]; ?></a>
			<a class="button" href="about.php" ><?php echo $menue_lang[3]; ?></a>
			
			<div class="languageicon de<?php if (strcmp($ln,"de") == 0) echo " active" ?>"></div>
			<div class="languageicon en<?php if (strcmp($ln,"en") == 0) echo " active" ?>"></div>
			<div class="languageicon pl<?php if (strcmp($ln,"pl") == 0) echo " active" ?>"></div>
		</div>
	</div>
	<div id="Page">
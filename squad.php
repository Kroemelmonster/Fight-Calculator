<?php
	$language_id = ($_COOKIE['language']!='' ? $_COOKIE['language'] : 'de');
	$text_lang = array(0 => "Rubrik", 1 => 'Zauber', 2 => 'Lšndereizauber', 3 => 'Standarte',
						4 => 'Questbelohnungen', 5 => 'Effekttyp', 6 => 'Angriff',
						7 => 'Schutz', 8 => 'Leben', 9 => 'Einheitenspezial', 10 => 'Erfahrung',
						11 => 'Anderes', 12 => 'Spezifisch',
						13 => 'L&auml;ndereischutz', 14 => 'lvl');
	if ($language_id == "en") {
		$text_lang = array(0 => "Category", 1 => 'Spells', 2 => 'Domainspell', 3 => 'Standards',
						4 => 'Questrewards', 5 => 'Effecttyp', 6 => 'Damage',
						7 => 'Defence', 8 => 'Life', 9 => 'Unitspecial', 10 => 'Experience',
						11 => 'Others', 12 => 'Specific',
						13 => 'Maximum Defence', 14 => 'lvl');
	}
	else if ($language_id == "pl") {
		$text_lang = array(0 => "Kategoria", 1 => 'Czar', 2 => 'Domena czar', 3 => 'Standardy',
						4 => 'nagrody Quest', 5 => 'typ Effect', 6 => 'Uszkodzenie',
						7 => 'Obrona', 8 => 'Zycie', 9 => 'Jednostka specjalna', 10 => 'doswiadczenie',
						11 => 'Inne', 12 => 'Specyficzny',
						13 => 'Maksymalna obrona', 14 => 'lvl');
	}
?>
<link href="css/squad.css" rel="stylesheet" type="text/css" />
<link href="css/sprite.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="javascript/squad/main.js"></script>
<script type="text/javascript" src="javascript/squad/ServerData.js"></script>
<script type="text/javascript" src="javascript/system/data.js"></script>
<script type="text/javascript" src="javascript/system/system.js"></script>
<script type="text/javascript" src="javascript/Box/SaveBox.js"></script>
<script type="text/javascript" src="javascript/Box/HeroBox.js"></script>
<script type="text/javascript" src="javascript/Box/ArtefactBox.js"></script>
<script type="text/javascript" src="javascript/Box/MagicBox.js"></script>
<script type="text/javascript" src="javascript/system/data_<?php echo $language_id; ?>.js"></script>
<script type="text/javascript">
	PAGETYPE = "SQUAD";
	LANG = "<?php echo $language_id; ?>";
	DATA = <?php if( isset($_GET['d'])) echo '"'.$_GET['d'].'";';
				else echo 'null;'; ?>
</script>
<?php   include_once "php/header.php";    ?>

<div id="SaveBox" class="unselectable">
	<div class="save">
		<ul>
			<li><div class="code"></div><input class="code" type="text" readonly="readonly"></li>
			<li><div class="cookie"></div><input class="cookie" type="text" maxlength="15"><div class="cookie button"></div></li>
			<li><a class="link"target= "_blank"></a></li>
		</ul>
	</div>
	<div class="load">
		<ul>
			<li><div class="code"></div><input class="code" type="text"><div class="code button"></div></li>
			<li><div class="cookie"></div><input class="cookie" type="text" maxlength="15"><div class="cookie button"></div></li>
		</ul>
	</div>
</div>

<div id="HeroBox" class="unselectable">
	<div class="left">
		<div class="hero">
			<div class="class"></div>
			<div class="typ"></div><div class="gender"></div>
			<input class="name" type="text" maxlength="15">
		</div>
		<div class="menu">
			<div class="button clear"><div></div></div>
			<div class="button save"><div></div></div>
			<div class="button custom"><div></div></div>
		</div>
	</div>
	<div class="center">
		<div class="skills">
		</div>
		<div class="magic">
			<div class="button add"><div></div></div>
			<div class="button clear"><div></div></div>
			<div class="area">
			
			</div>
		</div>
	</div>
	<div class="right">
		<div class="artefacts">
			<table>
				<tr>
					<td><div class="icon"></div></td>
					<td><div class="icon"></div></td>
					<td><div class="icon"></div></td>
				</tr>
				<tr>
					<td><div class="icon"></div></td>
					<td><div class="icon"></div></td>
					<td><div class="icon"></div></td>
				</tr>
				<tr>
					<td><div class="icon"></div></td>
					<td><div class="icon"></div></td>
					<td><div class="icon"></div></td>
				</tr>
			</table>
		</div>
	</div>
	
	<div id="ArtefactBox" class="unselectable">
		<div class="menu">
			<input class="search" type="text">
			<div class="outer crystal"><div></div></div>
			<div class="outer clear"><div></div></div>
		</div>
		<div class="artefacts">
			<div class="outer"><div class="icon"></div></div>
			<div class="line"></div>
		</div>
	</div>
	
	<div id="MagicBox" class="unselectable">
		<div class="menu">
			<input class="search" type="text">
			<div class="rubric">
				<span><?php echo $text_lang[0]; ?></span>
				<input id="MagicBox_normal" class="css-checkbox" type="checkbox" checked="checked" />
				<label for="MagicBox_normal" class="css-label"><?php echo $text_lang[1]; ?></label>
				<input id="MagicBox_area" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_area" class="css-label"><?php echo $text_lang[2]; ?></label>
				<input id="MagicBox_burg" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_burg" class="css-label"><?php echo $text_lang[3]; ?></label>
				<input id="MagicBox_quest" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_quest" class="css-label"><?php echo $text_lang[4]; ?></label>
			</div>
			<div class="type">
				<span><?php echo $text_lang[5]; ?></span>
				<input id="MagicBox_attack" class="css-checkbox" type="checkbox" checked="checked" />
				<label for="MagicBox_attack" class="css-label"><?php echo $text_lang[6]; ?></label>
				<input id="MagicBox_schutz" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_schutz" class="css-label"><?php echo $text_lang[7]; ?></label>
				<input id="MagicBox_leben" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_leben" class="css-label"><?php echo $text_lang[8]; ?></label>
				<input id="MagicBox_special" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_special" class="css-label"><?php echo $text_lang[9]; ?></label>
				<input id="MagicBox_exp" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_exp" class="css-label"><?php echo $text_lang[10]; ?></label>
				<input id="MagicBox_other" class="css-checkbox" type="checkbox" />
				<label for="MagicBox_other" class="css-label"><?php echo $text_lang[11]; ?></label>
				<input id="MagicBox_work" class="css-checkbox" type="checkbox" checked="checked" />
				<label for="MagicBox_work" class="css-label"><?php echo $text_lang[12]; ?></label>
				
			</div>
		</div>
		<div class="magic">
			<div class="outer"><div class="icon"></div></div>
		</div>
	</div>
</div>

<div class="defender">
	<div class="squad">
		<div class="inputarea unselectable">
			<div class="army human">
				<div class="hero sprite-heroes-HEROM_BACK"><div class="heroimage sprite-heroes-HEROM"></div></div>
				<?php for ($i = 0; $i < 8; $i++) {
					echo '<div class="unit" style="background-position: -'.($i*68).' -164px">';
					echo '	<input type="text" maxlength="12" value="0">';
					echo '</div>';
				}
				?>
			</div>
			
			<div class="bar">
				<div class="dropdown race">
					<div></div>
					<div class="menu"></div>
					<div class="menu"></div>
					<div class="menu"></div>
					<div class="menu"></div>
					<div class="menu"></div>
				</div>
				<div class="button level">3</div>
				<div class="name"><input type="text" maxlength="15"></div>
				<div class="retreat">
					<input type="text" maxlength="3" value="50"><span>%</span>
				</div>
				<div class="button renegade off">!</div>
				<div class="button chance"></div>
			</div>
			
			<div class="side">
				<div class="icon new"><div></div></div>
				<div class="icon save"><div></div></div>
			</div>
		</div>
	</div>
</div>

<div id="ServerData" class="unselectable">
	<div class="defence unselectable">
		<div class="row top">
			<div class="landdefence"></div>
			<div class="special"></div>
			<div class="dropdown terrain">
				<div class="show"></div>
				<table>
					<tr>
						<td class="id0"></td>
						<td class="id1"></td>
						<td class="id2"></td>
					</tr>
					<tr>
						<td class="id3"></td>
						<td class="id4"></td>
						<td class="id5"></td>
					</tr>
					<tr>
						<td class="id6"></td>
						<td class="id7"></td>
						<td class="id8"></td>
					</tr>
				</table>
			</div>
			<div class="button new"><div></div></div>
		</div>
		<div class="row">
			<div class="building tower"><div class="lvl">0</div></div>
			<div class="building gate"><div class="lvl">0</div></div>
			<div class="building tower"><div class="lvl">0</div></div>
		</div>
		<div class="row">
			<table>
				<tr>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 1</div><input type="text" maxlength="2" value="0"></td>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 2</div><input type="text" maxlength="2" value="0"></td>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 3</div><input type="text" maxlength="2" value="0"></td>
				</tr>
				<tr>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 4</div><input type="text" maxlength="2" value="0"></td>
					<td><div class="icon"></div></td>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 5</div><input type="text" maxlength="2" value="0"></td>
				</tr>
				<tr>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 6</div><input type="text" maxlength="2" value="0"></td>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 7</div><input type="text" maxlength="2" value="0"></td>
					<td><div class="lvl"><?php echo $text_lang[14]; ?> 8</div><input type="text" maxlength="2" value="0"></td>
				</tr>
			</table>
		</div>
	</div>
	<!-- <div class="language">
		<div class="icon de <?php if ($language_id == 'de') echo 'active'; ?>"></div>
		<div class="icon en <?php if ($language_id == 'en') echo 'active'; ?>"></div>
		<div class="icon pl <?php if ($language_id == 'pl') echo 'active'; ?>"></div>
	</div>
	<div class="servertyp">Bergbauserver</div> -->
</div>
	
<?php   include_once "php/footer.php";    ?>
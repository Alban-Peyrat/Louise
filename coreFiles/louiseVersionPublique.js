$('document').ready(function(){

//Déclaration de toutes les variables de l'interface ou nécessaires pour l'interface
 var divImgPlan = $("#divImgPlan"),
 divImgPlanHTML = '',
 planProp = '',
 divPlan = $("#divPlan"),
 divChoix = $("#divChoix"),
 salle1 = $("#salle1"),
 horsformat = $("#horsformat"),
 divInputHTML = $('#divInput').html(),
 overCount =0,
 ajoutNb=1,
 memoryCoteText = '',
 errorCoteText = '',
 tableChildNb = '',
 trSearchNb = '',
 coteTextNb = '',
 radioSearchIs = '',
 stockChoixVar = 0,
 stock = 0,
 searchType = '';
 
//Fonction remettant à zéro l'interface de recherche
 function resetUI(){
	 ajoutNb=1;
	 $('#search').hide();
	 $('#divInput').html('<table class="inputTable" id="tableChild' + ajoutNb +
	 '"><tr class="inputTitle"><th colspan="2">Revue - sélectionnez l' + "'année :</th>" +
		'<th colspan="2">Autre document :</th></tr><tr class="trEmpty"><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr>' +
		'<tr class="trRadio"><td colspan="2"><input type="radio" name="' + ajoutNb +
		'" id="salle' + ajoutNb + '">2011 à 2021</td><td colspan="2"><input type="radio" name="' + ajoutNb + '" id="dvd' + ajoutNb + '">Audiovisuel</td>' +
		'</tr><tr class="trRadio"><td colspan="2"><input type="radio" name="' + ajoutNb +
		'" id="magasin' + ajoutNb + '">Avant 2011</td><td colspan="2"><input type="radio" name="' + ajoutNb + '" id="livre' + ajoutNb + '">Autre type de document</td>' +
		'</tr><tr><td colspan="3" style="text-align: center"><input type="text" id="coteText' + ajoutNb +
		'" class="coteText hidden" placeholder="Copiez-collez la cote ou le nom de la revue"></td></tr>' +
		'<tr id="trSearch' + ajoutNb + '"><td><button id="ajoutSearch" class="ajoutSearch hidden"><i class="fas fa-angle-right"></i>  Ajoutez une cote</button><br/></td></tr></table>');
	 trSearchNb = 'trSearch'+ajoutNb;
	 coteTextNb = 'coteText'+ajoutNb;
 };
 
 //Applique la remise à zéro (puisque de base l'interface n'est pas compéltement créée)
 resetUI();
 
//Fonction affichant la prochaine table lors du clic sur le bouton dédié
 $('#divInput').on("click", '#ajoutSearch',function() {
	 $(this).parents("tr").html('');
	 ajoutNb = ajoutNb+1;
	 divInputHTML = $('#divInput').html();
	 $('#divInput').append('<table class="inputTable" id="tableChild' + ajoutNb +
	 '"><tr class="inputTitle"><th colspan="2">Revue - sélectionnez l' + "'année :</th>" +
		'<th colspan="2">Autre document :</th></tr><tr class="trEmpty"><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr>' +
		'<tr class="trRadio"><td colspan="2"><input type="radio" name="' + ajoutNb +
		'" id="salle' + ajoutNb + '">2011 à 2021</td><td colspan="2"><input type="radio" name="' + ajoutNb + '" id="dvd' + ajoutNb + '">Audiovisuel</td>' +
		'</tr><tr class="trRadio"><td colspan="2"><input type="radio" name="' + ajoutNb +
		'" id="magasin' + ajoutNb + '">Avant 2011</td><td colspan="2"><input type="radio" name="' + ajoutNb + '" id="livre' + ajoutNb + '">Autre type de document</td>' +
		'</tr><tr><td colspan="3" style="text-align: center"><input type="text" id="coteText' + ajoutNb +
		'" class="coteText hidden" placeholder="Copiez-collez la cote ou le nom de la revue"></td></tr>' +
		'<tr id="trSearch' + ajoutNb + '"><td><button id="ajoutSearch" class="ajoutSearch hidden"><i class="fas fa-angle-right"></i>  Ajoutez une cote</button><br/></td></tr></table>');	
 });
  
//Fonction affichant la zone de saisie de texte et l'ajout de recherche
  $('#divInput').on("click", "input:radio", function () {
	 var radios = document.getElementsByName(ajoutNb);

     for (var i = 0, len = radios.length; i < len; i++) {
          if (radios[i].checked) {
			 trSearchNb = 'trSearch'+ajoutNb;
			 coteTextNb = 'coteText'+ajoutNb;
			 document.getElementById(coteTextNb).style.display = 'block';
			 tableChildNb = 'tableChild'+ajoutNb;
			 $('#search').show();
				if(document.getElementById(tableChildNb).style.display != 'block'){
					$('#ajoutSearch').show();
				};
          }
     }
 });

  
//Ouverture (ou fermeture) l'aide en cliquant sur le bouton dédié
  $("#helpButton").click(function(){
    $("#helpToggle").toggle("slide", {direction: "up"});
  });
 
//Paramétrage des info-bulles illustrées
  $('.tooltipA').tooltip({position :{at: "right+5% top-2%", of:"#help"}, show: {duration: 75}});
  $( "#helpArtRevue" ).tooltip({ content: "<img src='images/article_revue.png'/>"});
  $( "#helpArtRevueArrow" ).tooltip({ content: "<img src='images/article_revue_arrow2.png'/>"});
  $( "#helpRevueEtatColl" ).tooltip({ content: "<img src='images/revue_etatColl2.png'/>"});
  $( "#helpRevueEtatCollCircle" ).tooltip({ content: "<img src='images/revue_etatColl_circle2.png'/>"});
  $( "#helpRevueCopier" ).tooltip({ content: "<img src='images/revue_copier.png'/>"});
  $( "#helpDVD" ).tooltip({ content: "<img src='images/DVD2.png'/>"});
  $( "#helpDVDCopier" ).tooltip({ content: "<img src='images/DVD_copier.png'/>"});
  $( "#helpDVDCopier2" ).tooltip({ content: "<img src='images/DVD_copier.png'/>"});


//Configuration de la pop-up pour le plan
 $(function () {
  $( "#divPlan" ).dialog({
    autoOpen: false,
	resizable: false,
	draggable: false,
	width: 1500,
	minHeight: 10,
	clickOutside: true,
	clickOutsideTrigger: "#search"
  });
 });

//Configuration de la pop-up pour les résultats sans plan
 $(function () {
  $( "#divNotPlan" ).dialog({
    autoOpen: false,
	resizable: false,
	draggable: false,
	width: 1500,
	minHeight: 10,
	clickOutside: true,
	clickOutsideTrigger: "#search"
  });
 });
 
//Configuration de la pop-up pour les choix
 $(function () {
  $( "#divChoix" ).dialog({
    autoOpen: false,
	resizable: false,
	draggable: false,
	width: 600,
	top: 500,
	clickOutside: true,
	clickOutsideTrigger: "#search",
//Permet de rouvrir la pop-up si d'autres cotes sont stockées
	  beforeClose: function( event, ui ) {
	  stockChoixVar = stockChoixVar -1;
		if (stockChoixVar > 0 ) {
		 if ($('#divChoix').dialog('isOpen') == false) {
			problemCote();
		  } else {};
		}else if (stockChoixVar == 0 ) {
			if (stock > 1){
				$('#notPlanButton').show();
			 };
			divImgPlan.show(); setTimeout(function() {divPlan.dialog('open');}, 1);
		}else {alert("Erreur. stockChoixVar a une valeur impossible ("+stockChoixVar+"). Contactez un documentaliste.)")};}
  });
 });

//Fonction paramètrant et préparant l'affichage de la couche située au-dessus du plan
 function overProp() {
	 overCount = overCount +1;
	 divImgPlanHTML = divImgPlan.html();
	 if (divImgPlanHTML.indexOf(planProp) == -1){
		$('#divImgPlan').append('<img id="over' + overCount + '" class="overPlan" src="' + planProp + '">');
	 }else if (divImgPlanHTML.indexOf(planProp) > -1){
	 }else {alert("Erreur. planProp ("+planProp+") de Schrödinger. Est et n'est pas contenu dans #divImgPlan. Contactez un documentaliste.");};
 };

 //Préparation des listes pour les revues
var revues = JSON.parse(revuesList);
test = revues.length,
textRevueSalleBDD = '<br>',
textRevueMagBDD = '<br>';	

//Supprime les articles définis en début de titre et certains caratères
for (var i = 0; i < revues.length; i++){
//SI LA PREMIERE COLONNE DU EXCEL CONTENANT LA LISTE DES REVUES À CHANGER DE NOM :
//Remplacer revues[i].Titre par revues[i]["{copiez-collez le nom de la colonne ici}"].toLowerCase()
//Ne mettez pas les accolades.
var revueX = revues[i].Titre.toLowerCase();
if ((revueX.substring(0, 2) === "l'") || (revueX.substring(0, 3) === "la ") || (revueX.substring(0, 3) === "le ")){
	revueX = revueX.substring(2,999);
}else if ((revueX.substring(0, 4) === "the ") || (revueX.substring(0, 4) === "les ")){
	revueX = revueX.substring(3,999);
};
//Retire les accents, les caractères . + - / * = ' " : &, les espaces des titres de revues
revueX = revueX.normalize("NFD").replace(/[<>,;!?¿¡+&*='":\/\.\s\u0300-\u036f-]/g, '');
//Fin de la boucle générant les listes
};
  
//Fonction permettant de lancer la recherche en appuyant sur la touche Entrée
 var pressKeySearch = $('#divInput');
  pressKeySearch.keyup(function (e) {
    if ((e.keyCode == 13) && (window)) {
      $('#search')[0].click();
    }
  });

//Intégralité du script d'analyse

//Lancement du script lorsqu'un clic est effectué sur le bouton "Recherchez"
 $('#search').click(function() {

//Vérifie qu'au moins une valeur ait été entrée
 var getCoteTextY = '';
 for (i = 0;  i < ajoutNb; i++){
	 var getCoteTextX = 'coteText'+ (i+1); getCoteTextY = getCoteTextY + document.getElementById(getCoteTextX).value;
};
//Réponse si aucune valeur n'entrée
 if (getCoteTextY == ''){
 	resetUI(); alert("Veuillez renseigner des valeurs.");
//Réponse si au moins une valeur entrée
 }else if (getCoteTextY != ''){

//Supprime les couches situées au-dessus du plan précédemment affichées
 $('#divImgPlan').html('<img id="plan" src="Plans/plan_vierge_ET_textes.png">');
 overCount = 0;
 
//Cache les textes susceptibles d'avoir été affichés
 $("#errorLine").hide();
 $('#borderDivNotPlan').html('');
 $('#borderDivPlan').html('');
 $('.changeDialog').hide();
 
//Déclaration des variables pour la boucle
 var stock = 1,
 stockPlan = 1,
 stockAns = '',
 stockAnsI = 0,
 isDvd = '',
 isLivre = '',
 isMag = '',
 isSalle = '',
 errorStock = 0;
 
//La grande boucle (i = nb de champs apparus) 
 for (i = 0;  i < ajoutNb; i++){
	 getCoteTextX = 'coteText'+ (i+1);
	 if (document.getElementById(getCoteTextX).value == ''){
	 }else if (document.getElementById(getCoteTextX).value != ''){
 
//Définition des variables pour détecter le type de recherche
 isDvd = 'dvd' + (i+1);
 isLivre = 'livre' + (i+1);
 isMag = 'magasin' + (i+1);
 isSalle = 'salle' + (i+1);
 
//Detection du type de recherche
 if (document.getElementById(isDvd).checked == true){
		 searchType = '(audiovisuel)';
	 }else if (document.getElementById(isLivre).checked == true) {
		 searchType = "(autre qu'audiovisuel)";
	 }else if (document.getElementById(isMag).checked == true) {
		 searchType = '(avant 2011)';
	 }else if (document.getElementById(isSalle).checked == true) {
		 searchType = '(de 2011 à 2021)';
	 }else {alert("L'affichage a rencontré un problème : isMag = "+document.getElementById(isMag).checked+", isSalle = "+document.getElementById(isSalle).checked+", isDvd = "+document.getElementById(isDvd).checked+", isLivre = "+document.getElementById(isLivre).checked+". Contactez un documentaliste.")};
 
//Reset à zéro de la variable pour les textes
 stockAnsI = 0;
	
//Déclaration et paramétrage des variables servant à l'analyse
 coteText = document.getElementById(getCoteTextX).value.replace(/[<>]/g, '');
 coteTextInput = coteText.trim();
 revueTextInput = coteText.trim().toLowerCase();
 memoryCoteText = coteText ;
 coteText = coteText.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
 var coteTextInput1 = coteTextInput.substring(0, 1);
 coteTextInput2 = coteTextInput.substring(0, 2),
 coteTextInput3 = coteTextInput.substring(0, 3),
 coteTextInput4 = coteTextInput.substring(0, 4),
 coteTextInput5 = coteTextInput.substring(0, 5),
 coteTextInput6 = coteTextInput.substring(0, 6),
 coteTextInput7 = coteTextInput.substring(0, 7),
 coteTextInputXXDec = coteTextInput.substring(3, 6),
 coteTextInputXXXDec = coteTextInput.substring(4, 7),
 coteTextInputUni3 = coteTextInput.charCodeAt(2),
 coteTextInputUni4 = coteTextInput.charCodeAt(3),
 coteTextInputUni5 = coteTextInput.charCodeAt(4),
 coteTextInputUni6 = coteTextInput.charCodeAt(5),
 coteTextInputUni7 = coteTextInput.charCodeAt(6),
 coteTextInputUni9 = coteTextInput.charCodeAt(8);
//Retire les accents, les caractères . + - / * = ' " : &, les espaces des titres de revues
 revueTextInputTrue = revueTextInput.normalize("NFD").replace(/[+,;!?¿¡&*='":\/\.\s\u0300-\u036f-]/g, '');
//Détection et supression des déterminants définis pour les revues
 if ((revueTextInput.substring(0, 2) === "l'") || (revueTextInput.substring(0, 3) === "la ") || (revueTextInput.substring(0, 3) === "le ")){
	var revueTextInputTrue = revueTextInputTrue.substring(2,99);
 }else if ((revueTextInput.substring(0, 4) === "the ") || (revueTextInput.substring(0, 4) === "les ")){
	var revueTextInputTrue = revueTextInputTrue.substring(3,99);
 };	
//Suite de déclaration et paramétrage des variables servant à l'analyse 
 var revueTextInputTrueUni1 = revueTextInputTrue.charCodeAt(0),
 revueTextInputTrueUni2 = revueTextInputTrue.charCodeAt(1),
 revueTextInputTrueUni3 = revueTextInputTrue.charCodeAt(2);
 
//Fonction paramétrant les informations textuelles à ajouter à la réponse (notamment si le plan n'a pas à être affiché)
 function notPlan(){
	if (stockAnsI == 1){
		stockAns = "Le document est disponible uniquement en ligne.<br/>Vous trouverez le lien pour y accéder sous le résumé et les sujets.";
	}else if (stockAnsI == 2){
		stockAns = "Adressez-vous aux documentalistes pour obtenir ce document.";
	}else if (stockAnsI == 3){
		stockAns = "La bibliothèque ne possède pas ce document. Adressez-vous au laboratoire PASSAGES.<br/>Seuls eux peuvent vous aider, merci de votre compréhension.";
	}else if (stockAnsI == 4){
		stockAns = "Ce document appartient à la documentation technique.<br/>Adressez-vous aux documentalistes pour obtenir ce document.";
	}else if (stockAnsI == 5){
		stockAns = "";
	}else if (stockAnsI == 6){
		stockAns = "La bibliothèque ne possède pas ce document. Adressez-vous au laboratoire CEPAGE.<br/>Seuls eux peuvent vous aider, merci de votre compréhension.";
	}else if (stockAnsI == 7){
		stockAns = "La bibliothèque ne possède pas ce document. Adressez-vous au laboratoire GEVR.<br/>Seuls eux peuvent vous aider, merci de votre compréhension.";
	}else if (stockAnsI == 8){
		stockAns = "La bibliothèque ne possède pas ce document. Adressez-vous au DPEA Rebuilding the world - RBW.<br/>Seuls eux peuvent vous aider, merci de votre compréhension.";
	}else if (stockAnsI == 10){
		stockAns = "La bibliothèque ne possède pas ce document. Adressez-vous au laboratoire PAVE.<br/>Seuls eux peuvent vous aider, merci de votre compréhension.";
	}else if (stockAnsI == 11){
		stockAns = "La bibliothèque ne possède pas ce document. Adressez-vous au laboratoire GRECCAU.<br/>Seuls eux peuvent vous aider, merci de votre compréhension.";
	}else if (stockAnsI == 12){
		stockAns = "Nous ne possédons pas cette revue, nous pouvons toutefois effectuer une demande de scan auprès des écoles du réseau la possédant.";
	}else if (stockAnsI == 13){
		stockAns = "Vérifiez l'année de votre document. Si tout est correct alors adressez-vous aux documentalistes pour obtenir ce document.";
	}else if (stockAnsI == 14){
		stockAns = "Nous possédons cette revue.<br/>Toutefois, nous vous invitons à vérifier l'année que vous avez renseignée.";
	}else if (stockAnsI == 15){
		stockAns = " -> Vérifiez l'année de votre document. Si tout est correct alors...";
	}else if (stockAnsI == 16) {
		stockAns = " -> Même si vous ne pouvez pas emprunter la revue de presse,<br/>vous pouvez toutefois photocopier ou scanner l'article qui vous intéresse.";
	}else if (stockAnsI == 0) {
		stockAns = "";
	}else {alert("Erreur. StockAnsI a une valeur inconnue (" + stockAnsI + "). Contactez un documentaliste.")};
 };
 
//Fonction gérant l'affichage des réponses si le plan n'a pas à être affiché
 function stockVar(){
	 notPlan();
	 $('#borderDivNotPlan').append('<p class="lambda divImgText input" id="notPlanSearch' + stock + '"><b>' + memoryCoteText + '</b><em> ' + searchType + '</em> -> ' + stockAns + '</p>');
	 stock = stock + 1;
 };
 
//Fonction gérant l'affichage des réponses textuelles si le plan doit être affiché
 function showSearch(){
	 notPlan();
	 $('#borderDivPlan').append('<p class="lambda divImgText input" id="planSearch' + stockPlan + '"><b>' + memoryCoteText + '</b><em> ' + searchType + '</em>' + stockAns + '<br/></p>');
	 $('#borderDivPlan').show(); stockPlan = stockPlan + 1;
 };
 
//Fonction paramétrant la pop-up des choix
 function stockChoix(){
	 stockChoixVar = stockChoixVar + 1;
	 $('#borderDivPlan').append('<p class="lambda divImgText input" id="planSearch' + stock + '"><b id="planSearchChoix'+stockChoixVar+'">' + memoryCoteText + "</b><em> " + searchType + "</em></p>");
 };
 
//Fonction paramétrant la variable mémorisant les cotes générant une erreur
 function errorAlert() {
  errorStock = errorStock + 1;
  if (errorStock == 1){
	  errorCoteText = memoryCoteText;
  }else if (errorStock > 1) {
	  errorCoteText = errorCoteText + " ; " + memoryCoteText;
  }else {alert("Erreur. errorStock est négatif ("+errorStock+"). Contactez un documentaliste.");};
 };
 
//Transformation de la première partie de la cote CDU en nombre entier correspondant
 var coteTextInputInt = parseInt(coteTextInput);
	if (coteTextInputInt > 99) {
		var coteTextInputIntTrue = coteTextInputInt;
	}else if ((coteTextInputInt > 9) && (coteTextInputInt < 100)){
		if (coteTextInput.charAt(0) === "0"){
		var coteTextInputIntTrue = coteTextInputInt;
		}else if (coteTextInput.charAt(0) !== "0"){
		var coteTextInputIntTrue = coteTextInputInt * 10;
		};
	}else if ((coteTextInputInt > 0) && (coteTextInputInt < 10)){
		if ((coteTextInput.charAt(0) === "0") && (coteTextInput.charAt(1) === "0")){
		var coteTextInputIntTrue = coteTextInputInt;
		}else if ((coteTextInput.charAt(0) === "0") && (coteTextInput.charAt(1) !== "0")){
		var coteTextInputIntTrue = coteTextInputInt * 10;
		}else if (coteTextInput.charAt(0) !== "0"){
		var coteTextInputIntTrue = coteTextInputInt * 100;
		};
	};
	
//Transformation de la décimale en nombre entier correspondant (pour les cotes forme XX)
 var coteTextInputXXDecInt = parseInt(coteTextInputXXDec);
	if (coteTextInputXXDecInt > 99) {
		var coteTextInputXXDecIntTrue = coteTextInputXXDecInt;
	}else if ((coteTextInputXXDecInt > 9) && (coteTextInputXXDecInt < 100)){
		if (coteTextInputXXDec.charAt(0) === "0"){
		var coteTextInputXXDecIntTrue = coteTextInputXXDecInt;
		}else if (coteTextInputXXDec.charAt(0) !== "0"){
		var coteTextInputXXDecIntTrue = coteTextInputXXDecInt * 10;
		};
	}else if ((coteTextInputXXDecInt > 0) && (coteTextInputXXDecInt < 10)){
		if ((coteTextInputXXDec.charAt(0) === "0") && (coteTextInputXXDec.charAt(1) === "0")){
		var coteTextInputXXDecIntTrue = coteTextInputXXDecInt;
		}else if ((coteTextInputXXDec.charAt(0) === "0") && (coteTextInputXXDec.charAt(1) !== "0")){
		var coteTextInputXXDecIntTrue = coteTextInputXXDecInt * 10;
		}else if (coteTextInputXXDec.charAt(0) !== "0"){
		var coteTextInputXXDecIntTrue = coteTextInputXXDecInt * 100;
		};
	};
	
//Transformation de la décimale en nombre entier correspondant (pour les cotes forme XXX)
 var coteTextInputXXXDecInt = parseInt(coteTextInputXXXDec);
	if (coteTextInputXXXDecInt > 99) {
		var coteTextInputXXXDecIntTrue = coteTextInputXXXDecInt;
	}else if ((coteTextInputXXXDecInt > 9) && (coteTextInputXXXDecInt < 100)){
		if (coteTextInputXXXDec.charAt(0) === "0"){
		var coteTextInputXXXDecIntTrue = coteTextInputXXXDecInt;
		}else if (coteTextInputXXXDec.charAt(0) !== "0"){
		var coteTextInputXXXDecIntTrue = coteTextInputXXXDecInt * 10;
		};
	}else if ((coteTextInputXXXDecInt > 0) && (coteTextInputXXXDecInt < 10)){
		if ((coteTextInputXXXDec.charAt(0) === "0") && (coteTextInputXXXDec.charAt(1) === "0")){
		var coteTextInputXXXDecIntTrue = coteTextInputXXXDecInt;
		}else if ((coteTextInputXXXDec.charAt(0) === "0") && (coteTextInputXXXDec.charAt(1) !== "0")){
		var coteTextInputXXXDecIntTrue = coteTextInputXXXDecInt * 10;
		}else if (coteTextInputXXXDec.charAt(0) !== "0"){
		var coteTextInputXXXDecIntTrue = coteTextInputXXXDecInt * 100;
		};
	};
 
 
//Analyse en cas de revue

//Récupération de la propriété "Salle" ou "Magasin"
	var isXMag = document.getElementById(isMag).checked;
	var isXSalle = document.getElementById(isSalle).checked;
 
//Si "avant 20XX" ou "20xx à 20XX" est sélectionné
	if ((isXMag == true) || (isXSalle == true)){
//Boucle vérifiant si les données entrées correspondent à un titre de revue de la liste
		for (var z = 0; z < revues.length; z++){
			revueX = revues[z].Titre.toLowerCase();
//Retire les accents, les caractères . + - / * = ' " : &, les espaces des titres de revues
			revueX = revueX.normalize("NFD").replace(/[+,;!?¿¡<>&*='":\/\.\s\u0300-\u036f-]/g, '');
//Vérifie si les données entrées correspondent au titre de la revue
			if (revueX.indexOf(revueTextInputTrue) > -1) {
//Si la revue est en salle
				if (revues[z].salle!= ''){
//Revue non présente en magasin, "avant 20XX" sélectionné
					if ((isXMag == true) && (revues[z]["magasin rdc"] == '') && (revues[z]["réserve mezzanine"] == '')) {
						stockAnsI = 14; stockVar(); z=(revues.length+3);
//Revue présente en magasin, "avant 20XX" sélectionné
					}else if ((isXMag == true) && ((revues[z]["magasin rdc"] != '') || (revues[z]["réserve mezzanine"] != ''))){
						stockAnsI = 13; stockVar(); z=(revues.length+3);
//Si "20xx à 20XX" est coché
					}else if (isXSalle == true){
//Affiche le texte si la revue est également en magasin
						if ((revues[z]["magasin rdc"] != '') || (revues[z]["réserve mezzanine"] != '')){stockAnsI = 15;};
//Revue qui commence par un chiffre et commence par A{' + - . @ " OU une lettre entre a (compris) et n (compris)}
						if (((revueTextInputTrueUni1 == 97) && (revueTextInputTrueUni2 >= 97) && (revueTextInputTrueUni2 <= 110))
						|| ((revueTextInputTrueUni1 >= 48) && (revueTextInputTrueUni1 <= 57))
						|| (((revueTextInputTrueUni1 == 97) && ((revueTextInputTrueUni2 == 39) || (revueTextInputTrueUni2 == 43) || (revueTextInputTrueUni2 == 45) || (revueTextInputTrueUni2 == 46) || (revueTextInputTrueUni2 == 34) || (revueTextInputTrueUni2 == 64))))){
							planProp = 'Plans/A_D1.png'; overProp();  showSearch(); z=(revues.length+3);
//Revue qui commence par A{une lettre entre n (exclu) et z (compris)}
						}else if (((revueTextInputTrueUni1 == 97) && (revueTextInputTrueUni2 > 110) && (revueTextInputTrueUni2 <= 122))){
							planProp = 'Plans/A_C1.png'; overProp();  showSearch(); z=(revues.length+3);
//Revue qui commence par B ou C ou D{u' + - . @ " OU une lettre entre a (compris) et n (compris) OU o{u' + - . @ " OU une lettre entre a (compris) et m (exclu)}}
						}else if (((revueTextInputTrueUni1 == 100) && (revueTextInputTrueUni2 >= 97) && (revueTextInputTrueUni2 <= 110))
						|| ((revueTextInputTrueUni1 == 100) && (revueTextInputTrueUni2 == 111) && (((revueTextInputTrueUni3 >= 97) && (revueTextInputTrueUni3 < 109)) || (revueTextInputTrueUni3 == 39) || (revueTextInputTrueUni3 == 43) || (revueTextInputTrueUni3 == 45) || (revueTextInputTrueUni3 == 46) || (revueTextInputTrueUni3 == 34) || (revueTextInputTrueUni3 == 64)))
						|| (revueTextInputTrueUni1 == 98)
						|| (revueTextInputTrueUni1 == 99)
						|| (((revueTextInputTrueUni1 == 100) && ((revueTextInputTrueUni2 == 39) || (revueTextInputTrueUni2 == 43) || (revueTextInputTrueUni2 == 45) || (revueTextInputTrueUni2 == 46) || (revueTextInputTrueUni2 == 34) || (revueTextInputTrueUni2 == 64))))){
							planProp = 'Plans/A_C2.png'; overProp();  showSearch(); z=(revues.length+3);
//Revue qui commence par E F G H I  ou D{une lettre entre p (compris) et z (compris) OU o{une lettre entre m (compris) et z (compris)}}
						}else if (((revueTextInputTrueUni1 == 100) && (revueTextInputTrueUni2 == 111) && ((revueTextInputTrueUni3 >= 109) || (revueTextInputTrueUni3 <= 122)))
						|| ((revueTextInputTrueUni1 == 100) && ((revueTextInputTrueUni2 > 111) || (revueTextInputTrueUni2 <= 122)))
						|| ((revueTextInputTrueUni1 >= 101) && (revueTextInputTrueUni1 <= 105))){
							planProp = 'Plans/A_B1.png'; overProp();  showSearch(); z=(revues.length+3);
//Revue qui commence par J
						}else if ((revueTextInputTrueUni1 == 106)){
							planProp = 'Plans/A_B1B2.png'; overProp();  showSearch(); z=(revues.length+3);
//Revue qui commence par K L M N O
						}else if ((revueTextInputTrueUni1 >= 107) && (revueTextInputTrueUni1 <= 111)) {
							planProp = 'Plans/A_B2.png'; overProp();  showSearch(); z=(revues.length+3);
//Revue qui commence par P à Z
						}else if ((revueTextInputTrueUni1 >= 112) && (revueTextInputTrueUni1 <= 122)) {
							planProp = 'Plans/A_A1A2.png'; overProp();  showSearch(); z=(revues.length+3);
//Fin de l'analyse de la revue
						}else {alert("Erreur. isSalle = "+document.getElementById(isSalle).checked+", revue présente en salle mais pas en magasin,  mais aucun résultat ne correspond (cote rentrée ="+memoryCoteText+"). Contactez un documentaliste"); errorAlert();}
//Fin de se "20xx à 20XX" est coché
					};
					
//Fin des revues présentes en salle
//Revue en magasin non présente en salle
				}else if ((revues[z].salle == '') && ((revues[z]["magasin rdc"] != '') || (revues[z]["réserve mezzanine"] != ''))){
//Si "avant 20XX" est coché
					if (isXMag == true){
						stockAnsI = 2; stockVar(); z=(revues.length+3);
//Si "20xx à 20XX" est coché
					}else if (isXSalle == true){
						stockAnsI = 14; stockVar(); z=(revues.length+3);
					};
				}else {alert("Erreur. isMagT = "+document.getElementById(isMag).checked+" mais aucun résultat ne correspond (cote rentrée ="+memoryCoteText+"). Contactez un documentaliste"); errorAlert();};
//Fin du if les données entrées correspondent à une réponse
			};
//Si les données entrées ne correspondent à aucune revue de la liste
		if ((z+1) == revues.length) {stockAnsI = 12; stockVar()}
//Fin de la boucle vérifiant la présence des données entrées dans la liste
		};


//Si ce n'est pas un DVD
	}else if (document.getElementById(isLivre).checked == true) {
//Cotes revue de presse
		if (coteText.indexOf("REVUE DE PRESSE") > -1) {
		 planProp = 'Plans/D_F1.png'; overProp(); stockAnsI = 16;  showSearch();
//Cotes Atlas
		}else if (coteText.indexOf("ATLAS") > -1){
		 planProp = 'Plans/C_A1.png'; overProp();  showSearch();
//Cotes en ligne
		}else if (coteText.indexOf("EN LIGNE") > -1){
		 stockAnsI = 1; stockVar();
//Cotes des laboratoires 
		}else if ((coteText.indexOf("GRECAU") > -1) || (coteTextInput6 === "ARCVE ") || (coteTextInput6 === "COARC ") || (coteTextInput6 === "ECONS ") || (coteTextInput5 === "GENE ") || (coteTextInput5 === "HYTH ") || (coteTextInput5 === "LUMI ") || (coteTextInput5 === "SONO ") || (coteTextInput6 === "VILDU ")){
		 stockAnsI = 11;stockVar();
		}else if ((coteTextInput4 === "ARC ") || (coteTextInput3 === "DV ") || (coteTextInput4 === "ENS ") || (coteTextInput4 === "HAB ") || (coteTextInput4 === "MET ") || (coteTextInput4 === "PRO ") || (coteTextInput4 === "SOC ") || (coteTextInput4 === "URB ")){
		 stockAnsI = 10;stockVar();
		}else if (coteText.indexOf("PASSAGES") > -1){
		 stockAnsI = 3;stockVar();
		}else if (coteTextInput4 === "RBW "){
		 stockAnsI = 8;stockVar();
		}else if (coteText.indexOf("GEVR") > -1){
		 stockAnsI = 7;stockVar();
		}else if (coteText.indexOf("CEPAGE") > -1){
		 stockAnsI = 6;stockVar();
//Cotes du magasin
		}else if (
		(coteText.indexOf("FA ") > -1) || (coteText.indexOf("J A") > -1) || (coteText.indexOf("J B") > -1) || (coteText.indexOf("J C") > -1) || (coteText.indexOf("J D") > -1) || (coteText.indexOf("J E") > -1)
		|| (coteText.indexOf("SAC ") > -1) || (coteText.indexOf("RS ") > -1) || (coteText.indexOf("MEM ") > -1) || (coteText.indexOf("HA ") > -1) || (coteText.indexOf("DPEA ") > -1) || (coteText.indexOf("DIV ") > -1) || (coteText.indexOf("DESS ") > -1) || (coteText.indexOf("CEA ") > -1) || (coteText.indexOf("CA ") > -1) || (coteText.indexOf("BX ") > -1) || (coteTextInput2 === "E ") || (coteTextInput2 === "L ") || (coteTextInput2 === "P ") || (coteTextInput2 === "S ") || (coteTextInput2 === "U ") || (coteText.indexOf("MES ") > -1) || (coteTextInput3 === "10.") || (coteText.indexOf("TPFE") > -1)
		|| ((coteTextInputInt == coteTextInput) && (coteTextInputInt > 0)) || (coteTextInput2 === "R ")
//Cotes du magasin (ajout de la version 0.4.3)
		|| (coteText.indexOf("K ") > -1) || (coteText.indexOf("DV_") > -1) || (coteText.indexOf("DVD ") > -1) || (coteText.indexOf("POS ") > -1) || (coteText.indexOf("HMO ") > -1) || (coteTextInput3 === "10/") || (coteText.indexOf("FD ") > -1) || (coteText.indexOf("FR ") > -1) || (coteText.indexOf("CD ") > -1) || (coteText.indexOf("&") > -1) || (coteText.indexOf("G17") > -1) || (coteText.indexOf("F ") > -1)
		|| (coteText.indexOf("BUREAU") > -1) || (coteText.indexOf("TOME") > -1) || (coteText.indexOf("SUITE") > -1)|| (coteText.indexOf("COTE") > -1) || (coteText.indexOf("A INVEN") > -1) || (coteText.indexOf("ACCUEIL") > -1)|| (coteText.indexOf("SERVICE") > -1) || (coteText.indexOf("CARTE") > -1) || (coteText.indexOf("COMMAN") > -1)|| (coteText.indexOf("MEUBLE") > -1) || (coteText.indexOf("NON ") > -1) || (coteText.indexOf("VILLE") > -1)
		|| ((coteText.indexOf("VOL") > -1) && (coteTextInputInt >1000)) || ((coteText.indexOf("BIS") > -1) && (coteTextInputInt >1000))
		|| ((coteTextInputInt >1000) && (coteTextInputInt <10000) && ((coteTextInputUni6 == 69) || (coteTextInputUni6 == 78) || (coteTextInputUni6 == 79) || (coteTextInputUni6 == 83) || (coteTextInputUni6 == 71) || ((coteTextInputUni5 == 45) && (parseInt(coteTextInput.substring(5, 10)) > 1000) && (parseInt(coteTextInput.substring(5, 10)) < 10000))))
		){
		 stockAnsI = 2;stockVar();
//Cotes en conflits de positions
		}else if (
		(coteText.indexOf("72.033(038) VIO") > -1) || (coteText.indexOf("712.2.036 ALP") > -1) || (coteText.indexOf("712.2.035 BES") > -1)
		|| (coteText.indexOf("72(092) CAL-JOD") > -1) || (coteText.indexOf("72(092) COO") > -1)
		|| (coteText.indexOf("72(092) WRI-PFE") > -1) || (coteText.indexOf("72(092) SIZ-JOD") > -1) || (coteText.indexOf("72(092) MEI-JOD") > -1)
		){
		 stockChoix();
//Cotes hors formats sur les étagères
		}else if ((coteText.indexOf("69(031) ENC") > -1) || (coteText.indexOf("69(031) TEC") > -1) || (coteText.indexOf("7(038) TUR") > -1) || (coteText.indexOf("7.03 MAZ") > -1) || (coteText.indexOf("7.03 STR") > -1) || (coteText.indexOf("7.03 UNI") > -1) || (coteText.indexOf("72(093) AAL-GAR") > -1) || (coteText.indexOf("72.035(035) BLO") > -1) || (coteText.indexOf("726.5 BOC") > -1) || (coteText.indexOf("726.5 ERL") > -1) || (coteText.indexOf("728.6 TRO") > -1) || (coteText.indexOf("811.133.1(038) LIT") > -1) || (coteText.indexOf("72.012 PRI") > -1) || (coteText.indexOf("712.2.03 LAB") > -1)){
		  planProp = 'Plans/F_B1.png'; overProp();  showSearch();
//Cotes hors formats sur la table
		}else if ((coteText.indexOf("72(092) AND-JOD") > -1) || (coteText.indexOf("72(092) NEU-MAC") > -1) || (coteText.indexOf("72(092) BAN-JOD") > -1)){
		 planProp = 'Plans/F_table.png'; overProp();  showSearch();
//Encyclopédie Univ.
		}else if (coteText.indexOf("030 ENC") > -1){
		 planProp = 'Plans/F_A1.png'; overProp();  showSearch();
//Cotes matériauthèque (2019)
		}else if ((coteTextInput1 === "I") || (coteTextInput1 === "X") || (coteTextInput1 === "V")){
		 stockAnsI = 4;stockVar();
		 
//Cotes en salle (ordre de la CDU)

//Cotes de 0XX à <300
		}else if ((coteTextInputIntTrue < 300) && (coteTextInputIntTrue > 0)){
		 planProp = 'Plans/D_F1.png'; overProp();  showSearch();
//Cotes de 300 à <316
		}else if ((coteTextInputIntTrue < 316) && (coteTextInputIntTrue >= 300)){
		 planProp = 'Plans/D_E2.png'; overProp(); showSearch();
//Cotes de 316 à <320
		}else if ((coteTextInputIntTrue < 320) && (coteTextInputIntTrue >= 316)){
		 planProp = 'Plans/D_E1E2.png'; overProp(); showSearch(); //D_E1 & D_E2
//Cotes de 320 à <341
		}else if ((coteTextInputIntTrue < 341) && (coteTextInputIntTrue >= 320)){
		 planProp = 'Plans/D_E1.png'; overProp(); showSearch();
//Cotes de 341 à <580
		}else if ((coteTextInputIntTrue < 580) && (coteTextInputIntTrue >= 341)){
		 planProp = 'Plans/D_D2.png'; overProp();  showSearch();
//Cotes de 580 à <690
		}else if ((coteTextInputIntTrue < 690) && (coteTextInputIntTrue >= 580)){
		 planProp = 'Plans/D_D1D2.png'; overProp(); showSearch(); //D_D1 & D_D2
//Cotes de 690 à <700
		}else if ((coteTextInputIntTrue < 700) && (coteTextInputIntTrue >= 690)){
		 planProp = 'Plans/D_C1C2.png'; overProp(); showSearch(); //D_C1 & D_C2
		 
//Début des 7XX

//Cotes de 700 à <710
		}else if ((coteTextInputIntTrue < 710) && (coteTextInputIntTrue >= 700)){
		 planProp = 'Plans/D_B1B2C1.png'; overProp(); showSearch(); //D_C1 & D_B1 & D_B2
//Cotes de 71 à 711:XXX
		}else if ((coteTextInputIntTrue == 710) || ((coteTextInputIntTrue == 711) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && (coteTextInputUni4 != 46) && (coteTextInputUni4 != 45))){
		 planProp = 'Plans/D_A2.png'; overProp();   showSearch();
//Cotes de 711( à <711.072
		}else if ((coteTextInputIntTrue == 711) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 45) && ((coteTextInputUni4 == 40) || (coteTextInputUni4 == 34) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue < 72)&& (coteTextInputXXXDecIntTrue > 0)))){
		 planProp = 'Plans/D_A1.png'; overProp();  showSearch();
//Cotes de 711.072 à <711.4
		}else if ((coteTextInputIntTrue == 711) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 45) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 72)&& (coteTextInputXXXDecIntTrue < 400))){
		 planProp = 'Plans/G_A1.png'; overProp();  showSearch();
//Cotes 711.4(ABC)
		}else if ((coteTextInputIntTrue == 711) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 45) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue == 400) && (coteTextInputUni6 == 40) && ((coteTextInputUni7 >= 65) && (coteTextInputUni7 <= 90)))){
		 planProp = 'Plans/G_A1B1.png'; overProp(); showSearch(); //G_A1 & G_B1
//Cotes au-delà de 711.4(ABC) à <711.430
		}else if (((coteTextInputIntTrue == 711) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue == 400) && (coteTextInputUni6 == 40) && ((coteTextInputUni7 >= 48) && (coteTextInputUni7 <= 57))))
		|| ((coteTextInputIntTrue == 711) && (coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue < 430) && (coteTextInputXXXDecIntTrue > 400))){
		 planProp = 'Plans/G_B1.png'; overProp();  showSearch();
//Cotes de 711.430 à <712
		}else if ((coteTextInputIntTrue == 711) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 430)&& (coteTextInputXXXDecIntTrue < 1000))){
		 planProp = 'Plans/G_B2.png'; overProp();  showSearch();
//Cotes de 712 à <712.2
		}else if ((coteTextInputIntTrue == 712) && (coteTextInputUni4 != 45) && ((coteTextInputUni4 == 47) || (coteTextInputUni4 == 58) || (coteTextInputUni4 == 40) || (coteTextInputUni4 == 34) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue > 0)&& (coteTextInputXXXDecIntTrue < 200)))){
		 planProp = 'Plans/G_C1.png'; overProp();  showSearch();
//Cotes de 712.2 à <72
		}else if (((coteTextInputIntTrue == 712) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 45) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 200)&& (coteTextInputXXXDecIntTrue < 1000))))
		|| ((coteTextInputIntTrue > 712) && (coteTextInputIntTrue < 720))){
		 planProp = 'Plans/G_C2.png'; overProp();  showSearch();
//Les 72(092)
		}else if ((coteTextInput7 === "72(092)") && (coteTextInputUni9 >= 65) && (coteTextInputUni9 <= 67)){
		  planProp = 'Plans/E_A1.png'; overProp();  showSearch();
		}else if ((coteTextInput7 === "72(092)") && (coteTextInputUni9 >= 68) && (coteTextInputUni9 <= 77)){
		 planProp = 'Plans/E_B1.png'; overProp();  showSearch();
		}else if ((coteTextInput7 === "72(092)") && (coteTextInputUni9 >= 78) && (coteTextInputUni9 <= 90)){
		 planProp = 'Plans/E_C1.png'; overProp();  showSearch();
//Cotes de 72 à <72.02
		}else if ((coteTextInputIntTrue == 720) && (coteTextInputUni3 != 45) && ((coteTextInputUni3 == 47) || (coteTextInputUni3 == 58) || (coteTextInputUni3 == 40) || (coteTextInputUni3 == 34) || ((coteTextInputUni3 == 46) && (coteTextInputXXDecIntTrue > 0) && (coteTextInputXXDecIntTrue < 20)))){
		 planProp = 'Plans/G_D1.png'; overProp();  showSearch();
//Cotes de 72.02 à <72.03
		}else if ((coteTextInputIntTrue == 720) && (coteTextInputUni3 != 47) && (coteTextInputUni3 != 58) && (coteTextInputUni3 != 45) && (coteTextInputUni3 != 40) && (coteTextInputUni3 != 34) && ((coteTextInputUni3 == 46) && (coteTextInputXXDecIntTrue >= 20) && (coteTextInputXXDecIntTrue < 30))){
		 planProp = 'Plans/G_D1D2.png'; overProp();  showSearch();//G_D1 & G_D2
//Cotes de 72.03 à <72.034
		}else if ((coteTextInputIntTrue == 720) && (coteTextInputUni3 != 47) && (coteTextInputUni3 != 58) && (coteTextInputUni3 != 45) && (coteTextInputUni3 != 40) && (coteTextInputUni3 != 34) && ((coteTextInputUni3 == 46) && (coteTextInputXXDecIntTrue >= 30) && (coteTextInputXXDecIntTrue < 34))){
		 planProp = 'Plans/G_D2.png'; overProp();  showSearch();
//Cotes de 72.034 à <72.038
		}else if ((coteTextInputIntTrue == 720) && (coteTextInputUni3 != 47) && (coteTextInputUni3 != 58) && (coteTextInputUni3 != 45) && (coteTextInputUni3 != 40) && (coteTextInputUni3 != 34) && ((coteTextInputUni3 == 46) && (coteTextInputXXDecIntTrue >= 34) && (coteTextInputXXDecIntTrue < 38))){
		  planProp = 'Plans/G_E1.png'; overProp();  showSearch();
//Cotes de 72.038 à <72.04
		}else if ((coteTextInputIntTrue == 720) && (coteTextInputUni3 != 47) && (coteTextInputUni3 != 58) && (coteTextInputUni3 != 45) && (coteTextInputUni3 != 40) && (coteTextInputUni3 != 34) && ((coteTextInputUni3 == 46) && (coteTextInputXXDecIntTrue >= 38) && (coteTextInputXXDecIntTrue < 40))){
		 planProp = 'Plans/G_E2.png'; overProp();  showSearch();
//Cotes de 72.04 à <725.7
		}else if ((coteTextInputIntTrue == 720) && (coteTextInputUni3 != 47) && (coteTextInputUni3 != 58) && (coteTextInputUni3 != 40) && (coteTextInputUni3 != 34) && ((coteTextInputUni3 == 45) || ((coteTextInputUni3 == 46) && (coteTextInputXXDecIntTrue >= 40) && (coteTextInputXXDecIntTrue < 1000)))
		|| ((coteTextInputIntTrue > 720) && (coteTextInputIntTrue < 725))
		|| ((coteTextInputIntTrue == 725) && (coteTextInputUni4 != 45) && ((coteTextInputUni4 == 47) || (coteTextInputUni4 == 58) || (coteTextInputUni4 == 40) || (coteTextInputUni4 == 34) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue > 0) && (coteTextInputXXXDecIntTrue < 700))))){
		planProp = 'Plans/G_F1.png'; overProp();  showSearch();
//Cotes de 725.7 à <725.8
		}else if ((coteTextInputIntTrue == 725) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 45) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 700) && (coteTextInputXXXDecIntTrue < 800))){
		planProp = 'Plans/G_F1F2.png'; overProp(); showSearch(); //G_F1 & G_F2
//Cotes de 725.8 à <728.1
		}else if ((coteTextInputIntTrue == 725) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 45) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 40) && (coteTextInputXXXDecIntTrue < 1000)))
		|| ((coteTextInputIntTrue > 725) && (coteTextInputIntTrue < 728))
		|| ((coteTextInputIntTrue == 728) && (coteTextInputUni4 != 45) && ((coteTextInputUni4 == 47) || (coteTextInputUni4 == 58) || (coteTextInputUni4 == 40) || (coteTextInputUni4 == 34) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue > 0) && (coteTextInputXXXDecIntTrue < 100))))){
		planProp = 'Plans/G_F2.png'; overProp();  showSearch();
//Cotes de 728.1 à <728.4
		}else if ((coteTextInputIntTrue == 728) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 45) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 100) && (coteTextInputXXXDecIntTrue < 400))){
		planProp = 'Plans/G_G1.png'; overProp();  showSearch();
//Cotes de 728.4 à <75
		}else if (((coteTextInputIntTrue == 728) && (coteTextInputUni4 != 47) && (coteTextInputUni4 != 58) && (coteTextInputUni4 != 40) && (coteTextInputUni4 != 34) && ((coteTextInputUni4 == 45) || ((coteTextInputUni4 == 46) && (coteTextInputXXXDecIntTrue >= 400) && (coteTextInputXXXDecIntTrue < 1000))))
		|| ((coteTextInputIntTrue > 728) && (coteTextInputIntTrue < 750))){
		planProp = 'Plans/G_G2.png'; overProp();  showSearch();
//Cotes de 750 à <800
		}else if ((coteTextInputIntTrue < 800) && (coteTextInputIntTrue >= 750)){
		planProp = 'Plans/G_H1.png'; overProp();  showSearch();
//Cotes de 800 à <940
		}else if ((coteTextInputIntTrue < 940) && (coteTextInputIntTrue >= 800)){
		planProp = 'Plans/E_D1.png'; overProp();  showSearch();
//Cotes de 940 à <1000
		}else if ((coteTextInputIntTrue < 1000) && (coteTextInputIntTrue >= 940)){
		 planProp = 'Plans/E_D2.png'; overProp();  showSearch();
		}else {alert("Erreur. isLivre = "+document.getElementById(isLivre).checked+" mais aucun résultat ne correspond (cote rentrée ="+memoryCoteText+"). Contactez un documentaliste"); errorAlert();};

//Analyse cote SI c'est un DVD

	}else if(document.getElementById(isDvd).checked == true) {
//Cotes en salle CDU
		if ((coteTextInputIntTrue < 712) && (coteTextInputIntTrue > 0)) {
		 planProp = 'Plans/B_A1.png'; overProp();  showSearch();
		}else if ((coteTextInputIntTrue >= 712) && (coteTextInputIntTrue < 1000)) {
		 planProp = 'Plans/B_B1.png'; overProp(); showSearch();
//Autres cotes irrégulières
		}else if (coteText.indexOf("PASSAGES") > -1){
		 stockAnsI = 3; stockVar();
		}else if ((coteText.indexOf("DVD ") > -1)) {
		 stockAnsI = 2;stockVar();
		}else if ((coteText.indexOf("CD ") > -1)) {
		 stockAnsI = 2;stockVar();
		}else if ((coteText.indexOf("DV_") > -1)) {
		 stockAnsI = 2;stockVar();
		}else if ((coteText.indexOf("BUREAU") > -1)) {
		 stockAnsI = 2;stockVar();
		}else if (coteText.indexOf("EN LIGNE") > -1){
		 stockAnsI = 1; stockVar();
		}else {alert("Erreur. isDvd = "+document.getElementById(isMag).checked+" mais aucun résultat ne correspond (cote rentrée ="+memoryCoteText+"). Contactez un documentaliste"); errorAlert();};
	}else {alert("Erreur. isMag = "+document.getElementById(isMag).checked+", isSalle = "+document.getElementById(isSalle).checked+", isDvd = "+document.getElementById(isDvd).checked+", isLivre = "+document.getElementById(isLivre).checked+". Contactez un documentaliste"); errorAlert();};

//Réponse si coteTexte n'est ni plein ni vide (ce qui ne devrait pas arriver)
	 }else {alert("Erreur. Valeur de Schrödinger. CoteTextX est ni vide ni plein ("+coteTextX+"). Contactez un documentaliste.");
	 
//Fin de la détection de si le champ est vide ou non
	 };

//Fin de la boucle analysant chaque valeur saisie 
 };

//Fonction d'analyse des documents provoquant un choix
 function problemCote() {
	  setTimeout(function() {$(".imgChoix").hide(); divChoix.dialog('open');
//Compteur
	 var planSearchChoixX = 'planSearchChoix' + stockChoixVar;
	 coteText = document.getElementById(planSearchChoixX).innerHTML;
	 $('#coteChoixShow').html(coteText);
//Partie dédiée à l'analyse
//Si c'est une cote salle1 - hors format
	if ((coteText.indexOf("72.033(038) VIO") > -1) || (coteText.indexOf("712.2.036 ALP") > -1) || (coteText.indexOf("712.2.035 BES") > -1)
	|| (coteText.indexOf("72(092) CAL-JOD") > -1) || (coteText.indexOf("72(092) COO") > -1) || (coteText.indexOf("72(092) MEI-JOD") > -1)
	|| (coteText.indexOf("72(092) WRI-PFE") > -1) || (coteText.indexOf("72(092) SIZ-JOD") > -1)){
	 salle1.show(); horsformat.show();
//Si ce n'est pas un document provoquant un choix
//(N'est pas supposé s'activer puisque pour accéder à cette partie du script il faut avoir été détecté comme étant un de ces documents)
//(Si ce message d'erreur apparait, le document en question a été signalé comme provoquant un choix (dans la partie analyse des données entrées),
//mais aucune réponse ne lui a été paramétré dans cette fonction)
	}else {alert("Erreur. Pas une cote à problème enregistrée ("+coteText+"). Contactez un documentaliste.")};
//Fin du setTimeout
 }, 1);
//Fin de la fonction problemCote()
 };
 
 
//Analyse les données saisies si Salle 1 a été sélectionné
 salle1.click(function(){
	 if (coteText.indexOf("72.033(038) VIO") > -1){
		planProp = 'Plans/G_D2.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else if ((coteText.indexOf("712.2.036 ALP") > -1) || (coteText.indexOf("712.2.035 BES") > -1)){
		planProp = 'Plans/G_C2.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else if ((coteText.indexOf("72(092) CAL-JOD") > -1) || (coteText.indexOf("72(092) COO") > -1)){
		planProp = 'Plans/E_A1.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else if ((coteText.indexOf("72(092) WRI-PFE") > -1) || (coteText.indexOf("72(092) SIZ-JOD") > -1)){
		planProp = 'Plans/E_C1.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else if (coteText.indexOf("72(092) MEI-JOD") > -1){
		planProp = 'Plans/E_B1.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else {alert('Erreur. Pas une cote à problème en salle ('+coteText+'). Contactez un documentaliste.')};
 });
	
//Analyse les données saisies si Hors Format a été sélectionné
 horsformat.click(function(){
	 if ((coteText.indexOf("72.033(038) VIO") > -1) || (coteText.indexOf("712.2.036 ALP") > -1) || (coteText.indexOf("712.2.035 BES") > -1)){
		planProp = 'Plans/F_B1.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else if ((coteText.indexOf("72(092) CAL-JOD") > -1) || (coteText.indexOf("72(092) COO") > -1)
		|| (coteText.indexOf("72(092) WRI-PFE") > -1) || (coteText.indexOf("72(092) SIZ-JOD") > -1)
		|| (coteText.indexOf("72(092) MEI-JOD") > -1)){
		planProp = 'Plans/F_table.png'; overProp(); divChoix.dialog('close'); problemCoteIf();
	}else {alert('Erreur. Pas une cote à problème hors format ('+coteText+'). Contactez un documentaliste.')};
 });
 
//Fonction rouvrant la pop-up de choix si nécessaire
 function problemCoteIf() {
	 if (stockChoixVar > 0) {
		 setTimeout(function() {divChoix.dialog('open');}, 1);
	 };
 };
 
//Affichage des résultats

//Affichage des erreurs en arrière-plan s'il y a eu au moins une erreur
	if (errorStock > 0) {
	  $('#errorCotes').html(errorCoteText);
	  $('#errorLine').show();
	};
	
//Affichage du bouton pour passer du plan aux réponses sans plan (si elles existent)
		if (stock > 1){
			$('#notPlanButton').show();
		 };

//Affichage du bouton pour passer des réponses sans plan au plan (si des réponses l'affichent)
		 if ($('#over1').length != 0){
			$('#planButton').show();
		 };

//Affichage de la pop-up de choix
	if (stockChoixVar > 0 ){
		problemCote();
//Affichage de la pop-up du plan
	}else if ($('#over1').length == 1) {
		divImgPlan.show(); divPlan.dialog('open');
//Affichage de la pop-up des réponses sans plan
	}else if(($('#over1').length == 0) && (stock > 1)){
		$("#divNotPlan").dialog('open');
	};
 
//Fonctions permettant d'alterner entre la pop-up du plan et celle des réposnes sans plans
 $('#planButton').click(function(){setTimeout(function() {$("#divNotPlan").dialog('close'); divPlan.dialog('open');}, 1);});
 $('#notPlanButton').click(function(){setTimeout(function() {divPlan.dialog('close'); $("#divNotPlan").dialog('open');}, 1);});
  
//Remise à zéro de l'interface 
 resetUI();

//Fin de la vérification de si toute sles zones de saisies de textes sont vides
 }else {alert("Erreur. getCoteTextY = '' ("+getCoteTextY+"). Contactez un documentaliste.")};

//Fin de la fonction lancée par un clic sur le boutton Recherchez
 })
 
//Fin du $('document').ready
});
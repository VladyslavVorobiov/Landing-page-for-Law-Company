$( document ).ready(main);


function main(){

	initOptionChangeLanguage();
	createOpacityHeaderScrolled();
	sendConsultationRequest();

}

function initOptionChangeLanguage(){
	
	let optionChangeLanguage = $("#langChange option");

	optionChangeLanguage.on("click" , function(event){

		changeLanguageAllText();
	});

}

function changeLanguageAllText(){

	let currentLocation = document.URL,
		language = $("#langChange :selected").text();

	switch(language){

		case "UKR":
			if(currentLocation.includes("index.html")) break;
			document.location.href = "index.html";
			break;

		case "ENG":
			if(currentLocation.includes("indexENG.html")) break;
			document.location.href = "indexENG.html";
			break;

		case "RUS":
			if(currentLocation.includes("indexRUS.html")) break;
			document.location.href = "indexRUS.html";
			break;
	}		

}

function createOpacityHeaderScrolled(){
	
	let windowBrowser = $(window),
		header = $("header");

	windowBrowser.on("scroll", function(event){

		if (header.offset().top){
			header.removeClass("headerOpacityNo");
			header.addClass("headerOpacityMiddle");
		} 
		else header.addClass("headerOpacityNo");
		
	});
	
}

function sendConsultationRequest(){

	let buttonSendReguest = $("#buttonSendRequest");
		
		buttonSendReguest.on("click", function (event){
			event.preventDefault();
			
			let formData = new FormData(document.forms[0]),
				xhr = new XMLHttpRequest();
			
			xhr.open("POST","serverCode.php");
			xhr.send(formData);

			xhr.onloadend = function(){
				
				let isSuccessServerResponse = (xhr.status == 200) ? true:false;
				
				displayAnswerToClient(isSuccessServerResponse);
			}; 
	});

}

function displayAnswerToClient(isSuccessServerResponse){

	let successfulAnswers = new Map(),
		unsuccessfulAnswers = new Map();

		
		fillMapAnswers();
		openDialogWindow();
		addAnswerToWindow();

		let okButtonDivAnswerRequest = $("#okButtonDivAnswerRequest");

		okButtonDivAnswerRequest.on("click",function(event){
			closeDialogWindow();
		});


function fillMapAnswers(){
	successfulAnswers.set("RUS", "Спасибо за Ваше обращение. Мы свяжемся с Вами в ближайшее время.");
	successfulAnswers.set("ENG", "Thank You for Your request. We will contact You soon.");
	successfulAnswers.set("UKR", "Дякуємо за Ваше звернення. Ми зв'яжемося з Вами найближчим часом.");
	
	unsuccessfulAnswers.set("RUS", "Из-за технических неполадок Ваше обращение не доставлено. Попробуйте отправить запрос через некоторое время либо набрать нас по телефону.");
	unsuccessfulAnswers.set("ENG", "Due to technical problems, Your request was not delivered. Try sending a request after a while or dial us by phone.");
	unsuccessfulAnswers.set("UKR", "Через технічні неполадки Ваше звернення не було доставлено. Спробуйте відправити запит через деякий час або набрати нас по телефону.");
}

function openDialogWindow(){
	
	let divAnswerRequest = $("#ConsultationRequest").find(".divAnswerRequest");		
		divAnswerRequest.removeClass("divAnswerRequest");
		divAnswerRequest.addClass("coverDivAnswerRequest");

		$("body").addClass("modal-open");
}

function addAnswerToWindow(){

	let language = $("#langChange :selected").text();

	if (isSuccessServerResponse){
		$("#divAnswerClient").children().before(`<p>${successfulAnswers.get(language)}</p>`);

	} else {

		$("#divAnswerClient").children().before(`<p>${unsuccessfulAnswers.get(language)}</p>`);
	}
	
}

function closeDialogWindow(){

	$("#divAnswerClient").children().remove("p");
	
	let divAnswerRequest = $("#ConsultationRequest").find(".coverDivAnswerRequest");
		divAnswerRequest.removeClass("coverDivAnswerRequest");
		divAnswerRequest.addClass("divAnswerRequest");
		$("body").removeClass("modal-open");
	
}

}


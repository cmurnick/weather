"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');


let forecast = [];

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter'){
			let searchText = $('#searchBar').val();
			let zip = searchText;
			tmdb.searchOWM(zip);
			
		}

	});
};

const submitButton = () => {
	$("#submitButton").click(() => {
		let searchText = $('#searchBar').val();
		let zip = searchText;
		tmdb.searchOWM(zip);
		
	});

};


const fiveDayForecast = () => {
	$("#five").click(() => {
		console.log("works");
		let searchText = $('#searchBar').val();
		let zip = searchText;
		let days = 5;
		tmdb.getForecast(zip, days).then((results) => {
		dom.fiveForecast(results, days);
	}).catch((error) => {
		console.log("error in getConfig from fiveDayForecast", error);
	});
	});
};

const threeDayForecast = () => {
		$("#three").click(() => {
		let searchText = $('#searchBar').val();
		let zip = searchText;
		let days = 3;
		tmdb.getForecast(zip, days).then((results) => {
		dom.fiveForecast(results, days);
	}).catch((error) => {
		console.log("error in getConfig from fiveDayForecast", error);
	});
	});
};

const googleAuth = () => {
	$('#googleButton').click((e) =>{
		firebaseApi.authenticateGoogle().then().catch((err) =>{
			console.log("error in authenticateGoogle", err);
		});
	});
	// showFrontPage();
};

const createUser = () => {
	$('#createAccount').click((e) => {
		firebaseApi.authenticateEmail().then().catch((err) =>{
			console.log("error in authenticateEmail", err);
  // var errorCode = error.code;
  // var errorMessage = error.message;
  // ...
});
	});
};

const signInUser = () => {
	$('#signIn').click((e) => {
		firebaseApi.authenticateSignIn().then().catch((err) =>{
			console.log("error in signin", err);
  // var errorCode = error.code;
  // var errorMessage = error.message;
  // ...
		});
		
	});
	
};


const showFrontPage = () => {
	$('body').on('click', '#authScreen', () => {
			// if (googleAuth === true) {
			// 	console.log("fuckign works!!!!");
			$('#frontZipBox').removeClass("hide");
			$('#frontSubmitBox').removeClass("hide");
			$('#frontDayForcastButtons').removeClass("hide");
			$('#emlPswd').addClass('hide');
			$('#authScreen').addClass("hide");
	});
};




const savedForecasts = () => {
	$('body').on('click', '.weatherHolder', (e) => {
		let weather = e.target.closest('dom.savedWeatherForecasts');

		let newWeather = {
			"date": $(weather).find('.date').html(),
			"temp": $(weather).find('.temp').html(),
			"wind speed": $(weather).find('.conditions').html(),
			"pressure": $(weather).find('.airPressure').html(),
			"isWatched": $(weather).find('.wind').html(),
			"Uid": ""
		};

		firebaseApi.saveWeather(newWeather).then(() =>{
			$(weather).remove();
		}).catch((err) =>{
			console.log("error in weather saving", err);
		});
	});
};

const showSavedWeather = () => {
	$('body').on('click', '#authenticate', () => {
			$('#frontZipBox').addClass("hide");
			$('#frontSubmitBox').addClass("hide");
			$('#frontDayForcastButtons').addClass("hide");
			$('#emlPswd').addClass('hide');
			$('#authScreen').addClass("hide");
			$('#localWeather').addClass("hide");
			$('#futureForecast').removeClass('hide');
	});
};

const init = () =>{
	pressEnter();
	submitButton();
	fiveDayForecast();
	threeDayForecast();
	googleAuth();
	createUser();
	signInUser();
	showFrontPage();
	savedForecasts();	
	showSavedWeather();
};

module.exports = {init};


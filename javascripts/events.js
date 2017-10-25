"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');

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

module.exports = {pressEnter, submitButton, fiveDayForecast, threeDayForecast};

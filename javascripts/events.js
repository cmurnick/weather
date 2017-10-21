"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter'){
			let searchText = $('#searchBar').val();
			let zip = searchText;
			tmdb.searchOWM(zip);
			tmdb.forecastConfiruguration(zip);
		}

	});
};

const submitButton = () => {
	$("#submitButton").click(() => {
		let searchText = $('#searchBar').val();
		let zip = searchText;
		tmdb.searchOWM(zip);
		tmdb.forecastConfiruguration(zip);
	});

};


const fiveDayForecast = () => {
	$("#five").click(() => {
		console.log("fuck");
		let searchText = $('#searchBar').val();
		let zip = searchText;
		console.log("zip");
		dom.fiveForecast();

	});
};



module.exports = {pressEnter, submitButton, fiveDayForecast};

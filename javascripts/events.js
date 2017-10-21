"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');

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
		tmdb.getForecast(zip).then((results) => {
		console.log(results);
		dom.fiveForecast(results);
	}).catch((error) => {
		console.log("error in getConfig from fiveDayForecast", error);
	});
		console.log("zip");
		

	});
};



module.exports = {pressEnter, submitButton, fiveDayForecast};

"use strict";

let owmKey;


const dom = require('./dom');

let now = [];
let forecast = [];

const searchOWM = (zip) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			resolve(data.name, data.main.temp, data.weather[0].main, data.main.pressure, data.wind.speed);
			let names = {
				name: data.name,
				temp: data.main.temp,
				conditions: data.weather[0].main,
				pressure: data.main.pressure,
				wind: data.wind.speed				 
			};
			now.push(names);
			showResults(now);
			console.log(now);
		}).fail((error) => {
			reject(error);
		});
	});
};

const getForecast = (zip) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast/?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			resolve(data.list);
			console.log(data.list);
		}).fail((error) => {
			reject(error);
		});
	});
};

// const getConfig = () => {
// 	forecastConfiruguration().then((results) => {
// 		forecast = results;
// 		console.log(forecast);
// 	}).catch((error) => {
// 		console.log("error in getConfig", error);
// 	});
// };

// const searchWeather = (zip) => {
// 	searchOWM(zip).then ((data) => {
// 		showResults(data);
// 	}).catch((error) => {
// 		console.log("error in search weather", error);
// 	});
// };

const setKey = (apiKey) => {
	owmKey = apiKey;
	console.log(owmKey);
	// getConfig();
};

const showResults = (weatherArray) => {
	dom.clearDom();
 	dom.domString(weatherArray);
};


module.exports = {setKey, searchOWM, getForecast};






(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve (data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		tmdb.setKey(results.tmdb.apiKey);
	}).catch((error) => {
		console.log('error in retrieve keys', error);
	});
};

module.exports = {retrieveKeys};
},{"./tmdb":5}],2:[function(require,module,exports){
"use strict";

// Temperature
// Conditions
// Air pressure
// Wind speed
// An affordance to view the forecast for the current day, the next three days, or the next 7 days

const domString = (weatherArray) => {
	let domString = '';
	let t = 0;
	for(let i =0; i < weatherArray.length; i++) {
		if (i % 3 === 0){
			domString += `<div class ="row">`;
		}
		
	  	domString += `<div class="col-sm-6 col-md-4">`;
	    domString += 	`<div class="thumbnail">`;
	//     domString +=	  `<img src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}"
 // alt="">`;
	    domString +=  `<div class="caption">`;
	    domString +=    `<h3>${weatherArray[i].name}</h3>`;
	    domString +=    `<p>${weatherArray[i].temp}</p>`;
	   	domString +=    `<p>${weatherArray[i].conditions}</p>`;
	    domString +=    `<p>${weatherArray[i].pressure}</p>`;
	    domString +=    `<p>${weatherArray[i].wind}mph</p>`;

	    domString +=    `<p><a href="#" class="btn btn-primary" role="button">3 day forecast</a> <a href="#" class="btn btn-default" role="button">5 day forecast</a></p>`;
	    domString +=  		`</div>`;
	  	domString +=  `</div>`;
		domString += `</div>`;
		
	}

		printToDom(domString);
};

const printToDom = (strang) => {
	$("#localWeather").append(strang);
};

const clearDom = () => {
	$('#localWeather').empty();
};


module.exports = {domString, clearDom};
},{}],3:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');

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
		
	});

};


// document.getElementById('numbersonly').addEventListener('keydown', function(e) {
//     var key   = e.keyCode ? e.keyCode : e.which;

//     if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
//          (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
//          (key >= 35 && key <= 40) ||
//          (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
//          (key >= 96 && key <= 105)
//        )) e.preventDefault();
// });

module.exports = {pressEnter, submitButton};

},{"./tmdb":5}],4:[function(require,module,exports){

"use strict";

// let dom = require('./dom');
let tmdb = require('./tmdb');
let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();

// $(document).click(() => {
// 	tmdb.searchOWM(60439);
// });


events.pressEnter();
events.submitButton();
},{"./apiKeys":1,"./events":3,"./tmdb":5}],5:[function(require,module,exports){
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

const forecastConfiruguration = (zip) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${owmKey}&units=imperial`).done((data) => {
			resolve(data.list);
			// let future = {
			// 	date: data.forecast[0].list
			// };
			// forecast.push(future);
			// console.log(forecast);
			// forecast.time.from.getDay(0) and then (2)
			console.log(data.list);
		}).fail((error) => {
			reject(error);
		});
	});
};

// const getConfig = () => {
// 	tmdbConfiruguration().then((results) => {
// 		imgConfig = results;
// 		console.log(imgConfig);
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


module.exports = {setKey, searchOWM, forecastConfiruguration};






},{"./dom":2}]},{},[4]);

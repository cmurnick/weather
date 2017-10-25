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

// const tmdb = require('./tmdb');
// Temperature
// Conditions
// Air pressure
// Wind speed
// An affordance to view the forecast for the current day, the next three days, or the next 7 days

const domString = (weatherArray) => {
	let domString = '';
	
	for(let i =0; i < weatherArray.length; i++) {
		// if (i % 3 === 0){
			domString += `<div class ="row">`;
		// }
		
	  	domString += `<div class="col-md-4 col-md-offset-4">`;
	    domString += 	`<div class = "thumbnail">`;
	//     domString +=	  `<img src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}"
 // alt="">`;
	    domString +=  `<div class="caption">`;
	    domString +=    `<h3>${weatherArray[i].name}</h3>`;
	    domString +=    `<p>${weatherArray[i].temp}</p>`;
	   	domString +=    `<p>${weatherArray[i].conditions}</p>`;
	    domString +=    `<p>${weatherArray[i].pressure}</p>`;
	    domString +=    `<p>${weatherArray[i].wind}mph</p>`;
	    domString +=  	`</div>`;
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

const printToDom2 = (strang) => {
	$("#futureForecast").append(strang);
};

const fiveForecast = (forecastArray) => {
	console.log(forecastArray[0].dt_txt);
// 	console.log("from dom", forecastArray.length);
// 	let forString = '';
	
	for(let i = 0; i < forecastArray.length; i += 9) {
		console.log(forecastArray[i].dt_txt);
// 		forecastArray[i].dt_txt
		}

				
		// forString += `<div class="col-sm-6 col-md-4 ">`;
	 //    forString += 	`<div class="thumbnail">`;  
	 //    forString +=  		`<div class="caption">`;
	 //    forString += 			`<p>${forecastArray[i].dt_txt}</p>`;
	 //    forString += 		 `</div>`;
	 //    forString +=  	`</div>`;
	 //    forString +=  `</div>`;
	  	
	//     forString +=    `<p>${t}</p>`;
	//     forString +=  `</div>`;
	//     forString +=  `</div>`;
	// // }
	  	// forString +=  `</div>`;
	 //  	if (i % 3 === 2 || i === forecastArray.length -1) {
		// forString += `</div>`;

// }
			
		
// 	}
// 		printToDom2(forString);
// 		console.log(forString);

};









module.exports = {domString, clearDom, fiveForecast};
},{}],3:[function(require,module,exports){
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
		
		tmdb.getForecast(zip).then((results) => {
		// console.log(results);
		// let newForecast = {
		// 	"date": '',
		// 	"temp":''
		// };

		

			console.log(results);
		dom.fiveForecast(results);
	}).catch((error) => {
		console.log("error in getConfig from fiveDayForecast", error);
	});
		
		

	});
};



module.exports = {pressEnter, submitButton, fiveDayForecast};

},{"./dom":2,"./tmdb":5}],4:[function(require,module,exports){

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
events.fiveDayForecast();
},{"./apiKeys":1,"./events":3,"./tmdb":5}],5:[function(require,module,exports){
"use strict";

let owmKey;


const dom = require('./dom');

let now = [];

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
			

			// var dict = product;
			// for(var key in dict) {
			// 	// console.log(key);
			// 	products.push(dict[key]);

			// }

			// console.log(forecast);
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






},{"./dom":2}]},{},[4]);

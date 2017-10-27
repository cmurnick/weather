(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');


const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve (data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

// const retrieveKeys = () => {
// 	apiKeys().then((results) => {
// 		tmdb.setKey(results.tmdb.apiKey);
// 	}).catch((error) => {
// 		console.log('error in retrieve keys', error);
// 	});
// };

const retrieveKeys = () => {
  apiKeys().then((results) => {
    tmdb.setKey(results.tmdb.apiKey);
    firebaseApi.setKey(results.firebaseKeys);
    firebase.initializeApp(results.firebaseKeys);
  }).catch((error) => {
    console.log("error in retrieve keys", error);
  });
};



module.exports = {retrieveKeys};
},{"./firebaseApi":4,"./tmdb":6}],2:[function(require,module,exports){
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

const fiveForecast = (forecastArray, days) => { console.log(forecastArray, days);
	console.log(forecastArray);
// 	console.log("from dom", forecastArray.length);
	let forString = '';
	var stop = 40;

	if (days === 3 ) {
		stop = 32;
	}
	for(let i = 8; i < stop; i=i+8) {
		console.log(forecastArray[i].dt_txt.slice(0, 10));
// 		forecastArray[i].dt_txt
						
		forString += `<div class="col-sm-6 col-md-4 ">`;
	    forString += 	`<div class="thumbnail">`;  
	    forString +=  		`<div class="caption">`;
	    forString += 			`<p>${forecastArray[i].dt_txt.slice(0, 10)}</p>`;
	    forString += 			`<p>Temp: ${forecastArray[i].main.temp} degrees</p>`;
	    forString += 			`<p>Conditions: ${forecastArray[i].weather[0].main}</p>`;
	    forString += 			`<p>Pressure: ${forecastArray[i].main.pressure}</p>`;
	    forString +=			`<p>Wind:${forecastArray[i].wind.speed} mph</p>`;
	    forString += 		 `</div>`;
	    forString +=  	`</div>`;
	    forString +=  `</div>`;
	    // forString +=  `</div>`;
	 }
	
		printToDom2(forString);
		console.log(forString);

};









module.exports = {domString, clearDom, fiveForecast};
},{}],3:[function(require,module,exports){
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

const init = () =>{
	pressEnter();
	submitButton();
	fiveDayForecast();
	threeDayForecast();
	googleAuth();
	createUser();
	signInUser()
;	
};

module.exports = {init};

},{"./dom":2,"./firebaseApi":4,"./tmdb":6}],4:[function(require,module,exports){
"use strict";

let firebaseKey = "";
let userUid = "";

const setKey = (key) =>{
	firebaseKey = key;

};

// console.log("firebase apps?", firebase.apps);


//Firebase: GOOGLE - Use input credentials to authenticate user.
let authenticateGoogle = () => {
	return new Promise((resolve, reject) => {
	  var provider = new firebase.auth.GoogleAuthProvider();
	  firebase.auth().signInWithPopup(provider)

	    .then((authData) => {
	    	userUid = authData.user.uid;
	        resolve(authData.user);
	        console.log("does this shit work", authData);
	    }).catch((error) => {
	        reject(error);
	    });
	});
};

let authenticateEmail = () => {
	let email = $("#emailInput").val();
	let password = $("#passwordInput").val();
	let createUserWithEmailAndPassword = (email, password);

	return new Promise((resolve, reject) => {
	  var provider = new firebase.auth().createUserWithEmailAndPassword(email, password);
	  firebase.auth().signInWithEmailAndPassword(email,password)

	    .then((authData) => {
	    	userUid = authData.user.uid;
	        resolve(authData.user);
	        console.log("does this email shit work", authData);
	    }).catch((error) => {
	        reject(error);
	    });
	});
};

let authenticateSignIn = () => {
	let email = $("#emailInput").val();
	let password = $("#passwordInput").val();
	let signInWithEmailAndPassword = (email, password);

	return new Promise((resolve, reject) => {
	  var provider = new firebase.auth().signInWithEmailAndPassword(email, password);
	  firebase.auth().signInWithEmailAndPassword(email,password)

	    .then((authData) => {
	    	userUid = authData.user.uid;
	        resolve(authData.user);
	        console.log("does this email shit work", authData);
	    }).catch((error) => {
	        reject(error);
	    });
	});
};

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

module.exports = {setKey, authenticateGoogle, authenticateEmail, authenticateSignIn};

},{}],5:[function(require,module,exports){

"use strict";

// let dom = require('./dom');
let tmdb = require('./tmdb');
let events = require('./events');
let apiKeys = require('./apiKeys');
let firebaseApi = require('./firebaseApi');

apiKeys.retrieveKeys();


events.init();

},{"./apiKeys":1,"./events":3,"./firebaseApi":4,"./tmdb":6}],6:[function(require,module,exports){
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






},{"./dom":2}]},{},[5]);

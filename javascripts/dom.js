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

const fiveForecast = (forecastArray) => {
	console.log("from dom", forecastArray.length);
	let forString = '';
	// let t = 0;
	for(let i =0; i < forecastArray.length; i++) {
		// console.log("from for loop",);
		

		if (i % 3 === 0){
			forString += `<div class ="row">`;
		}		
		
	  	forString += `<div class="col-sm-6 col-md-4">`;
	    forString += 	`<div class="thumbnail">`;  
	    forString +=  `<div class="caption">`;
	    // forString +=    `<h3>${forecastArray[i].main.temp}</h3>`;
	    forString +=    `<p>${forecastArray[i].weather[0].main}</p>`;
	    forString +=  `</div>`;
	    forString += 	`</div>`;
	  	forString +=  `</div>`;
	  	if (i % 3 === 2 || i === forecastArray.length -1) {
		forString += `</div>`;

			
		}
	}
	// 	// printToDom2(domString);
		console.log(forString);

};









module.exports = {domString, clearDom, fiveForecast};
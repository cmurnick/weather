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
	for(let i = 0; i < stop; i=i+9) {
		console.log(forecastArray[i].dt_txt.slice(0, 10));
// 		forecastArray[i].dt_txt
		// if(i % 3 === 0) {
		// 	forString += `<div class="row">`;
		// }
		forString += `<div class="col-sm-6 col-md-4 savedWeatherForecasts">`;
	    forString += 	`<div class="thumbnail">`;  
	    forString +=  		`<div class="caption">`;
	    forString += 			`<p class="date">${forecastArray[i].dt_txt.slice(0, 10)}</p>`;
	    forString += 			`<p class="temp">Temp: ${forecastArray[i].main.temp} degrees</p>`;
	    forString += 			`<p class="conditions">Conditions: ${forecastArray[i].weather[0].main}</p>`;
	    forString += 			`<p class="airPressure">Pressure: ${forecastArray[i].main.pressure}</p>`;
	    forString +=			`<p class="wind">Wind:${forecastArray[i].wind.speed} mph</p>`;
	    forString += 		 	`<p >`;
	    forString +=				`<button type="button" class="weatherHolder btn btn-primary btn-xs">Save Forecast</button>`;
	    forString +=		 	`</p>`;
	    forString +=  	`</div>`;
	    forString +=  `</div>`;
	    forString +=  `</div>`;
	    // forString += `</div>`;
	 }
	
		printToDom2(forString);
		console.log(forString);

};









module.exports = {domString, clearDom, fiveForecast};
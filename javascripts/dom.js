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
	let forString = '';
	
	for(let i = 0; i < forecastArray.length; i += 8) {
		console.log(forecastArray[i].dt_txt.slice(0, 10));
// 		forecastArray[i].dt_txt
						
		forString += `<div class="col-sm-6 col-md-4 ">`;
	    forString += 	`<div class="thumbnail">`;  
	    forString +=  		`<div class="caption">`;
	    forString += 			`<p>${forecastArray[i].dt_txt.slice(0, 10)}</p>`;
	    forString +=			`<p>${forecastArray[i].main.temp}</p>`;
	    forString += 		 `</div>`;
	    forString +=  	`</div>`;
	    forString +=  `</div>`;
	    // forString +=  `</div>`;
	 }
	
		printToDom2(forString);
		console.log(forString);

};









module.exports = {domString, clearDom, fiveForecast};
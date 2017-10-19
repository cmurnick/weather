"use strict";

// Temperature
// Conditions
// Air pressure
// Wind speed
// An affordance to view the forecast for the current day, the next three days, or the next 7 days

const domString = (weatherArray) => {
	let domString = '';
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
	    domString +=    `<p>${weatherArray[i].wind}</p>`;

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
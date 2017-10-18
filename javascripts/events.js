"use strict";

const tmdb = require('./tmdb');

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter'){
			let searchText = $('#searchBar').val();
			let query = searchText.replace(/\s/g, "%20");
			tmdb.searchMovies(query);
		}

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

module.exports = {pressEnter};


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
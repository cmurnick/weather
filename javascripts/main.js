
"use strict";

// let dom = require('./dom');
let tmdb = require('./tmdb');
let events = require('./events');
let apiKeys = require('./apiKeys');
let firebaseApi = require('./firebaseApi');

apiKeys.retrieveKeys();


events.init();

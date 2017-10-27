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

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");
// <<<<<<< HEAD
const successBtn = document.getElementById("success-btn");
const rollNumberSubmit = document.getElementById("roll-number-submit");
const successBox = document.getElementById("success-box");
// =======
// >>>>>>> 89d4e55ed0b076d1abd25ab948ed5884326b0dab

signupBox.classList.add("show");


loginBtn.addEventListener("click", function () {
  loginBox.classList.add("show");
  signupBox.classList.remove("show");
});

signupBtn.addEventListener("click", function () {
  signupBox.classList.add("show");
  loginBox.classList.remove("show");
});
// <<<<<<< HEAD

rollNumberSubmit.addEventListener("click", function () {
	setSuccess();
});

function setSuccess() {
	successBox.classList.add("show");
	successBtn.addEventListener("click", function () {
		successBox.classList.remove("show");
	});
}
// =======
// >>>>>>> 89d4e55ed0b076d1abd25ab948ed5884326b0dab


// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtMTXc3yC2SJFFBKKYYSYZWQ5aMgdSsnA",
    authDomain: "attendance-monitoring-921e0.firebaseapp.com",
    projectId: "attendance-monitoring-921e0",
    storageBucket: "attendance-monitoring-921e0.appspot.com",
    messagingSenderId: "588239257751",
    appId: "1:588239257751:web:4e670270dfd404b46c29d2",
    measurementId: "G-PPP0K02S94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Get a reference to the 'users' node in the database
var labRef = database.ref('labs');

var map = {
	count: 2,
	'25-4-2023': 1,
	'26-4-2023': 0,
	'27-4-2023': 1
};

labRef.child('504').child('10-12').child('students').child('TC173').set(map)

// Attach an event listener to the 'value' event
labRef.on('value', function(snapshot) {
  // Get the data from the snapshot
  var data = snapshot.val();
  
  // Do something with the data
  console.log(data);
});

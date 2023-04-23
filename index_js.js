const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");
<<<<<<< HEAD
const successBtn = document.getElementById("success-btn");
const rollNumberSubmit = document.getElementById("roll-number-submit");
const successBox = document.getElementById("success-box");
=======
>>>>>>> 89d4e55ed0b076d1abd25ab948ed5884326b0dab

signupBox.classList.add("show");


loginBtn.addEventListener("click", function () {
  loginBox.classList.add("show");
  signupBox.classList.remove("show");
});

signupBtn.addEventListener("click", function () {
  signupBox.classList.add("show");
  loginBox.classList.remove("show");
});
<<<<<<< HEAD

rollNumberSubmit.addEventListener("click", function () {
	setSuccess();
});

function setSuccess() {
	successBox.classList.add("show");
	successBtn.addEventListener("click", function () {
		successBox.classList.remove("show");
	});
}
=======
>>>>>>> 89d4e55ed0b076d1abd25ab948ed5884326b0dab

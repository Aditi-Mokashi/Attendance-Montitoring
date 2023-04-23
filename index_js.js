const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");

signupBox.classList.add("show");


loginBtn.addEventListener("click", function () {
  loginBox.classList.add("show");
  signupBox.classList.remove("show");
});

signupBtn.addEventListener("click", function () {
  signupBox.classList.add("show");
  loginBox.classList.remove("show");
});

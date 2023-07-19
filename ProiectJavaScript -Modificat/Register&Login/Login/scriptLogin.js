"use script";
const registerForm = document.querySelector(".register-form");
const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const login = document.querySelector("#login");
const loginWrong = document.querySelector("#loginWrong");
let users = JSON.parse(localStorage.getItem("users"));

login.addEventListener("click", function (e) {
  e.preventDefault();

  let user = users.find((obj) => obj.userName === username.value);
  console.log(user);
  if (username.value === "" || pass.value === "") return;
  if (user.pass === pass.value) {
    localStorage.setItem("authToken", JSON.stringify(user));
    window.location.href = "../Home/Home.html";
  } else {
    loginWrong.innerHTML = "Username or password incorrect";
  }
});

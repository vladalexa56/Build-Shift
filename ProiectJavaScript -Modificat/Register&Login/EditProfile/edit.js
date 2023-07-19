"use strict";
const email = document.querySelector("#email");
const userName = document.querySelector("#username");
const pass = document.querySelector("#password");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const age = document.querySelector("#age");
const edit = document.querySelector("#edit");
const emailWrong = document.querySelector("#emailWrong");
const userWrong = document.querySelector("#userWrong");
const passWrong = document.querySelector("#passWrong");
const firstNWrong = document.querySelector("#firstNWrong");
const lastNWrong = document.querySelector("#lastNWrong");
const ageWrong = document.querySelector("#ageWrong");
const resetContainer = document.querySelector(".reset-pass");
const resetPass = document.querySelector("#reset");
const oldPass = document.querySelector("#oldPass");
const newPass = document.querySelector("#newPass");
const reset = document.querySelector("#resetPass");
const closeBtn = document.querySelector(".close-btn");

let letterCountF = 0;
let letterCountL = 0;

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  user = JSON.parse(localStorage.getItem("authToken")),
  objDate,
  shift,
  index;

let shifts = JSON.parse(localStorage.getItem(user?.userName)) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

welcomeUser.innerHTML = `Hello, ${user?.userName}`;

//Email check
const validChar = "abcdefghijklmnopqrstuvwxyz.0123456789_-".split("");
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let emailArr, emailName, emailDomain;

class NewUser {
  constructor(email, userName, pass, firstName, lastName, age) {
    this.email = email;
    this.userName = userName;
    this.pass = pass;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

const completeFields = function (user) {
  email.value = user.email;
  userName.value = user.userName;
  pass.value = user.pass;
  firstName.value = user.firstName;
  lastName.value = user.lastName;
  age.value = user.age;
};

completeFields(user);

edit.addEventListener("click", function (e) {
  e.preventDefault();

  emailArr = email.value.split("@");
  emailName = emailArr[0];
  emailDomain = emailArr[1];

  emailWrong.innerHTML =
    userWrong.innerHTML =
    passWrong.innerHTML =
    firstNWrong.innerHTML =
    lastNWrong.innerHTML =
    ageWrong.innerHTML =
      "";

  if (email.value === "") {
    emailWrong.innerHTML = "Please provide an email address";
    return;
  }

  if (!email.value.includes("@")) {
    emailWrong.innerHTML = `invalid, doesn't have @ character`;
    return;
  }

  if (emailArr.length !== 2) {
    emailWrong.innerHTML = "Must have just one @";
    return;
  }
  if (emailName.length < 1) {
    emailWrong.innerHTML = "Must be at least one character before @";
    return;
  }
  if (emailDomain.length < 3) {
    emailWrong.innerHTML = "Must be 3 characters after @";
    return;
  }
  if (emailDomain.startsWith(".")) {
    emailWrong.innerHTML = 'domain must include but not start with "."';
    return;
  }

  for (const letter of emailName) {
    if (!validChar.includes(letter)) {
      emailWrong.innerHTML = `invalid characters(${letter}) in name section`;
      return;
    }
  }

  for (const letter of emailDomain) {
    if (!validChar.includes(letter)) {
      emailWrong.innerHTML = `invalid characters(${letter}) in domain section`;
      return;
    }
  }

  if (emailDomain.length - (emailDomain.lastIndexOf(".") + 1) < 3) {
    emailWrong.innerHTML = `invalid, domain's last "." should be 2 characters or more from the end.`;
    return;
  }

  if (userName.value.length < 6) {
    userWrong.innerHTML = "Username must be al leat 6 characters long";
    return;
  }
  if (pass.value.length < 6) {
    passWrong.innerHTML = "Password must be al leat 6 characters long";
    return;
  }
  for (const letter of firstName.value.split("")) {
    if (alphabet.includes(letter.toLowerCase())) letterCountF++;
  }

  if (letterCountF < 2) {
    firstNWrong.innerHTML = "Must including at least 2 letters";
    return;
  }
  for (const letter of lastName.value.split("")) {
    if (alphabet.includes(letter.toLowerCase())) letterCountL++;
  }

  if (letterCountL < 2) {
    lastNWrong.innerHTML = "Must including at least 2 letters";
    return;
  }

  if (!(+age.value >= 18 && +age.value <= 65)) {
    ageWrong.innerHTML = "Age must be between 18 and 65";
    return;
  }

  const userNew = new NewUser(
    email.value,
    userName.value,
    pass.value,
    firstName.value,
    lastName.value,
    age.value
  );

  index = users.findIndex((obj) => obj.userName === user.userName);
  users.splice(index, 1);
  users.push(userNew);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("authToken", JSON.stringify(userNew));
  localStorage.setItem(userNew.userName, JSON.stringify(shifts));
  if (user.userName !== userNew.userName) {
    localStorage.removeItem(user.userName);
  }

  window.location.href = "../Home/Home.html";
});

resetPass.addEventListener("click", function (e) {
  e.preventDefault();
  content.classList.add("blur");
  resetContainer.classList.remove("none");
});

reset.addEventListener("click", function (e) {
  e.preventDefault();

  if (oldPass.value === user.pass) {
    if (newPass.value.length < 6) {
      alert("Password must be al leat 6 characters long");
      return;
    }
    content.classList.remove("blur");
    resetContainer.classList.add("none");
    pass.value = newPass.value;
    const userNew = new NewUser(
      email.value,
      userName.value,
      pass.value,
      firstName.value,
      lastName.value,
      age.value
    );
    index = users.findIndex((obj) => obj.userName === user.userName);
    users.splice(index, 1);
    users.push(userNew);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("authToken", JSON.stringify(userNew));
    localStorage.setItem(userNew.userName, JSON.stringify(shifts));
  } else {
    alert("incorect");
  }
});

closeBtn.addEventListener("click", function (e) {
  content.classList.remove("blur");
  resetContainer.classList.add("none");
});

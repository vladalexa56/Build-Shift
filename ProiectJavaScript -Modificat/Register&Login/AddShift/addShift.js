"use strict";
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  home = document.querySelector("#home"),
  searchBtn = document.querySelector(".searchBtn"),
  fromDate = document.querySelector("#fromDate"),
  toDate = document.querySelector("#toDate"),
  tbody = document.querySelector("#tbody"),
  searchSlug = document.querySelector(".searchSlug"),
  searchText = document.querySelector("#searchText"),
  addShift = document.querySelector("#addShift"),
  startTime = document.querySelector("#startTime"),
  endTime = document.querySelector("#endTime"),
  hourlyWage = document.querySelector("#hourlyWage"),
  workplace = document.querySelector("#workplace"),
  shiftSlug = document.querySelector("#shiftSlug"),
  comments = document.querySelector("#comments"),
  saveBtn = document.querySelector("#save"),
  welcomeUser = document.querySelector("#welcomeUser"),
  closeBtn = document.querySelector(".close-btn");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  user = JSON.parse(localStorage.getItem("authToken")),
  objDate,
  shift;

//Get user shifts
let shifts = JSON.parse(localStorage.getItem(user?.userName)) || [];

const Shift = function (
  date,
  sTime,
  eTime,
  hWage,
  workplace,
  shiftSlug,
  comments,
  totalProfit
) {
  this.date = date;
  this.startTime = sTime;
  this.endTime = eTime;
  this.hourlyWage = hWage;
  this.workplace = workplace;
  this.shiftSlug = shiftSlug;
  this.comments = comments;
  this.totalProfit = totalProfit;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive"></li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday} click">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive"></li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

welcomeUser.innerHTML = `Hello, ${user?.userName}`;

daysTag.addEventListener("click", function (e) {
  if (e.target.classList.contains("click")) {
    document.querySelector(".wrapper").classList.add("none");
    document.querySelector(".shift").classList.remove("none");
    objDate = `${currYear}-${currMonth + 1}-${e.target.innerHTML}`;
  }
});

closeBtn.addEventListener("click", function (e) {
  document.querySelector(".wrapper").classList.remove("none");
  document.querySelector(".shift").classList.add("none");
});

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let existShift = shifts.find((obj) => shiftSlug.value === obj.shiftSlug);

  if (existShift) {
    alert("Already exist this shift");
    return;
  }

  const startHour = new Date(`${objDate} ${startTime.value}`).getHours();
  const endHour = new Date(`${objDate} ${endTime.value}`).getHours();

  const wagePerDay = (endHour - startHour) * +hourlyWage.value;

  shift = new Shift(
    objDate,
    startTime.value,
    endTime.value,
    hourlyWage.value,
    workplace.value,
    shiftSlug.value,
    comments.value,
    wagePerDay
  );

  shifts.push(shift);
  localStorage.setItem(user.userName, JSON.stringify(shifts));

  startTime.value =
    endTime.value =
    hourlyWage.value =
    workplace.value =
    shiftSlug.value =
    comments.value =
      "";
  document.querySelector(".wrapper").classList.remove("none");
  document.querySelector(".shift").classList.add("none");
});

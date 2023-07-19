import * as helpers from "../../funtions.js";
const searchBtn = document.querySelector(".searchBtn"),
  fromDate = document.querySelector("#fromDate"),
  toDate = document.querySelector("#toDate"),
  tbody = document.querySelector("#tbody"),
  searchSlug = document.querySelector(".searchSlug"),
  searchText = document.querySelector("#searchText"),
  startTime = document.querySelector("#startTime"),
  endTime = document.querySelector("#endTime"),
  hourlyWage = document.querySelector("#hourlyWage"),
  workplace = document.querySelector("#workplace"),
  shiftSlug = document.querySelector("#shiftSlug"),
  comments = document.querySelector("#comments"),
  saveBtn = document.querySelector("#save"),
  welcomeUser = document.querySelector("#welcomeUser"),
  closeBtn = document.querySelector(".close-btn"),
  tableB = document.querySelector(".tableB");

let user = JSON.parse(localStorage.getItem("authToken")),
  index,
  filterDates;

//Get user shifts
let shifts = JSON.parse(localStorage.getItem(user?.userName)) || [];

//Display username

welcomeUser.innerHTML = `Hello, ${user?.userName}`;

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const fDate = new Date(fromDate.value).setHours(0, 0, 0);
  const tDate = new Date(toDate.value).setHours(0, 0, 0);
  filterDates = shifts.filter((obj) => {
    return (
      new Date(obj.date).getTime() >= fDate &&
      new Date(obj.date).getTime() <= tDate
    );
  });
  tbody.innerHTML = "";
  filterDates.forEach((obj) =>
    helpers.generateRow(
      obj.date,
      obj.startTime,
      obj.endTime,
      obj.hourlyWage,
      obj.workplace,
      obj.shiftSlug,
      obj.comments,
      obj.totalProfit
    )
  );
});

searchSlug.addEventListener("click", function (e) {
  e.preventDefault();
  let findName = shifts.find((obj) => obj.shiftSlug === searchText.value);

  if (!findName) return alert("Shift not found!");
  tbody.innerHTML = "";
  helpers.generateRow(
    findName.date,
    findName.startTime,
    findName.endTime,
    findName.hourlyWage,
    findName.workplace,
    findName.shiftSlug,
    findName.comments,
    findName.totalProfit
  );
});

tbody.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("edit")) {
    let shiftEdit = e.target.closest("tr").children[5].innerHTML;
    index = shifts.findIndex((obj, index) => obj.shiftSlug === shiftEdit);
    let shift = shifts.find((obj, index) => {
      return obj.shiftSlug === shiftEdit;
    });

    tableB.classList.add("blur");
    document.querySelector(".shift").classList.remove("none");
    startTime.value = shift.startTime;
    endTime.value = shift.endTime;
    hourlyWage.value = shift.hourlyWage;
    workplace.value = shift.workplace;
    shiftSlug.value = shift.shiftSlug;
    comments.value = shift.comments;
  }

  if (e.target.classList.contains("remove")) {
    let shiftEdit = e.target.closest("tr").children[5].innerHTML;
    index = shifts.findIndex((obj, index) => obj.shiftSlug === shiftEdit);
    let shift = shifts.find((obj, index) => {
      return obj.shiftSlug === shiftEdit;
    });
    shifts.splice(index, 1);
    localStorage.setItem(user.userName, JSON.stringify(shifts));
    tbody.innerHTML = "";
    shifts.forEach((obj, index) =>
      helpers.generateRow(
        obj.date,
        obj.startTime,
        obj.endTime,
        obj.hourlyWage,
        obj.workplace,
        obj.shiftSlug,
        obj.comments,
        obj.totalProfit
      )
    );
  }
});

closeBtn.addEventListener("click", function (e) {
  tableB.classList.remove("blur");
  document.querySelector(".shift").classList.add("none");
});

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const startHour = new Date(
    `${shifts[index].date} ${startTime.value}`
  ).getHours();
  const endHour = new Date(`${shifts[index].date} ${endTime.value}`).getHours();

  const wagePerDay = (endHour - startHour) * +hourlyWage.value;
  helpers.modifyShift(shifts[index], wagePerDay);

  localStorage.setItem(user.userName, JSON.stringify(shifts));
  tbody.innerHTML = "";

  tableB.classList.remove("blur");
  document.querySelector(".shift").classList.add("none");
});

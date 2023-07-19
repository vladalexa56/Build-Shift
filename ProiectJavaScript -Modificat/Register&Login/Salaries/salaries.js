import * as helpers from "../../funtions.js";
const tbody = document.querySelector("#tbody"),
  startTime = document.querySelector("#startTime"),
  endTime = document.querySelector("#endTime"),
  hourlyWage = document.querySelector("#hourlyWage"),
  workplace = document.querySelector("#workplace"),
  shiftSlug = document.querySelector("#shiftSlug"),
  comments = document.querySelector("#comments"),
  saveBtn = document.querySelector("#save"),
  welcomeUser = document.querySelector("#welcomeUser"),
  chart = document.querySelector(".chart"),
  closeBtn = document.querySelector(".close-btn"),
  tableB = document.querySelector(".tableB"),
  sortBy = document.querySelector("#sortBy");

let user = JSON.parse(localStorage.getItem("authToken")),
  index;

//Get user shifts
let shifts = JSON.parse(localStorage.getItem(user?.userName)) || [];

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

welcomeUser.innerHTML = `Hello, ${user?.userName}`;

tbody.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("edit")) {
    let shiftEdit = e.target.closest("tr").children[5].innerHTML;
    index = shifts.findIndex((obj, index) => obj.shiftSlug === shiftEdit);
    let shift = shifts.find((obj, index) => {
      return obj.shiftSlug === shiftEdit;
    });

    tableB.classList.add("blur");
    chart.classList.add("blur");
    document.querySelector(".shift").classList.remove("none");
    startTime.value = shift.startTime;
    endTime.value = shift.endTime;
    hourlyWage.value = shift.hourlyWage;
    workplace.value = shift.workplace;
    shiftSlug.value = shift.shiftSlug;
    comments.value = shift.comments;

    console.log(index);
  }

  if (e.target.classList.contains("remove")) {
    let shiftEdit = e.target.closest("tr").children[5].innerHTML;
    index = shifts.findIndex((obj, index) => obj.shiftSlug === shiftEdit);

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
  chart.classList.remove("blur");
  document.querySelector(".shift").classList.add("none");
});

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  shifts[index].startTime = startTime.value;
  shifts[index].endTime = endTime.value;
  shifts[index].hourlyWage = hourlyWage.value;
  shifts[index].workplace = workplace.value;
  shifts[index].shiftSlug = shiftSlug.value;
  shifts[index].comments = comments.value;
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
  tableB.classList.remove("blur");
  chart.classList.remove("blur");
  document.querySelector(".shift").classList.add("none");
});

sortBy.addEventListener("click", function (e) {
  e.preventDefault();
  if (sortBy.value === "date-ascending") {
    let sortShift = shifts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    tbody.innerHTML = "";
    sortShift.forEach((obj, index) =>
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
  if (sortBy.value === "date-descending") {
    let sortShift = shifts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    tbody.innerHTML = "";
    sortShift.forEach((obj, index) =>
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

//////////////////////////////////////////////////////////CHART//////////////////////////////////////////////////////////////

let xValues = [
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
let yValues = [];
let barColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#FFA500",
  "#800080",
  "#008000",
  "#FFC0CB",
  "#808080",
  "#FFFFFF",
];

for (let i = 0; i < 12; i++) {
  let shift1 = shifts
    .filter((obj) => xValues[new Date(obj.date).getMonth()] === xValues[i])
    .reduce((acc, cur) => {
      return acc + cur.totalProfit;
    }, 0);
  if (shift1 > 0) {
    yValues.push(shift1);
  } else {
    yValues.push(0);
  }
}

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      fontSize: 30,
      display: true,
      text: "",
    },
    legend: {
      display: true,
      labels: {
        fontColor: "white",
        fontSize: 20,
      },
    },
  },
  legend: {
    fontSize: 50,
  },
});

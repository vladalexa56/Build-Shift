const content = document.querySelector(".content"),
  logOutContainer = document.querySelector(".logOut"),
  logOut = document.querySelector(".log-out");

logOut.addEventListener("click", function (e) {
  e.preventDefault();
  logOutContainer.classList.remove("none");
  content.classList.add("blur");
  console.log(e.target.innerHTML);
});

logOutContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.innerHTML === "Yes") {
    localStorage.removeItem("authToken");
    window.location.href = "../Login/Login.html";
  }
  if (e.target.innerHTML === "No") {
    logOutContainer.classList.add("none");
    content.classList.remove("blur");
  }
});

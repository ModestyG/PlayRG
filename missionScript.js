let missionDiv = document.getElementById("mission-div");
let phoneButton = document.getElementById("phone-button");
let crypto = 50;
let currentMission = "";

//Load saved values
if (localStorage.length) {
  crypto = Number(localStorage.getItem("crypto"));
}

function callAction() {
  phoneButton.classList.add("hidden");
  let phoneDiv = document.createElement("div");
  phoneDiv.id = "phone-div";
  phoneDiv.innerHTML = "<button onclick='addCrypto()'></button>";
  missionDiv.appendChild(phoneDiv);
}

function addCrypto() {
  crypto += 1;
  if (typeof Storage !== "undefined") {
    localStorage.setItem("crypto", crypto);
    console.log(crypto);
  } else {
    console.log("Error: Your browser does not support Web Storage");
  }
}

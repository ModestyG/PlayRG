class Contact {
  constructor(name) {
    this.name = name;
  }
}

let missionDiv = document.getElementById("mission-div");
let phoneButton = document.getElementById("phone-button");
let phoneDiv = document.getElementById("phone-div");
let crypto = 50;
let currentMission = "";
let contacts = [new Contact("Test")];

//Load saved values
if (localStorage.length) {
  crypto = Number(localStorage.getItem("crypto"));
}

function openPhone() {
  phoneButton.classList.add("hidden");
  phoneDiv.style.display = "flex";
  phoneDiv.innerHTML =
    "<button onclick='closePhone()' id='close-phone-button'>x</button>";
  contacts.forEach((contact) => {
    btn = document.createElement("button");
    btn.onclick = function () {
      call(contact);
    };
    btn.innerHTML = contact.name;
    phoneDiv.appendChild(btn);
  });
}

function call(contact) {
  phoneDiv.innerHTML = "";
  let dialogBox = document.createElement("div");
  dialogBox.id = "dialog-box";
  phoneDiv.appendChild(dialogBox);
}

function closePhone() {
  phoneButton.classList.remove("hidden");
  phoneDiv.style.display = "none";
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

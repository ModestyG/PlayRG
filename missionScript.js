class Contact {
  constructor(name, greeting) {
    this.name = name;
    this.availableMissions = [];
    this.greeting = greeting;
    this.missionDialogs = MISSION_CONTENTS[this.name];
  }
  getMissionDialog(mission) {
    let missionDialogDict = this.missionDialogs[mission.id];
    for (let i = mission.progress; i >= 0; i--) {
      console.log(missionDialogDict[i]);
      if (missionDialogDict[i]) {
        return missionDialogDict[i];
      }
    }
  }
  getMissionChoiceDialog() {
    let list = [];
    this.availableMissions.forEach((mission) => {
      list.push(
        new Choice(mission.name, mission.introDialog, () => {
          currentMission = mission;
        })
      );
    });
    return new ChoiceDialog(...list);
  }

  addAvailableMission(mission) {
    this.availableMissions.push(mission);
    this.greeting.nextDialog = this.getMissionChoiceDialog();
  }
}

const placeholderDialog = new ChoiceDialog(
  new Choice("Placeholder", null, () => {
    console.log("Placeholder effect");
  })
);

const missionDiv = document.getElementById("mission-div");
const phoneButton = document.getElementById("phone-button");
const phoneDiv = document.getElementById("phone-div");
let crypto = 50;
let currentMission = null;

//We begin with only one contact
let contacts = [
  new Contact(
    "Cain",
    (greeting = new TextDialog(
      (speaker = "Cain"),
      (text = "Greetings, Agent. How are things going?")
    ))
  ),
];
contacts[0].addAvailableMission(MISSIONS[0]);

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
    btn.onclick = () => {
      if (!currentMission) {
        call(contact.greeting);
      } else {
        call(contact.getMissionDialog(currentMission));
      }
    };
    btn.innerHTML = contact.name;
    phoneDiv.appendChild(btn);
  });
}

function call(dialog) {
  phoneDiv.innerHTML = "";
  let dialogBox = document.createElement("div");
  dialogBox.id = "dialog-box";
  phoneDiv.appendChild(dialogBox);
  if (!dialog) {
    openPhone();
  } else if (dialog instanceof TextDialog) {
    dialogBox.innerText = `${dialog.speaker}
    ${dialog.text}`;
    phoneDiv.onmousedown = () => {
      //Använder mousedown så att första klicken (den på kontaktknappen) inte räknas
      phoneDiv.onmousedown = null;
      call(dialog.nextDialog);
    };
  } else if (dialog instanceof ChoiceDialog) {
    dialog.choices.forEach((choice) => {
      choiceButton = document.createElement("button");
      choiceButton.innerHTML = choice.text;
      choiceButton.onclick = () => {
        if (choice.effect) {
          choice.effect();
        }
        call(choice.dialog);
      };
      dialogBox.appendChild(choiceButton);
    });
  } else if (dialog instanceof TextInputDialog) {
    dialogBox.innerText = dialog.text;

    inputBox = document.createElement("INPUT");
    inputBox.setAttribute("type", "text");
    dialogBox.appendChild(inputBox);

    submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.onclick = () => {
      input = inputBox.value;
      if (dialog.results[input]) {
        dialog.results[input]();
      } else {
        call(dialog.failDialog);
      }
    };
    dialogBox.appendChild(submitButton);
  }
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

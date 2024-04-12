class Contact {
  constructor(name, greeting) {
    this.name = name;
    this.availableMissions = [];
    this.greeting = greeting;
    this.missionDialogs = { 0: { 0: placeholderDialog } };
  }
  getMissionDialog(mission) {
    let missionDialogDict = this.missionDialogs[mission.id];
    for (let i = mission.progress; i >= 0; i--) {
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

class Mission {
  constructor(name, id, introDialog) {
    this.name = name;
    this.id = id;
    this.introDialog = introDialog;
    this.progress = 0;
  }
}

// Dialog classes

class TextDialog {
  constructor(speaker, text, nextDialog) {
    this.speaker = speaker;
    this.text = text;
    this.nextDialog = nextDialog;
  }
}

class ChoiceDialog {
  constructor(...choices) {
    //Varje val läggs in med sin text följt av assosierad frame och ev medföljande effekt
    this.choices = choices;
  }
}

class Choice {
  constructor(text, dialog, effect) {
    this.text = text;
    this.dialog = dialog;
    this.effect = effect;
  }
}

let placeholderDialog = new ChoiceDialog(
  new Choice("Placeholder", null, () => {
    console.log("Placeholder effect");
  })
);

let missionDiv = document.getElementById("mission-div");
let phoneButton = document.getElementById("phone-button");
let phoneDiv = document.getElementById("phone-div");
let crypto = 50;
let contacts = [
  new Contact(
    "Cain",
    (greeting = new TextDialog(
      (speaker = "Cain"),
      (text = "Greetings, Agent. How are things going?")
    ))
  ),
];
contacts[0].addAvailableMission(
  // Add starting mission to Cain
  new Mission(
    "The Start",
    0,
    new TextDialog(
      "Cain",
      "Right. Since this is your first day on the job I though we'd start you off with some training scenarios."
    )
  )
);

let currentMission = null;

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
    closePhone();
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

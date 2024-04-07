class Contact {
  constructor(name, greeting) {
    this.name = name;
    this.availableMissions = [
      new Mission(
        "The Start",
        0,
        new TextDialog(
          "Cain",
          "Right. Since this is your first day on the job I though we'd start you off with some training scenarios."
        )
      ),
    ];
    let missionChoices = [];
    this.availableMissions.forEach((mission) => {
      missionChoices.push(mission.name); //Choice name
      missionChoices.push(mission.introDialog); //Where the choice sends us
      missionChoices.push(() => {
        // Effect
        currentMission = mission;
      });
    });
    this.chooseNewMissionDialog = new ChoiceDialog(...missionChoices);
    this.greeting = new TextDialog(
      this.name,
      "Greetings, Agent. How are things going?",
      this.chooseNewMissionDialog
    );
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
    this.choiceTexts = [];
    this.choiceDialogs = [];
    this.choiceEffects = [];
    for (let i = 0; i < choices.length; i += 3) {
      this.choiceTexts.push(choices[i]);
      this.choiceDialogs.push(choices[i + 1]);
      this.choiceEffects.push(choices[i + 2]);
    }
  }
}

let placeholderDialog = new ChoiceDialog("Placeholder", null, () => {
  console.log("Placeholder effect");
});

let missionDiv = document.getElementById("mission-div");
let phoneButton = document.getElementById("phone-button");
let phoneDiv = document.getElementById("phone-div");
let crypto = 50;
let contacts = [new Contact("Cain")];
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
    for (let i = 0; i < dialog.choiceTexts.length; i++) {
      choiceButton = document.createElement("button");
      choiceButton.innerHTML = dialog.choiceTexts[i];
      choiceButton.onclick = () => {
        if (dialog.choiceEffects[i]) {
          dialog.choiceEffects[i]();
        }
        call(dialog.choiceDialogs[i]);
      };
      dialogBox.appendChild(choiceButton);
    }
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

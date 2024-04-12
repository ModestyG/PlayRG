class Mission {
  constructor(name, id, introDialog) {
    this.name = name;
    this.id = id;
    this.introDialog = introDialog;
    this.progress = 0;
  }
}

const MISSION_CONTENTS = {
  Cain: {
    0: {
      0: new TextInputDialog(
        "Enter code:",
        {
          123: () => {
            currentMission.progress++;
            call(new TextDialog("Cain", "Good Job!"));
          },
        },
        new TextDialog("Cain", "That is wrong. Try typing 123.")
      ),
      1: new TextDialog(
        "ME :)",
        "Sorry, but I'm afraid this is where tha game ends :/"
      ),
    },
  },
};

const MISSIONS = [
  new Mission(
    "The Start",
    0,
    new TextDialog(
      "Cain",
      "Right. Since this is your first day on the job I though we'd start you off with some training scenarios."
    )
  ),
];

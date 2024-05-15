const MISSION_CONTENTS = {
  Cain: {
    0: {
      0: new TextDialog(
        "Cain",
        "Right. Since this is your first day on the job I though we'd start you off with some training scenarios.",
        () => {
          gameManager.progress();
        }
      ),
      1: new TextInputDialog(
        "Enter code:",
        {
          123: () => {
            gameManager.progress();
            gameManager.addClue(CLUES[0]);
            call(new TextDialog("Cain", "Good Job!"));
          },
        },
        new TextDialog("Cain", "That is wrong. Try typing 123.")
      ),
      2: new TextDialog(
        "ME :)",
        "Sorry, but I'm afraid this is where tha game ends :/"
      ),
    },
  },
};

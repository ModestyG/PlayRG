const MISSION_CONTENTS = {
  Cain: {
    0: {
      0: new TextDialog(
        "Cain",
        [
          "Greetings.",
          "Welcome to your new job at S.E.C.R.E.T.T (the Specialized Espionage Coalition for Reconnaissance and Tactical Transmissions)",
          "To get you started we have prepared an array of training scenarios to assess your abilities.",
          "To start off I will be sending you a note, and I want you to read it, and then call me back to tell me the password.",
        ],
        () => {
          gameManager.progress();
          gameManager.addClue(CLUES[0]);
        }
      ),
      1: new TextInputDialog(
        "Enter code:",
        {
          1235: () => {
            gameManager.progress();
            call(new TextDialog("Cain", "Good Job!"));
          },
        },
        new TextDialog(
          "Cain",
          "That is wrong. Try reading the note that has appeared in your 'files' tab."
        )
      ),
      2: new TextDialog(
        "ME :)",
        "Sorry, but I'm afraid this is where tha game ends :/"
      ),
    },
  },
};

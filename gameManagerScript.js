//This code will be run on every page
gameManager = {
  crypto: 0,
  clues: [],
  openedClues: [],
  currentMission: null,
  addOpenClue(clue) {
    this.openedClues.push(clue);
    this.save();
  },
  removeOpenClue(clue) {
    this.openedClues.splice(this.openedClues.indexOf(clue), 1);
    this.save();
  },
  addClue(clue) {
    this.clues.push(clue);
    this.save();
  },
  setCurrentMission(mission) {
    this.currentMission = mission;
    this.save();
  },
  progress() {
    this.currentMission.progress++;
    this.save();
  },
  save() {
    localStorage.setItem("openedClues", JSON.stringify(this.openedClues));
    let openedCluePositions = [];
    this.openedClues.forEach((clue) => {
      openedCluePositions.push([clue.xPos, clue.yPos]);
    });
    localStorage.setItem(
      "openedCluePositions",
      JSON.stringify(openedCluePositions)
    );
    localStorage.setItem("clues", JSON.stringify(this.clues));
    localStorage.setItem("currentMissionId", this.currentMission.id);
    localStorage.setItem(
      "currentMissionProgress",
      this.currentMission.progress
    );
  },
  load() {
    if (localStorage.length) {
      crypto = Number(localStorage.getItem("crypto"));
      this.openedClues = [];
      JSON.parse(localStorage.getItem("openedClues")).forEach((clue) => {
        this.openedClues.push(CLUES[clue.id]);
      });
      let openedCluePositions = JSON.parse(
        localStorage.getItem("openedCluePositions")
      );
      for (let i = 0; i < this.openedClues.length; i++) {
        const clue = this.openedClues[i];
        clue.xPos = openedCluePositions[i][0];
        clue.yPos = openedCluePositions[i][1];
      }
      JSON.parse(localStorage.getItem("clues")).forEach((clue) => {
        this.clues.push(CLUES[clue.id]);
      });
      this.currentMission = MISSIONS[localStorage.getItem("currentMissionId")];
      this.currentMission.progress = localStorage.getItem(
        "currentMissionProgress"
      );
    }
  },
};

gameManager.load();

//This is mainly used if gameManager is not created when we want to call the save function
addEventListener("save", (e) => gameManager.save());

//This code will be run on every page

var gameManager = {
  crypto: 0,
  clues: [],
  openedClues: [],
  addOpenClue(clue) {
    this.openedClues.push(clue);
    this.addClue(clue);
    this.save();
  },
  save() {
    localStorage.setItem("openedClues", JSON.stringify(this.openedClues));
    console.log(JSON.parse(localStorage.getItem("openedClues")));
  },
  load() {
    if (localStorage.length) {
      crypto = Number(localStorage.getItem("crypto"));
      this.openedClues = [];
      JSON.parse(localStorage.getItem("openedClues")).forEach((clue) => {
        this.openedClues.push(CLUES[clue.id]);
      });
    }
  },
  addClue(clue) {
    document.body.appendChild(clue.element);
  },
};

gameManager.load();

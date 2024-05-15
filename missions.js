class Mission {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.progress = 0;
  }
}

const MISSIONS = [new Mission("The Start", 0)];

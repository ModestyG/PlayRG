class TextDialog {
  constructor(speaker, text, nextDialog) {
    this.speaker = speaker;
    this.text = text;
    this.nextDialog = nextDialog;
  }
}

class ChoiceDialog {
  constructor(...choices) {
    this.choices = choices;
  }
}

class TextInputDialog {
  constructor(text, results, failDialog) {
    this.text = text;
    this.results = results;
    this.failDialog = failDialog;
  }
}

class Choice {
  constructor(text, dialog, effect) {
    this.text = text;
    this.dialog = dialog;
    this.effect = effect;
  }
}

class TextDialog {
  constructor(speaker, text, effect, nextDialog) {
    this.speaker = speaker;
    this.text = text;
    this.effect = effect;
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

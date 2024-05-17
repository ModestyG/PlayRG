class TextDialog {
  constructor(speaker, texts, effect, nextDialog) {
    this.speaker = speaker;
    this.texts = texts;
    if (typeof texts == "string") this.texts = [texts];
    this.effect = effect;
    this.progress = 0;
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

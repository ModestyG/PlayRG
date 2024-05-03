class Clue {
  constructor(element, id, width = 0, height = 0) {
    this.element = element;
    this.id = id;
    this.width = width;
    this.height = height;

    if (height) this.element.style.height = `${height}px`;
    if (width) this.element.style.width = `${width}px`;

    // Position variables are used to regenerate elements when switching pages (might be removed later)
    this.xPos = window.innerWidth / 2;
    this.yPos = window.innerHeight / 2;
    this.element.style.left = `${this.xPos}px`;
    this.element.style.top = `${this.yPos}px`;

    element.style.position = "absolute";

    this.element.onmousedown = () => {
      onmousemove = (e) => {
        this.xPos = e.clientX - width / 2;
        this.yPos = e.clientY - height / 2;
        this.element.style.left = `${this.xPos}px`;
        this.element.style.top = `${this.yPos}px`;
      };
    };
    this.element.onclick = () => {
      //Using onclick instead of mouse up makes it hard to *accidentally* drop clues outside the screen
      onmousemove = null;
    };
  }
}

const CLUES = {
  0: new Clue(document.createElement("Button"), (id = 0), 50, 50),
};

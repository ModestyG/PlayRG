class Clue {
  constructor(
    type,
    id,
    name = "",
    innerHtml = "",
    width = 0,
    height = 0,
    src = null
  ) {
    this.id = id; //Id is not the same as element id which is in fact name
    this.width = width;
    this.height = height;

    this.element = document.createElement(type);
    if (type == "Img") {
      this.element.src = src;
      this.element.draggable = false;
    }
    this.element.id = name;
    this.element.innerHtml = innerHtml;

    this.div = document.createElement("div");
    this.div.style.transform = "rotate(0deg)";
    this.div.style.margin = "15px";
    this.div.appendChild(this.element);

    this.button = document.createElement("button");
    this.button.classList.add("clue-button");
    this.button.style.top = `${this.height - 22}px`;
    this.div.appendChild(this.button);

    if (height) this.element.style.height = `${height}px`;
    if (width) this.element.style.width = `${width}px`;
    this.div.style.height = this.element.style.height;
    this.div.style.width = this.element.style.width;

    // Position variables are used to regenerate elements when switching pages (might be removed later)
    this.xPos = (window.innerWidth - this.width) / 2;
    this.yPos = (window.innerHeight - this.height) / 2;
  }
  open(openedClues) {
    this.div.style.left = `${this.xPos}px`;
    this.div.style.top = `${this.yPos}px`;

    this.div.style.position = "absolute";

    this.div.onmousedown = () => {
      openedClues.splice(openedClues.indexOf(this), 1);
      openedClues.push(this);
      for (let i = 0; i < openedClues.length; i++) {
        openedClues[i].div.style.zIndex = i;
      }

      onmousemove = (e) => {
        this.xPos = Math.min(
          window.innerWidth - this.width - 40,
          Math.max(10, e.clientX - this.width / 2)
        );
        this.yPos = Math.min(
          window.innerHeight - this.height - 40,
          Math.max(50, e.clientY - this.height / 2)
        );
        this.div.style.left = `${this.xPos}px`;
        this.div.style.top = `${this.yPos}px`;
      };
    };
    this.div.onmouseup = () => {
      dispatchEvent(new Event("save"));
      onmousemove = null;
    };
  }
}

const CLUES = {
  0: new Clue("Img", 0, "", "", 146, 60, "note-1235.png"),
};

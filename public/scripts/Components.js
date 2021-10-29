class BaseComponent {
  constructor(name) {
    this.name = name;
  }
}

class Position extends BaseComponent {
  constructor(x, y) {
    super("Position");
    this.x = x;
    this.y = y;
  }
}

class Sprite extends BaseComponent {
  constructor(spriteName) {
    super("Sprite");
    this.spriteName = spriteName;
    this.spriteImage = new Image();
    this.#setSource();
  }

  #setSource() {
    this.spriteImage.src = `../sprites/${this.spriteName}.png`;
  }
}

class Animator extends BaseComponent {
  constructor() {
    super("Animator");
  }
}

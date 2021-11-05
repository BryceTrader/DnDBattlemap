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
  constructor(name) {
    super("Sprite");
    this.spriteName = name;
    this.spriteImage = new Image();
    this.spriteImage.src = `../sprites/${this.spriteName}.png`;
  }
}

class Animator extends BaseComponent {
  constructor(name) {
    super("Animator");
    this.animatorName = name;
    this.spriteSheetX = 0;
    this.spriteSheetY = 0;
    this.spriteSize = 0;
    this.frames = 0;
    this.currentFrame = 1;
  }
}

class Camera extends BaseComponent {
  constructor() {
    super("Camera");
    this.xOffset = 0;
    this.yOffset = 0;
    this.zoomScale = 32;
    this.zoomLevel = 0;
    this.tileSize = 256;
    this.tileScaled = this.tileSize + this.zoomScale * this.zoomLevel;
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
    this.width = Math.floor(this.clientWidth / this.tileScaled);
    this.height = Math.floor(this.clientHeight / this.tileScaled);
  }
}

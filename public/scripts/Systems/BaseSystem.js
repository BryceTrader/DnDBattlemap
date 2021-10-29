class BaseSystem {
  constructor(name) {
    this.name = name;
  }
}

class AnimationSystem extends BaseSystem {
  constructor() {
    super("AnimationSystem");
  }
}

class RenderSystem extends BaseSystem {
  constructor(context, canvas, camera, sprite_sheet) {
    super("Render");
    this.context = context;
    this.canvas = canvas;
    this.camera = camera;
    this.sprite_sheet = sprite_sheet;
  }

  update(entities) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      if (!entity || !entity.components["Sprite"]) continue;

      this.context.beginPath();

      this.context.closePath();
    }
  }
}
// drawSprite(sX: number, sY: number, sW: number, sH: number, dW: number, dH: number): void {
// 	// ctx.imageSmoothingEnabled = false
// 	// ctx.drawImage(this.image, sX, sY, sW, sH, this.posX, this.posY, dW, dH)
// }

// update(cX: number, cY: number, a1: number, a2: number) {
// 	// const x = Math.floor(cX / gridSize) * gridSize + 1
// 	// const y = Math.floor(cY / gridSize) * gridSize + 1
// 	// ctx.clearRect(x, y, gridSize, gridSize)
// 	// drawSprite(a1, a2, 32, 32, x, y, gridSize - 2, gridSize - 2)
// }

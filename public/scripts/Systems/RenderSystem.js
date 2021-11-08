class RenderSystem extends BaseSystem {
  constructor(context, canvas, camera) {
    super("RenderSystem");
    this.context = context;
    this.canvas = canvas;
    this.camera = camera;
  }

  onScreen(currentX, currentY, width, height) {
    if (currentX < 0 || currentX > width) return false;
    if (currentY < 0 || currentY > height) return false;
    return true;
  }

  update(entities) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.imageSmoothingEnabled = false;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (!entity.components.Sprite) continue;

      // Onscreen check
      const currentPosX = entity.components.Position.x + this.camera.xOffset;
      const currentPosY = entity.components.Position.y + this.camera.yOffset;
      if (
        !this.onScreen(
          currentPosX,
          currentPosY,
          this.camera.width,
          this.camera.height
        )
      )
        continue;

      // Getting drawing information
      const image = entity.components.Sprite.spriteImage;
      const sx = entity.components.Animator.spriteSheetX;
      const sy = entity.components.Animator.spriteSheetY;
      const sWidth = entity.components.Animator.spriteSize;
      const sHeight = sWidth;
      const dx = currentPosX * this.camera.tileScaled;
      const dy = currentPosY * this.camera.tileScaled;
      const dWidth = this.camera.tileScaled * (sWidth / this.camera.zoomScale);
      const dHeight = dWidth;

      this.context.beginPath();
      this.context.drawImage(
        image,
        sx,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );
      this.context.closePath();
    }
  }
}

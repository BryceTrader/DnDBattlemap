class BackgroundSystem extends BaseSystem {
  constructor(ctx, canvas) {
    super("BackgroundSystem");
    this.context = ctx;
    this.canvas = canvas;
	this.backgroundMoved = true
	this.shouldDrawGrid = true
  }

  drawBackground(camera) {
    this.context.imageSmoothingEnabled = false;
	this.context.clearRect(0, 0, camera.clientWidth, camera.clientHeight)
    this.context.beginPath();
    // this.context.drawImage(
    //   image,
    //   sx,
    //   sy,
    //   sWidth,
    //   sHeight,
    //   dx,
    //   dy,
    //   dWidth,
    //   dHeight
    // );
    this.context.closePath();
	if(this.shouldDrawGrid) this.drawGrid(camera)
	this.backgroundMoved = false
  }

  drawGrid(camera) {
    const width = camera.clientWidth;
    const height = camera.clientHeight;
	const offset = camera.tileScaled
    for (let i = 0; i <= width; i += offset) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
      ctx.closePath();
    }
  }

  update(entities) {
	  if(!this.backgroundMoved) return
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
	  const camera = entity.component["Camera"];
	  if(!camera) continue
    }
  }
}

class BackgroundSystem extends BaseSystem {
	constructor(ctx, canvas) {
		super('BackgroundSystem')
		this.context = ctx
		this.canvas = canvas
	}

	drawBackground() {
		this.context.imageSmoothingEnabled = false
		this.context.beginPath()
		this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		this.context.closePath()
	}

	update() {}
}

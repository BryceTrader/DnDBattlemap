class BackgroundSystem extends BaseSystem {
	constructor(ctx, canvas, camera) {
		super('BackgroundSystem')
		this.context = ctx
		this.canvas = canvas
		this.camera = camera
		this.shouldDrawGrid = true
	}

	drawBackground() {
		this.context.clearRect(0, 0, this.camera.clientWidth, this.camera.clientHeight)
		this.context.beginPath()
		// this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		this.context.closePath()
		if (this.shouldDrawGrid) this.drawGrid()
	}

	drawGrid() {
		const width = this.camera.clientWidth
		const height = this.camera.clientHeight
		const offset = this.camera.tileScaled
		for (let i = 0; i <= width; i += offset) {
			this.context.beginPath()
			this.context.moveTo(i, 0)
			this.context.lineTo(i, height)
			this.context.stroke()
			this.context.moveTo(0, i)
			this.context.lineTo(width, i)
			this.context.stroke()
			this.context.closePath()
		}
	}

	update() {
		this.drawBackground(this.camera)
	}
}

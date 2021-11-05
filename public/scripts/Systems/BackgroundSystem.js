class BackgroundSystem extends BaseSystem {
	constructor(ctx, canvas) {
		super('BackgroundSystem')
		this.context = ctx
		this.canvas = canvas
		this.backgroundMoved = true
		this.shouldDrawGrid = true
	}

	drawBackground(camera) {
		GM.systems[GM.systemsDictionary.CameraSystem].checkScaling(camera)
		this.context.imageSmoothingEnabled = false
		this.context.clearRect(0, 0, camera.clientWidth, camera.clientHeight)
		this.context.beginPath()
		// this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		this.context.closePath()
		if (this.shouldDrawGrid) this.drawGrid(camera)
		this.backgroundMoved = false
	}

	drawGrid(camera) {
		const width = camera.clientWidth
		const height = camera.clientHeight
		const offset = camera.tileScaled
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
		if (!this.backgroundMoved) return
		this.drawBackground(GM.getCamera())
	}
}

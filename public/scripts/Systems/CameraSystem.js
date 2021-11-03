class CameraSystem extends BaseSystem {
	constructor(baseSize = 256) {
		super('CameraSystem')
		this.xOffset = 0
		this.yOffset = 0
		this.zoomScale = 32
		this.zoomLevel = 0
		this.tileSize = baseSize
		this.tileScaled = this.tileSize + this.zoomScale * this.zoomLevel
		this.width
		this.height
		this.getWindowSize()
	}

	getWindowSize() {
		this.width = Math.floor(document.body.clientWidth / this.tileScaled)
		this.height = Math.floor(document.body.clientHeight / this.tileScaled)
	}

	update() {
		if (this.tileScaled < this.zoomScale) {
			this.tileScaled = this.zoomScale
			this.zoomLevel++
		}
	}
}

class CameraSystem extends BaseSystem {
	constructor(baseSize = 32) {
		super('CameraSystem')
		this.xOffset = 0
		this.yOffset = 0
		this.zoomScale = 32
		this.zoomLevel = 0
		this.tileSize = baseSize
		this.tileScaled = this.tileSize + this.zoomScale * this.zoomLevel
	}
	update() {
		if (this.tileScaled < this.zoomScale) {
			this.tileScaled = this.zoomScale
			this.zoomLevel++
		}
	}
}

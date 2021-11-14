class CameraSystem extends BaseSystem {
	constructor(camera, USER) {
		super('CameraSystem')
		this.camera = camera
		this.USER = USER
	}

	checkScaling() {
		if (this.camera.tileScaled < this.camera.zoomScale) {
			this.camera.tileScaled = this.camera.zoomScale
			this.camera.zoomLevel++
		}

		if (this.camera.clientHeight < this.camera.tileScaled) {
			this.camera.zoomLevel--
			this.camera.tileScaled = this.camera.tileSize + this.camera.zoomScale * this.camera.zoomLevel
		}
	}

	resizeCamera() {
		this.camera.tileScaled = this.camera.tileSize + this.camera.zoomScale * this.camera.zoomLevel
		this.camera.clientWidth = document.body.clientWidth
		this.camera.clientHeight = document.body.clientHeight
		this.camera.width = Math.floor(this.camera.clientWidth / this.camera.tileScaled)
		this.camera.height = Math.floor(this.camera.clientHeight / this.camera.tileScaled)
	}

	update() {
		if (this.USER.bool) this.resizeCamera()
		this.USER.bool = false
	}
}

class CameraSystem extends BaseSystem {
	constructor() {
		super('CameraSystem')
		this.resized = false
		const cameraEntity = new Entity()
		this.camera = new Camera()
		cameraEntity.addComponent(this.camera)
		GM.addEntity(cameraEntity)
	}

	getWindowSize() {
		this.camera.clientWidth = document.body.clientWidth
		this.camera.clientHeight = document.body.clientHeight
		this.camera.width = Math.floor(this.camera.clientWidth / this.camera.tileScaled)
		this.camera.height = Math.floor(this.camera.clientHeight / this.camera.tileScaled)
		this.resized = false
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

	update() {
		if (this.resized) this.getWindowSize()
	}
}

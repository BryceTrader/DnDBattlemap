class CameraSystem extends BaseSystem {
	constructor() {
		super('CameraSystem')
		this.resized = false
		const camera = new Entity()
		camera.addComponent(new Camera())
		GM.addEntity(camera)
	}

	getWindowSize(camera) {
		camera.clientWidth = document.body.clientWidth
		camera.clientHeight = document.body.clientHeight
		camera.width = Math.floor(camera.clientWidth / camera.tileScaled)
		camera.height = Math.floor(camera.clientHeight / camera.tileScaled)
		this.resized = false
	}

	checkScaling(camera) {
		if (camera.tileScaled < camera.zoomScale) {
			camera.tileScaled = camera.zoomScale
			camera.zoomLevel++
		}

		if (camera.clientHeight < camera.tileScaled) {
			camera.zoomLevel--
			camera.tileScaled = camera.tileSize + camera.zoomScale * camera.zoomLevel
		}
	}

	update(entities) {
		const camera = GM.getCamera()
		if (this.resized) this.getWindowSize(camera)
	}
}

class CameraSystem extends BaseSystem {
	constructor() {
		super('CameraSystem')
		this.xOffset = 0
		this.yOffset = 0
	}
	update() {
		if (GM.tileScaled < GM.zoomScale) {
			GM.tileScaled = GM.zoomScale
			GM.zoomLevel++
		}
	}
}

class InputSystem extends BaseSystem {
	constructor() {
		super('InputSystem')
		this.keyInput = []
		this.controls = {
			zoomIn: 'BracketRight',
			zoomOut: 'BracketLeft',
			cameraLeft: 'ArrowLeft',
			cameraRight: 'ArrowRight',
			cameraUp: 'ArrowUp',
			cameraDown: 'ArrowDown',
		}
	}

	update() {
		for (let i = 0; i < this.keyInput.length; i++) {
			const value = this.keyInput[i]
			this.inputHandler(value)
		}
		this.keyInput = []
	}

	inputHandler(key) {
		const camera = GM.systems[GM.systemsDictionary['CameraSystem']]

		switch (key) {
			case this.controls.zoomOut:
				camera.zoomLevel--
				camera.tileScaled = camera.tileSize + camera.zoomScale * camera.zoomLevel
				break
			case this.controls.zoomIn:
				camera.zoomLevel++
				camera.tileScaled = camera.tileSize + camera.zoomScale * camera.zoomLevel
				break
			case this.controls.cameraDown:
				camera.yOffset--
				break
			case this.controls.cameraUp:
				camera.yOffset++
				break
			case this.controls.cameraLeft:
				camera.xOffset++
				break
			case this.controls.cameraRight:
				camera.xOffset--
				break
		}
	}
}

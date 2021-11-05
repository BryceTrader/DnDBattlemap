class InputSystem extends BaseSystem {
	constructor() {
		super('InputSystem')
		this.keyInput = []
		this.controls = {
			zoomIn: ']',
			zoomOut: '[',
			cameraLeft: 'a',
			cameraRight: 'd',
			cameraUp: 'w',
			cameraDown: 's',
		}
	}

	mouseClickHandler(click) {
		const AS = GM.systems[GM.systemsDictionary.ActionSystem]
		switch (click.button) {
			case 0:
				AS.addEntityToManager(click)
				break
			case 1:
				console.log('Middle mouse button clicked.')
				break
			case 2:
				AS.removeEntityFromManager(click)
				break
		}
	}

	inputHandler(key) {
		const camera = GM.getCamera()

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
		GM.systems[GM.systemsDictionary.BackgroundSystem].backgroundMoved = true
	}

	update() {
		for (let i = 0; i < this.keyInput.length; i++) {
			const value = this.keyInput[i]
			this.inputHandler(value)
		}
		this.keyInput = []
	}
}

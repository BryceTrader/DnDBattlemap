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
		switch (key) {
			case this.controls.zoomOut:
				GM.zoomLevel--
				GM.tileScaled = GM.tileSize + GM.zoomScale * GM.zoomLevel
				break
			case this.controls.zoomIn:
				GM.zoomLevel++
				GM.tileScaled = GM.tileSize + GM.zoomScale * GM.zoomLevel
				break
			case this.controls.cameraDown:
				GM.yOffset++
				break
			case this.controls.cameraUp:
				GM.yOffset--
				break
			case this.controls.cameraLeft:
				GM.xOffset--
				break
			case this.controls.cameraRight:
				GM.xOffset++
				break
		}
	}
}

class ActionSystem extends BaseSystem {
	// TODO Figure out what to do with these imported functions.  Whether move into a class of their own or moved into this class itself.
	constructor(controls, input, camera, funcAddEntity, funcRemoveEntityByPosition, funcGetEntityByPosition) {
		super('ActionSystem')
		this.controls = controls
		this.input = input
		this.camera = camera
		this.funcAddEntity = funcAddEntity
		this.funcRemoveEntityByPosition = funcRemoveEntityByPosition
		this.funcGetEntityByPosition = funcGetEntityByPosition
	}

	// new Sprite is case sensitive on Linux.  Unsure why
	addEntityToManager(click) {
		const cX = Math.floor(click.clientX / this.camera.tileScaled) - this.camera.xOffset
		const cY = Math.floor(click.clientY / this.camera.tileScaled) - this.camera.yOffset
		if (this.funcGetEntityByPosition(cX, cY)) return

		const target = new Entity()
		target.addComponent(new Position(cX, cY))
		target.addComponent(new Sprite('Orc'))
		target.addComponent(new Animator(target.components.Sprite.spriteName))
		this.funcAddEntity(target)
	}

	removeEntityFromManager(click) {
		const cX = Math.floor(click.clientX / this.camera.tileScaled) - this.camera.xOffset
		const cY = Math.floor(click.clientY / this.camera.tileScaled) - this.camera.yOffset
		this.funcRemoveEntityByPosition(cX, cY)
	}

	mouseEventHandler(event) {
		switch (event.button) {
			case 0:
				this.addEntityToManager(event)
				break
			case 1:
				console.log('Middle mouse button.')
				break
			case 2:
				this.removeEntityFromManager(event)
				break
		}
	}

	keybordEventHandler(key) {
		switch (key) {
			case this.controls.zoomOut:
				this.camera.zoomLevel--
				this.camera.tileScaled = this.camera.tileSize + this.camera.zoomScale * this.camera.zoomLevel
				break
			case this.controls.zoomIn:
				this.camera.zoomLevel++
				this.camera.tileScaled = this.camera.tileSize + this.camera.zoomScale * this.camera.zoomLevel
				break
			case this.controls.cameraDown:
				this.camera.yOffset--
				break
			case this.controls.cameraUp:
				this.camera.yOffset++
				break
			case this.controls.cameraLeft:
				this.camera.xOffset++
				break
			case this.controls.cameraRight:
				this.camera.xOffset--
				break
		}
	}

	update() {
		for (let i = 0; i < this.input.length; i++) {
			const event = this.input[i]
			if (typeof event == 'object') this.mouseEventHandler(event)
			if (typeof event == 'string') this.keybordEventHandler(event)
		}
		this.input.length = 0
	}
}

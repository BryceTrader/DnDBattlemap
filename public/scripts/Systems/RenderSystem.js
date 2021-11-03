class RenderSystem extends BaseSystem {
	constructor(context, canvas) {
		super('RenderSystem')
		this.context = context
		this.canvas = canvas
	}

	onScreen(curX, curY, width, height) {
		if (curX < 0 || curX > width) return false
		if (curY < 0 || curY > height) return false
		return true
	}

	update(entities) {
		this.context.imageSmoothingEnabled = false
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		const camera = GM.systems[GM.systemsDictionary['CameraSystem']]

		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i]

			// Onscreen check
			const currentPosX = entity.components['Position'].x + camera.xOffset
			const currentPosY = entity.components['Position'].y + camera.yOffset
			if (!this.onScreen(currentPosX, currentPosY, camera.width, camera.height)) continue

			// Getting drawing information
			const image = entity.components['Sprite'].spriteImage
			const sx = entity.components['Animator'].spriteSheetX
			const sy = entity.components['Animator'].spriteSheetY
			const sWidth = entity.components['Animator'].spriteSize
			const sHeight = sWidth
			const dx = currentPosX * camera.tileScaled
			const dy = currentPosY * camera.tileScaled
			const dWidth = camera.tileScaled * (sWidth / camera.zoomScale)
			const dHeight = dWidth

			this.context.beginPath()
			this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
			this.context.closePath()
		}
	}
}

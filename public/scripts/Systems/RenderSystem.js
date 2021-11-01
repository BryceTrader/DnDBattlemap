class RenderSystem extends BaseSystem {
	constructor(context, canvas) {
		super('RenderSystem')
		this.context = context
		this.canvas = canvas
	}

	update(entities) {
		this.context.imageSmoothingEnabled = false
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		const camera = GM.systems[GM.systemsDictionary['CameraSystem']]

		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i]
			const image = entity.components['Sprite'].spriteImage
			const sx = entity.components['Animator'].spriteSheetX
			const sy = entity.components['Animator'].spriteSheetY
			const sWidth = entity.components['Animator'].spriteSize
			const sHeight = sWidth
			const dx = (entity.components['Position'].x + camera.xOffset) * camera.tileScaled
			const dy = (entity.components['Position'].y + camera.yOffset) * camera.tileScaled
			const dWidth = camera.tileScaled * (sWidth / camera.zoomScale)
			const dHeight = dWidth

			this.context.beginPath()
			this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
			this.context.closePath()
		}
	}
}

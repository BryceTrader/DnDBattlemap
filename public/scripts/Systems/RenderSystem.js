class RenderSystem extends BaseSystem {
	constructor(context, canvas, sprite_sheet) {
		super('RenderSystem')
		this.context = context
		this.canvas = canvas
		this.sprite_sheet = sprite_sheet
	}

	update(entities) {
		this.context.imageSmoothingEnabled = false
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i]
			const image = entity.components['Sprite'].spriteImage
			const sx = entity.components['Animator'].spriteSheetX
			const sy = entity.components['Animator'].spriteSheetY
			const sWidth = 32
			const sHeight = 32
			const dx = (entity.components['Position'].x + GM.xOffset) * GM.tileScaled
			const dy = (entity.components['Position'].y + GM.yOffset) * GM.tileScaled
			const dWidth = GM.tileScaled
			const dHeight = dWidth
			this.context.beginPath()
			this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
			this.context.closePath()
		}
	}
}

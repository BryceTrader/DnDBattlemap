class RenderSystem extends BaseSystem {
	constructor(context, canvas, sprite_sheet) {
		super('Render')
		this.context = context
		this.canvas = canvas
		this.sprite_sheet = sprite_sheet
	}

	update(entities) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i]

			if (!entity || !entity.components['Sprite']) continue

			this.context.beginPath()

			this.context.closePath()
		}
	}
}

class ActionSystem extends BaseSystem {
	constructor() {
		super('ActionSystem')
	}

	addEntityToManager(click) {
		const camera = GM.getCamera()

		const cX = Math.floor(click.clientX / camera.tileScaled) - camera.xOffset
		const cY = Math.floor(click.clientY / camera.tileScaled) - camera.yOffset
		if (GM.getEntityByPosition(cX, cY)) return

		const target = new Entity()
		target.addComponent(new Position(cX, cY))
		target.addComponent(new Sprite('orc'))
		target.addComponent(new Animator(target.components.Sprite.spriteName))
		GM.addEntity(target)

		GM.systems[GM.systemsDictionary.AnimationSystem].getFrameData(target.components.Animator)
	}

	removeEntityFromManager(click) {
		const camera = GM.getCamera()

		const cX = Math.floor(click.clientX / camera.tileScaled) - camera.xOffset
		const cY = Math.floor(click.clientY / camera.tileScaled) - camera.yOffset

		GM.removeEntity(GM.getEntityByPosition(cX, cY))
	}

	update() {}
}

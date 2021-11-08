class AnimationSystem extends BaseSystem {
	constructor() {
		super('AnimationSystem')
		this.animationJSON = {}
		this.frameCount = 0
	}

	getFrameData(animator) {
		animator.spriteSize = this.animationJSON.meta.size.h
		animator.frames = this.animationJSON.meta.size.w / this.animationJSON.meta.size.h
		animator.built = true
	}

	update(entities) {
		this.frameCount++
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i].components.Animator
			if (!entity.built) this.getFrameData(entity)
			if (this.frameCount % 15 == 0) {
				entity.currentFrame++
				if (entity.currentFrame > entity.frames) entity.currentFrame = 1
				entity.spriteSheetX = entity.spriteSize * (entity.currentFrame - 1)
				this.frameCount = 0
			}
		}
	}
}

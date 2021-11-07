class AnimationSystem extends BaseSystem {
	constructor() {
		super('AnimationSystem')
		this.animationJSON = {}
		this.currentFrame = 0
	}

	getFrameData(animator) {
		animator.spriteSize = this.animationJSON.meta.size.h
		animator.frames = this.animationJSON.meta.size.w / this.animationJSON.meta.size.h
		animator.built = true
	}

	update(entities) {
		this.currentFrame++
		if (this.currentFrame % 15 == 0) {
			for (let i = 0; i < entities.length; i++) {
				const entity = entities[i].components.Animator
				if (!entity.built) this.getFrameData(entity)
				entity.currentFrame++
				if (entity.currentFrame > entity.frames) entity.currentFrame = 1
				entity.spriteSheetX = entity.spriteSize * (entity.currentFrame - 1)
				this.currentFrame = 0
			}
		}
	}
}

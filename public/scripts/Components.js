class BaseComponent {
	constructor(name) {
		this.name = name
	}
}

class Position extends BaseComponent {
	constructor(x, y) {
		super('Position')
		this.x = x
		this.y = y
	}
}

class Sprite extends BaseComponent {
	constructor(name) {
		super('Sprite')
		this.spriteName = name
		this.spriteImage = new Image()
		this.spriteImage.src = `../sprites/${this.spriteName}.png`
	}
}

class Animator extends BaseComponent {
	constructor(name) {
		super('Animator')
		this.animatorName = name
		this.spriteSheetX = 0
		this.spriteSheetY = 0
		this.spriteSize = 0
		this.frames = 0
		this.currentFrame = 1
	}
}

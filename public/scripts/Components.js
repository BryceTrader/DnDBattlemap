class BaseComponent {
	constructor(name) {
		this.name = name
	}
}

class Position extends BaseComponent {
	constructor(x = 0, y = 0) {
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
		this.#setSource()
	}

	#setSource() {
		this.spriteImage.src = `../sprites/${this.spriteName}.png`
	}
}

class Animator extends BaseComponent {
	constructor(name) {
		super('Animator')
		this.animatorName = name
		this.json = `../json/${this.spriteName}.json`
		this.sizeX
		this.sizeY
		this.#getSize()
	}

	#getSize() {}
}

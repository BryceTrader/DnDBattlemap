class Entity {
	constructor() {
		this.id = uuid.v4()
		this.components = []
	}

	AddComponent(component) {
		this.components[component.name] = component
	}

	RemoveComponent(component) {
		delete this.components[component.name]
	}

	Print() {
		console.log(this.components)
	}
}

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
	constructor(spriteName) {
		super('Sprite')
		this.spriteName = spriteName
		this.spriteImage = new Image()
		this.setSource()
	}

	setSource() {
		this.spriteImage.src = `../sprites/${this.spriteName}.png`
	}
}

class Animator extends BaseComponent {
	constructor() {
		super('Animator')
	}
}

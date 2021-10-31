class Entity {
	constructor() {
		this.id = uuid.v4()
		this.components = []
	}

	addComponent(component) {
		if (component instanceof BaseComponent) {
			this.components[component.name] = component
		} else {
			console.error(`${component.constructor.name} isn't an instance of BaseComponent.`)
		}
	}

	removeComponent(component) {
		delete this.components[component.name]
	}

	print() {
		console.log(this.components)
	}
}

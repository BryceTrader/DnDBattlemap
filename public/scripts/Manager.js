class Manager {
	constructor() {
		this.entities = []
		this.systems = []
		this.systemsDictionary = {}
	}

	addEntity(entity) {
		if (entity instanceof Entity) {
			this.entities.push(entity)
		} else {
			console.error(`${entity.constructor.name} is not an instance of Entity.`)
		}
	}

	removeEntity(entityToBeRemoved) {
		for (let i = 0; i < this.entities.length; i++) {
			if (this.entities[i].id === entityToBeRemoved.id) {
				this.entities.splice(i, 1)
				break
			}
		}
	}

	addSystem(system) {
		if (!system instanceof BaseSystem) {
			console.error(`${system.constructor.name} is not an instance of BaseSystem.`)
			return
		}

		this.systemsDictionary[system.name] = Object.entries(this.systemsDictionary).length
		this.systems.push(system)
	}

	removeSystem(systemToBeRemoved) {
		for (let i = 0; i < this.systems.length; i++) {
			if (this.systems[i].name === systemToBeRemoved.name) {
				this.systems.splice(i, 1)
				break
			}
		}
	}

	checkIfSamePosition(targetX, targetY) {
		for (let i = 0; i < this.entities.length; i++) {
			const entity = this.entities[i].components.Position
			if (!entity) continue
			if (entity.x != targetX) continue
			if (entity.y === targetY) {
				return true
			}
		}
		return false
	}

	getEntityByPosition(x, y) {
		for (let i = 0; i < this.entities.length; i++) {
			const entity = this.entities[i].components.Position
			if (!entity) continue
			if (entity.x != x) continue
			if (entity.y === y) {
				return entity
			}
		}
		return null
	}

	getCamera() {
		for (let i = 0; i < this.entities.length; i++) {
			if (this.entities[i].components.Camera) return this.entities[i].components.Camera
		}
	}

	update() {
		for (let i = 0; i < this.systems.length; i++) {
			this.systems[i].update(this.entities)
		}
	}
}

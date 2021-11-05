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
		let removed = false
		for (let i = 0; i < this.entities.length; i++) {
			if (this.entities[i].id === entityToBeRemoved.id) {
				this.entities.splice(i, 1)
				removed = true
				break
			}
		}
		// for Debug
		if (removed) {
			console.log(`Entity ${entityToBeRemoved.id} has been removed.`)
		} else {
			console.log(`No entity with the ID of ${entityToBeRemoved.id} is in the system currently.`)
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

	checkSamePosition(targetX, targetY) {
		for (let i = 0; i < this.entities.length; i++) {
			const entity = this.entities[i].components.Position
			if (entity.x != targetX) continue
			if (entity.y == targetY) {
				return false
			}
		}
		return true
	}

	update() {
		for (let i = 0; i < this.systems.length; i++) {
			this.systems[i].update(this.entities)
		}
	}
}

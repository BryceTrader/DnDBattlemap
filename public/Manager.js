class Manager {
	constructor() {
		this.entities = []
		this.systems = []
		this.tileSize
		this.zoomScale
		this.zoomLevel
		this.tileScaled
		this.xOffset = 0
		this.yOffset = 0
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
		if (system instanceof BaseSystem) {
			this.systems.push(system)
		} else {
			console.error(`${system.constructor.name} is not an instance of BaseSystem.`)
		}
	}

	removeSystem(systemToBeRemoved) {
		for (let i = 0; i < this.systems.length; i++) {
			if (this.systems[i].name === systemToBeRemoved.name) {
				this.systems.splice(i, 1)
				break
			}
		}
	}

	checkSamePosition(targetEntity) {
		for (let i = 0; i < this.entities.length; i++) {
			const entity = this.entities[i].components['Position']
			if (entity.x != targetEntity.components['Position'].x) continue
			if (entity.y == targetEntity.components['Position'].y) {
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

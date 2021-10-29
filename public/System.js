class System {
  constructor() {
    this.entities = [];
    this.systems = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  removeEntity(entityToBeRemoved) {
    let removed = false;
    for (let i = 0; i < this.entites.length; i++) {
      if (this.entities[i].id === entityToBeRemoved.id) {
        this.entities.splice(i, 1);
        removed = true;
        break;
      }
    }
    if (removed) {
      console.log(`Entity ${entityToBeRemoved.id} has been removed.`);
    } else {
      console.log(
        `No entity with the ID of ${entityToBeRemoved.id} is in the system currently.`
      );
    }
  }

  addSystem(system) {
    this.systems.push(system);
  }

  update() {}
}

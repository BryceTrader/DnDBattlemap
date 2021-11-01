class NetworkSystem extends BaseSystem {
	constructor() {
		super('NetworkSystem')
	}

	update() {
		socket.on('serverUpdates', (data) => {
			GM.entities = data.entityList || []
			console.log(GM.entities)
		})
		socket.emit('playerUpdates', {
			entites: GM.entities,
		})
	}
}

class CameraSystem extends BaseSystem {
	constructor() {
		super("CameraSystem");
		this.resized = false
		GM.addEntity(new Entity().addComponent(new Camera()));
	}

	getWindowSize(camera) {
		camera.clientWidth = document.body.clientWidth;
		camera.clientHeight = document.body.clientHeight;
		camera.width = Math.floor(camera.clientWidth / camera.tileScaled);
		camera.height = Math.floor(camera.clientHeight / camera.tileScaled);
		this.resized = false
	}

	checkScaling(camera) {
		if (camera.tileScaled < camera.zoomScale) {
		camera.tileScaled = camera.zoomScale;
		camera.zoomLevel++;
	}

        if (camera.clientWidth < camera.tileScaled) {
			camera.zoomLevel--;
			camera.tileScaled =
            camera.tileSize + camera.zoomScale * camera.zoomLevel;
        }
	}

	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const camera = entities[i].component["Camera"];
			if (!camera) continue;
			this.checkScaling(camera)
			if(this.resized) this.getWindowSize(camera)
		}
	}
}

class Camera {
	constructor() {
		this.xOffset = 0
		this.yOffset = 0
		this.zoomScale = 32
		this.zoomLevel = 0
		this.tileSize = 256
		this.tileScaled = this.tileSize + this.zoomScale * this.zoomLevel
		this.clientWidth = document.body.clientWidth
		this.clientHeight = document.body.clientHeight
		this.width = Math.floor(this.clientWidth / this.tileScaled)
		this.height = Math.floor(this.clientHeight / this.tileScaled)
	}
}

function updateLoop(manager) {
	manager.update()
	requestAnimationFrame(() => updateLoop(manager))
}

function setupCanvasSystemsManager(manager) {
	// Canvases
	canvas.width = document.body.clientWidth
	canvas.height = document.body.clientHeight
	backCanvas.width = document.body.clientWidth
	backCanvas.height = document.body.clientHeight

	window.addEventListener('resize', () => {
		canvas.width = document.body.clientWidth
		canvas.height = document.body.clientHeight
		backCanvas.width = document.body.clientWidth
		backCanvas.height = document.body.clientHeight
		USER.resized.bool = true
	})

	// Systems
	const CAMERA = new Camera()
	const CameraSys = new CameraSystem(CAMERA, USER.resized)
	const InputSys = new InputSystem(USER.input, window)
	const ActionSys = new ActionSystem(
		CONFIG.controls,
		USER.input,
		CAMERA,
		(entity) => manager.addEntity(entity),
		(entity) => manager.removeEntityByPosition(entity),
		(x, y) => manager.getEntityByPosition(x, y)
	)
	const AnimationSys = new AnimationSystem()
	const RenderSys = new RenderSystem(ctx, canvas, CAMERA)
	const BackgroundSys = new BackgroundSystem(bctx, backCanvas, CAMERA)
	// const NetworkSys = new NetworkSystem()

	// Socket.io
	socket.on('connected', (data) => {
		AnimationSys.animationJSON = data.animatedSpriteJSON
	})

	// ManagerSystems
	manager.addSystem(CameraSys)
	manager.addSystem(InputSys)
	manager.addSystem(ActionSys)
	manager.addSystem(AnimationSys)
	manager.addSystem(RenderSys)
	manager.addSystem(BackgroundSys)
	// manager.addSystem(NetworkSys)
}

const socket = io()
const canvas = document.getElementById('foreground')
const ctx = canvas.getContext('2d')
const backCanvas = document.getElementById('background')
const bctx = backCanvas.getContext('2d')

const GameManager = new Manager()
const CONFIG = {
	controls: {
		zoomIn: ']',
		zoomOut: '[',
		cameraLeft: 'a',
		cameraRight: 'd',
		cameraUp: 'w',
		cameraDown: 's',
	},
}
const USER = {
	input: [],
	resized: {
		bool: true,
	},
}
setupCanvasSystemsManager(GameManager)

updateLoop(GameManager)

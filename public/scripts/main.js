window.addEventListener('resize', () => {
	GM.systems[GM.systemsDictionary.BackgroundSystem].backgroundMoved = true
	GM.systems[GM.systemsDictionary.CameraSystem].resized = true
})

window.addEventListener('mousedown', (e) => {
	e.preventDefault()
	GM.systems[GM.systemsDictionary.InputSystem].mouseClickHandler(e)
})

window.addEventListener('contextmenu', (e) => {
	e.preventDefault()
})

window.addEventListener('keydown', (key) => {
	GM.systems[GM.systemsDictionary.InputSystem].keyInput.push(key.key)
})

function updateLoop(manager) {
	manager.update()
	requestAnimationFrame(() => updateLoop(manager))
}

function setupCanvasSystemsManager(GM) {
	// Canvases
	canvas.width = document.body.clientWidth
	canvas.height = document.body.clientHeight
	backCanvas.width = document.body.clientWidth
	backCanvas.height = document.body.clientHeight

	// Systems
	const CameraSys = new CameraSystem()
	const InputSys = new InputSystem(CONFIG.controls)
	const ActionSys = new ActionSystem()
	const AnimationSys = new AnimationSystem()
	const RenderSys = new RenderSystem(ctx, canvas)
	const BackgroundSys = new BackgroundSystem(bctx, backCanvas)
	// const NetworkSys = new NetworkSystem()

	// Socket.io
	socket.on('connected', (data) => {
		AnimationSys.animationJSON = data.animatedSpriteJSON
	})

	// ManagerSystems
	GM.addSystem(CameraSys)
	GM.addSystem(InputSys)
	GM.addSystem(ActionSys)
	GM.addSystem(AnimationSys)
	GM.addSystem(RenderSys)
	GM.addSystem(BackgroundSys)
	// GM.addSystem(NetworkSys)
}

const socket = io()
const canvas = document.getElementById('foreground')
const ctx = canvas.getContext('2d')
const backCanvas = document.getElementById('background')
const bctx = backCanvas.getContext('2d')

const GM = new Manager()
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
setupCanvasSystemsManager(GM)

updateLoop(GM)

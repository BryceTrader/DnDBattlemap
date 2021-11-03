const socket = io()
const canvas = document.getElementById('foreground')
const ctx = canvas.getContext('2d')

const backCanvas = document.getElementById('background')
const bctx = backCanvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
backCanvas.width = document.body.clientWidth
backCanvas.height = document.body.clientHeight

// Systems
const InputSys = new InputSystem()
const CameraSys = new CameraSystem()
const AnimationSys = new AnimationSystem()
const RenderSys = new RenderSystem(ctx, canvas)
const BackgroundSys = new BackgroundSystem(bctx, backCanvas)
// const NetworkSys = new NetworkSystem()

// Socket.io
socket.on('connected', (data) => {
	AnimationSys.animationJSON = data.animatedSpriteJSON
})

// Manager
const GM = new Manager()
GM.addSystem(InputSys)
GM.addSystem(CameraSys)
GM.addSystem(AnimationSys)
GM.addSystem(RenderSys)
GM.addSystem(BackgroundSys)
// GM.addSystem(NetworkSys)

window.addEventListener('resize', () => {
	const camera = GM.systems[GM.systemsDictionary['CameraSystem']]
	camera.getWindowSize()
	canvas.width = (camera.width + 1) * camera.tileScaled // render is base 0 grid is not... idk
	canvas.height = (camera.height + 1) * camera.tileScaled // w and h are floored
	backCanvas.width = canvas.width
	backCanvas.height = canvas.height
	grid(camera.tileScaled)
})

window.addEventListener('mousedown', (e) => {
	addEntityToManger(e)
})

window.addEventListener('keydown', (key) => {
	GM.systems[GM.systemsDictionary['InputSystem']].keyInput.push(key.code)
})

function addEntityToManger(e) {
	const camera = GM.systems[GM.systemsDictionary['CameraSystem']]
	const cX = Math.floor(e.clientX / camera.tileScaled) - camera.xOffset
	const cY = Math.floor(e.clientY / camera.tileScaled) - camera.yOffset

	target = new Entity()
	target.addComponent(new Position(cX, cY))
	target.addComponent(new Sprite('orc'))
	target.addComponent(new Animator(target.components.Sprite.spriteName))
	if (GM.checkSamePosition(target)) GM.addEntity(target)

	GM.systems[GM.systemsDictionary['AnimationSystem']].getFrameData(target.components['Animator'])
}

function grid(x) {
	const w = document.body.clientWidth
	const h = document.body.clientHeight
	bctx.clearRect(0, 0, w, h)
	for (let i = 0; i <= w; i += x) {
		bctx.beginPath()
		bctx.moveTo(i, 0)
		bctx.lineTo(i, h)
		bctx.stroke()
		bctx.moveTo(0, i)
		bctx.lineTo(w, i)
		bctx.stroke()
		bctx.closePath()
	}
}

function loop() {
	GM.update()
	grid(GM.systems[GM.systemsDictionary['CameraSystem']].tileScaled)
	requestAnimationFrame(loop)
}
loop()

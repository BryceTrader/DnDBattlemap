const socket = io()
const canvas = document.getElementById('foreground')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const backCanvas = document.getElementById('background')
const bctx = backCanvas.getContext('2d')
bctx.imageSmoothingEnabled = false

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
backCanvas.width = document.body.clientWidth
backCanvas.height = document.body.clientHeight

// Systems
const InputSys = new InputSystem()
const CameraSys = new CameraSystem()
const AnimationSys = new AnimationSystem()
const RenderSys = new RenderSystem(ctx, canvas)
// JSON for AnimationSys
socket.on('connected', (data) => {
	AnimationSys.animationJSON = data.animatedSpriteJSON
})

// Manager
const GM = new Manager()
GM.addSystem(InputSys)
GM.addSystem(CameraSys)
GM.addSystem(AnimationSys)
GM.addSystem(RenderSys)
GM.tileSize = 256
GM.zoomScale = 32
GM.zoomLevel = 0
GM.tileScaled = GM.tileSize + GM.zoomScale * GM.zoomLevel

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	backCanvas.width = window.innerWidth
	backCanvas.height = window.innerHeight
})

window.addEventListener('mousedown', (e) => {
	addEntityToManger(e)
})

window.addEventListener('keydown', (key) => {
	GM.systems[0].keyInput.push(key.code) // Fix magic number later
	for (let i = 0; i < GM.entities.length; i++) {
		const ree = GM.entities[i].components['Position']
		console.log(ree)
	}
})

function addEntityToManger(e) {
	const cX = Math.floor(e.clientX / GM.tileScaled) - GM.xOffset
	const cY = Math.floor(e.clientY / GM.tileScaled) - GM.yOffset
	target = new Entity()
	target.addComponent(new Position(cX, cY))
	target.addComponent(new Sprite('orc'))
	target.addComponent(new Animator(target.components.Sprite.spriteName))
	if (GM.checkSamePosition(target)) GM.addEntity(target)
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
	grid(GM.tileScaled)

	requestAnimationFrame(loop)
}
loop()

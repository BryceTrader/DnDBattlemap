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

const AnimationSys = new AnimationSystem()
const RenderSys = new RenderSystem(ctx, canvas)
socket.on('connected', (data) => {
	AnimationSys.animationJSON = data.animatedSpriteJSON
})
// Manager
const GM = new Manager()
GM.addSystem(AnimationSys)
GM.addSystem(RenderSys)

let baseScale = 128
const gridSize = baseScale + (baseScale % 2) * 2
grid(gridSize)

// window.addEventListener('resize', () => {
// 	canvas.width = window.innerWidth
// 	canvas.height = window.innerHeight
// 	backCanvas.width = window.innerWidth
// 	backCanvas.height = window.innerHeight
// 	grid(gridSize)
// })

window.addEventListener('mousedown', (e) => {
	const cX = Math.floor(e.clientX / gridSize) * gridSize
	const cY = Math.floor(e.clientY / gridSize) * gridSize
	target = new Entity()
	target.addComponent(new Position(cX, cY))
	target.addComponent(new Sprite('orc'))
	target.addComponent(new Animator(target.components.Sprite.spriteName))
	target.print()
	GM.addEntity(target)
})

function grid(x) {
	const w = document.body.clientWidth
	const h = document.body.clientHeight

	for (let i = 0; i <= w; i += x) {
		bctx.moveTo(i, 0)
		bctx.lineTo(i, h)
		bctx.stroke()
		bctx.moveTo(0, i)
		bctx.lineTo(w, i)
		bctx.stroke()
	}
}

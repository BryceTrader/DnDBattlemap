const canvas = document.getElementById('foreground')
const ctx = canvas.getContext('2d')
const backCanvas = document.getElementById('background')
const bctx = backCanvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
backCanvas.width = document.body.clientWidth
backCanvas.height = document.body.clientHeight

let baseScale = 267
const gridSize = baseScale + (baseScale % 2) * 2
let CANDRAW = false
let test = new Image()
test.src = 'sprites/orc.png'
test.onload = () => loadImage()
let frame = 0
let offset = 0
window.onload = () => update()

let PLAYER = new Entity()
PLAYER.AddComponent(new Position(0, 0))
PLAYER.Print()
grid(gridSize)

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	backCanvas.width = window.innerWidth
	backCanvas.height = window.innerHeight
	grid(gridSize)
})

window.addEventListener('mousedown', (e) => {
	if (!CANDRAW) return
	const cX = e.clientX
	const cY = e.clientY
	animate(cX, cY, test, 0, 0)
})

function update() {
	if (!CANDRAW) return
	frame++
	animate(0, 0, test, offset, 0)

	if (frame - 10 == 0) {
		offset += 32
		frame = 0
	}
	if (offset > 0) offset = 0
	requestAnimationFrame(update)
}

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

function loadImage() {
	CANDRAW = true
}

function drawSprite(image, sX, sY, sW, sH, dX, dY, dW, dH) {
	ctx.imageSmoothingEnabled = false
	ctx.drawImage(image, sX, sY, sW, sH, dX, dY, dW, dH)
}

function animate(cX, cY, test, a1, a2) {
	const x = Math.floor(cX / gridSize) * gridSize + 1
	const y = Math.floor(cY / gridSize) * gridSize + 1
	ctx.clearRect(x, y, gridSize, gridSize)
	drawSprite(test, a1, a2, 32, 32, x, y, gridSize - 2, gridSize - 2)
}

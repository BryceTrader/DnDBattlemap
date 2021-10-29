class AnimationSystem extends BaseSystem {
	constructor() {
		super('AnimationSystem')
		this.animationJSON = {}
	}
}
// drawSprite(sX: number, sY: number, sW: number, sH: number, dW: number, dH: number): void {
// 	// ctx.imageSmoothingEnabled = false
// 	// ctx.drawImage(this.image, sX, sY, sW, sH, this.posX, this.posY, dW, dH)
// }

// update(cX: number, cY: number, a1: number, a2: number) {
// 	// const x = Math.floor(cX / gridSize) * gridSize + 1
// 	// const y = Math.floor(cY / gridSize) * gridSize + 1
// 	// ctx.clearRect(x, y, gridSize, gridSize)
// 	// drawSprite(a1, a2, 32, 32, x, y, gridSize - 2, gridSize - 2)

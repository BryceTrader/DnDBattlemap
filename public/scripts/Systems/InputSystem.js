class InputSystem extends BaseSystem {
	constructor(input, window) {
		super('InputSystem')
		this.input = input

		this.#setup(window)
	}

	#setup(window) {
		window.addEventListener('mousedown', (e) => {
			e.preventDefault()
			this.input.push(e)
		})

		window.addEventListener('contextmenu', (e) => {
			e.preventDefault()
		})

		window.addEventListener('keydown', (key) => {
			this.input.push(key.key)
		})
	}

	update() {}
}

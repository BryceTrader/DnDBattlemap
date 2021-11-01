const fs = require('fs')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const indexRouter = require('./routes/index')

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static('public'))

app.use('/', indexRouter)

let EntityList = []

// Socket.io
io.on('connection', (socket) => {
	console.log(`Connected: ${socket.id}`)
	socket.emit('connected', {
		animatedSpriteJSON: JSON.parse(fs.readFileSync('json/Orc.json')),
		entityList: EntityList,
	})

	socket.on('playerUpdates', (data) => {
		EntityList = data.entityList
	})

	socket.emit('serverUpdates', {
		entityList: EntityList,
	})

	socket.on('disconnect', () => {
		console.log(`Disconnected: ${socket.id}`)
	})
})

server.listen(process.env.PORT || 3000, () => {
	console.log('Server is Online!')
})

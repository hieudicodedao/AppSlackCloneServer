var express = require('express')
var app = express()
require('dotenv').config()
var multer = require('multer')
var cors = require('cors')
var mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
var bodyParser = require('body-parser')
var port = process.env.PORT || 9999

const UserRoutes = require('./Routes/User')
const ChannelRoutes = require('./Routes/Channel')
const TopicRoutes = require('./Routes/Topic')
const ReplyRoutes = require('./Routes/Reply')

//
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//
// Add headers
app.use(function (req, res, next) {
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	)

	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type',
	)

	res.setHeader('Access-Control-Allow-Credentials', true)

	next()
})
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'PUT'],
		allowedHeaders: ['my-custom-header'],
		credentials: true,
	},
})
io.on('connection', (socket) => {
	//socket for channel

	app.set('io', io)
	app.set('socket', socket)

	socket.on('join-channel', (channelName) => {
		socket.channelName = channelName
		socket.join(socket.channelName)
	})

	socket.on('leave-channel', (current_channel) => {
		socket.leave(current_channel)
		socket.channelName = ''
	})
	//socket for topic

	socket.on('join-topic', (idtopic) => {
		socket.idtopic = idtopic
		socket.join(socket.idtopic)
	})

	socket.on('leave-topic', (idtopic) => {
		socket.leave(idtopic)
		socket.idtopic = ''
	})

	//socket for reply

	// socket.on('update-reply-array', ({ newReply, _id_topic }) => {
	// 	io.to(socket.channelName)
	// 		.to(socket.idtopic)
	// 		.emit('some-one-update-reply-array', { newReply, _id_topic })
	// })
	//

	socket.on('disconnect', () => {})
})
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((rs) => console.log('conneted to server'))

app.use('/api/user', UserRoutes)
app.use('/api/channel', ChannelRoutes)
app.use('/api/topic', TopicRoutes)
app.use('/api/reply', ReplyRoutes)

server.listen(port, () => {
	console.log('server is running at port : ' + port)
})

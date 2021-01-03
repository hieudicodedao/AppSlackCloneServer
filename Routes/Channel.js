var express = require('express')
var ChannelRoutes = express.Router()
var ChannelController = require('../Controller/ChannelController.js')

ChannelRoutes.post('/create', ChannelController.create)

ChannelRoutes.get('/', ChannelController.getlistchannel)

// ChannelRoutes.post('/isExistUser', ChannelController.isExistUser)

// ChannelRoutes.post('/checkUser', ChannelController.checkUser)

// ChannelRoutes.get('/isLogin', ChannelController.isLogin)

module.exports = ChannelRoutes

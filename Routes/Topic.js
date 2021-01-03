var express = require('express')
var TopicRoutes = express.Router()
var TopicController = require('../Controller/TopicController.js')

TopicRoutes.post('/create', TopicController.create)

TopicRoutes.post('/', TopicController.getlisttopic)

TopicRoutes.post('/addreply', TopicController.addReply)

// TopicRoutes.post('/checkUser', TopicController.checkUser)

// TopicRoutes.get('/isLogin', TopicController.isLogin)

module.exports = TopicRoutes

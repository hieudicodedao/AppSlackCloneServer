var express = require('express')
var TopicRoutes = express.Router()
var TopicController = require('../Controller/TopicController.js')

TopicRoutes.post('/create', TopicController.create)

TopicRoutes.post('/', TopicController.getlisttopic)

TopicRoutes.post('/addreply', TopicController.addReply)

TopicRoutes.post('/attachFile', TopicController.attachFile)

TopicRoutes.post('/uploadtocloud', TopicController.uploadToCloud)

module.exports = TopicRoutes

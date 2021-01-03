var express = require('express')
var ReplyRoutes = express.Router()
var ReplyController = require('../Controller/ReplyController.js')

ReplyRoutes.post('/create', ReplyController.create)

ReplyRoutes.post('/', ReplyController.getlistreply)

ReplyRoutes.post('/getreplyinfo', ReplyController.getreplyinfo)

// ReplyRoutes.post('/checkUser', ReplyController.checkUser)

// ReplyRoutes.get('/isLogin', ReplyController.isLogin)

module.exports = ReplyRoutes  

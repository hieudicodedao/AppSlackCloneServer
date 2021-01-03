var express = require('express')
var UserRoutes = express.Router()
var UserController = require('../Controller/UserController.js')

UserRoutes.post('/create', UserController.create)

UserRoutes.post('/upload', UserController.uploadImage)

UserRoutes.post('/isExistUser', UserController.isExistUser)

UserRoutes.post('/checkUser', UserController.checkUser)

UserRoutes.get('/isLogin', UserController.isLogin)

UserRoutes.post('/', UserController.getUserImg)

module.exports = UserRoutes

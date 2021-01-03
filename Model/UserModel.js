const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	img: String,
})

const UserModel = mongoose.model('user', UserSchema, 'User')

module.exports = UserModel

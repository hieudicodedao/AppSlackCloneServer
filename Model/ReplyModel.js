const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema({
	user: String,
	topic_id: String,
	content: String,
	date: String,
})

const ReplyModel = mongoose.model('reply', ReplySchema, 'Reply')

module.exports = ReplyModel

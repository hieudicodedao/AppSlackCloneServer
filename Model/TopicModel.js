const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
	user: String,
	channel: String,
	content: String,
	date: String,
	reply: [String],
})

const TopicModel = mongoose.model('topic', TopicSchema, 'Topic')

module.exports = TopicModel

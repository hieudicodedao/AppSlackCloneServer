const mongoose = require('mongoose')

const ChannelSchema = new mongoose.Schema({
	name: String,
})

const ChannelModel = mongoose.model('channel', ChannelSchema, 'Channel')

module.exports = ChannelModel

const TopicModel = require('../Model/TopicModel')
const UserModel = require('../Model/UserModel')
const dateFormat = require('dateformat')

module.exports.getlisttopic = async (req, res) => {
	let channelName = req.body.channelName
	let listTopic = await TopicModel.find({ channel: channelName })
	return res.json({ listTopic: listTopic })
}

module.exports.create = async (req, res) => {
	const { user, channel, content } = req.body
	const newTopic = await new TopicModel({
		user,
		channel,
		date: dateFormat(new Date(), 'dd/mm/yyyy HH:MM:ss'),
		content,
		reply: [],
	})
	newTopic.save((err) => {
		if (err) {
			return res.json({ err: 'loi' })
		}
	})
	return res.json({ newTopic })
}

module.exports.addReply = async (req, res) => {
	// id_reply
	let { id_reply, _id_topic } = req.body
	let findtopic = await TopicModel.findOne({ _id: _id_topic })
	let reply = findtopic.reply
	reply.push(id_reply)
	const result = await TopicModel.updateOne(
		{ _id: _id_topic },
		{ reply: reply },
	)
	let updateValue = await TopicModel.findOne({ _id: _id_topic })
	return res.json({ reply : updateValue.reply })
}

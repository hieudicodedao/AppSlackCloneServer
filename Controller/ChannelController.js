const ChannelModel = require('../Model/ChannelModel')
module.exports.create = async (req, res) => {
	const findChannel = await ChannelModel.findOne({ name: req.body.name })
	if (findChannel) {
		return res.json({ err: 'trung' })
	} else {
		const channel = new ChannelModel({
			name: req.body.name,
		})
		channel.save((err) => {
			if (err) return res.json({ err: 'loi' })
			return res.json({ success: 'oke' })
		})
	}
}

module.exports.getlistchannel = async (req, res) => {
	const listchannel = await ChannelModel.find({})
	return res.json({ listchannel })
}

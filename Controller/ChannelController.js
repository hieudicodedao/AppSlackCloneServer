const ChannelModel = require('../Model/ChannelModel')
module.exports.create = async (req, res) => {
	const io = req.app.get('io')
	const findChannel = await ChannelModel.findOne({ name: req.body.name })
	if (findChannel) {
		return res.json({ err: 'trung' })
	} else {
		const channel = new ChannelModel({
			name: req.body.name,
		})
		channel.save((err) => {
			if (err) return res.json({ err: 'loi' })

			let newChannel = {
				name: req.body.name,
				isJoin: false,
			}
			io.emit('some-one-add-channel', newChannel)

			return res.json({ success: 'oke' })
		})
	}
}

module.exports.getlistchannel = async (req, res) => {
	const listchannel = await ChannelModel.find({})
	return res.json({ listchannel })
}

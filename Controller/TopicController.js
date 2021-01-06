const TopicModel = require('../Model/TopicModel')
const UserModel = require('../Model/UserModel')
const dateFormat = require('dateformat')
const multer = require('multer')
var cloudinary = require('cloudinary').v2
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
})
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/attach_ready')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})
const upload = multer({ storage: storage }).array('file')

module.exports.getlisttopic = async (req, res) => {
	let channelName = req.body.channelName
	let listTopic = await TopicModel.find({ channel: channelName })
	return res.json({ listTopic: listTopic })
}
module.exports.uploadToCloud = async (req, res) => {
	const { image } = req.body
	const list_image = []
	for (let i = 0; i < image.length; ++i) {
		try {
			await cloudinary.uploader.upload(
				`public/attach_ready/${image[i]}`,
				function (error, result) {
					if (error) return res.json({ err: 'loi' })
					list_image.push(result.secure_url)
				},
			)
		} catch (error) {
			return res.json({
				err: 'some thing',
			})
		}
	}
	return res.json({ list_image })
}
module.exports.create = async (req, res) => {
	const { user, channel, content, list_image } = req.body
	//image is path to public folder
	const newTopic = await new TopicModel({
		user,
		channel,
		date: dateFormat(new Date(), 'dd/mm/yyyy HH:MM:ss'),
		content,
		reply: [],
		image: list_image,
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
	return res.json({ reply: updateValue.reply })
}

module.exports.attachFile = async (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			return res.json({ err: 'loi' })
		}

		const fileNames = []
		for (let i = 0; i < req.files.length; ++i) {
			fileNames.push(req.files[i].filename)
		}
		return res.json({ fileNames })
	})
}

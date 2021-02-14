const ReplyModel = require('../Model/ReplyModel')
const UserModel = require('../Model/UserModel')
const dateFormat = require('dateformat')

module.exports.getlistreply = async (req, res) => {
	// require _topic_id
	const { _id_topic } = req.body
	const listreply = await ReplyModel.find({ topic_id: _id_topic })
	res.json({ listreply })
}

module.exports.create = async (req, res) => {
	const io = req.app.get('io')
	const socket = req.app.get('socket')

	// username , content , _id_topic
	const { username, content, _id_topic } = req.body

	//save reply
	const newReply = new ReplyModel({
		user: username,
		topic_id: _id_topic,
		content,
		date: dateFormat(new Date(), 'dd/mm/yyyy HH:MM:ss'),
	})

	newReply.save((err) => {
		if (err) return res.json({ err: 'loi' })
	})
	io.to(socket.idtopic).emit('some-one-add-reply', newReply)

	return res.json({ newReply })
}

module.exports.getreplyinfo = async (req, res) => {
	// id reply
	let { topic_id } = req.body
	let listReply = await ReplyModel.find({ topic_id: topic_id })
	let listImgDate = []
	for (let i = 0; i < listReply.length; ++i) {
		let user = await UserModel.findOne({ username: listReply[i].user })
		let img = user.img
		let date = listReply[i].date
		listImgDate.push({
			img,
			date,
		})
	}
	let refactorlistImgDate = []
	for (let i = listImgDate.length - 1; i >= 0; --i) {
		let canAdd = true
		for (let j = 0; j < refactorlistImgDate.length; ++j) {
			if (listImgDate[i].img === refactorlistImgDate[j].img) {
				canAdd = false
				break
			}
		}
		if (canAdd === true) {
			refactorlistImgDate.push(listImgDate[i])
		}
	}
	return res.json({ refactorlistImgDate })
}

const UserModel = require('../Model/UserModel')
const multer = require('multer')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var cloudinary = require('cloudinary').v2
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
})
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/image')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})
const upload = multer({ storage: storage }).single('file')

module.exports.create = async (req, res) => {
	let { username, password, img } = req.body
	let salt = bcrypt.genSaltSync(10)
	let hashpass = bcrypt.hashSync(password, salt)
	let url_image = null
	try {
		await cloudinary.uploader.upload(
			`public/image/${img}`,
			function (error, result) {
				if (error)
					return res.json({
						err: 'some thing',
					})
				url_image = result.secure_url
			},
		)
	} catch (error) {
		return res.json({
			err: 'some thing',
		})
	}
	let newUser = new UserModel({
		username,
		password: hashpass,
		img: url_image,
	})
	newUser.save((error) => {
		if (error) {
			return res.json({
				err: 'some thing',
			})
		}
		return res.json({
			success: 'oke',
		})
	})
}

module.exports.isExistUser = async (req, res) => {
	const findUser = await UserModel.findOne({ username: req.body.username })
	if (findUser) {
		res.json({ err: 'tontai' })
		return
	}
	res.json({ success: 'oke' })
}
module.exports.uploadImage = (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			res.json({ err: 'loi clgt' })
			return
		}
		res.json({ success: req.file.filename })
	})
}

module.exports.checkUser = async (req, res) => {
	const { username, password } = req.body
	const findUser = await UserModel.findOne({ username: username })
	if (findUser) {
		let istrue = await bcrypt.compare(password, findUser.password)
		if (istrue) {
			const token = jwt.sign(
				{ _id_user: findUser._id },
				process.env.SECRET_KEY,
			)
			return res.json({ success: 'oke', token })
		} else {
			return res.json({ err: 'tontai' })
		}
	} else {
		return res.json({ err: 'tontai' })
	}
}

module.exports.isLogin = async (req, res) => {
	if (req.headers.authorization) {
		const headers = req.headers.authorization.split(' ')
		const token = headers[1]
		try {
			var decoded = jwt.verify(token, process.env.SECRET_KEY)
			const { _id_user } = decoded
			const findUser = await UserModel.findOne({ _id: _id_user })
			if (!findUser) {
				return res.json({ err: 'loi' })
			}
			return res.json({
				success: 'oke',
				username: findUser.username,
			})
		} catch (err) {
			return res.json({ err: 'loi' })
		}
	} else {
		return res.json({ err: 'loi' })
	}
}

module.exports.getUserImg = async (req, res) => {
	const findUser = await UserModel.findOne({ username: req.body.username })
	if (findUser) {
		return res.json({
			img: findUser.img,
		})
	}
	return res.json({ err: 'sai' })
}

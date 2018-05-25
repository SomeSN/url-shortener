const randomStringGen = require('../random-generation')
const mongoose = require('mongoose')
const models = require('../models')
const Url = mongoose.model('Url', models.Url)

const save = (data) => {
	data.date_created = new Date()
	const url = new Url(data)
	url.save((err, model) => {
		if (err) {
			return console.error(err)
		}
		console.log(model, 'saved!!!')
	})
}

module.exports = {
	postForm(req, res) {
		if(req.body.shortURL === undefined || req.body.shortURL === null || req.body.shortURL === ''){
			req.body.shortURL = randomStringGen.randomStringGenerator()
			res.status(200).send({
				message: `Success! Your URL has been created: ${req.body.shortURL}`,
				shortURL: req.body.shortURL,
				originalURL: req.body.originalURL
			})
			save(req.body)
		} else {
			res.status(200).send({
				message: `Success! Your URL has been created: ${req.body.shortURL}`,
				shortURL: req.body.shortURL,
				originalURL: req.body.originalURL
			})
			save(req.body)
		}
	},
    doRedirect(req, res) {
        const shortcode = req.params.shortcode
console.log(shortcode)
        Url.findOne({ 'shortURL': shortcode }, function (err, matchedItem) {
            if (err) {
                console.error(err)
                return
            }
            //res.status(200).send(matchedItem)
            try {
				console.log('trying to redirect...')
				console.log(matchedItem)
				res.redirect(matchedItem.originalURL)
			} catch (e) {
				console.log('Error finding match!!!!')
				console.error(e)
			}
        })

    }
}

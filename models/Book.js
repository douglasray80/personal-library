const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String
	},
	comments: [{ body: String, date: Date }]
});

module.exports = new mongoose.model('Book', bookSchema);

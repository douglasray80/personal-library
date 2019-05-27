const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	comments: [{ text: { type: String, required: true }, date: Date }]
});

module.exports = new mongoose.model('Book', bookSchema);

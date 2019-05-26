/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const Book = require('../models/Book');

module.exports = function(app) {
	app
		.route('/api/books')
		.get(function(req, res) {
			Book.find((err, data) => {
				if (err) {
					res.json(err);
				} else {
					const books = data.reduce((arr, book) => {
						arr.push({
							_id: book._id,
							title: book.title,
							commentcount: book.comments.length
						});
						return arr;
					}, []);

					res.json(books);
				}
			});
		})

		.post(function(req, res) {
			const title = req.body.title;
			if (!title) return res.json({ error: 'Error: no title given' });

			const book = new Book({ title });
			book.save((err, data) => {
				if (err) {
					res.json(err);
				} else {
					res.json({ _id: data._id, title });
				}
			});
		})

		.delete(function(req, res) {
			//if successful response will be 'complete delete successful'
		});

	app
		.route('/api/books/:id')
		.get(function(req, res) {
			const bookid = req.params.id;
			//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
			Book.findById(bookid, (err, data) => {
				if (err) {
					console.log(err.message);
					res.json(err.message);
				} else {
					console.log(data);
					res.json(data);
				}
			});
		})

		.post(function(req, res) {
			var bookid = req.params.id;
			var comment = req.body.comment;
			//json res format same as .get
		})

		.delete(function(req, res) {
			var bookid = req.params.id;
			//if successful response will be 'delete successful'
		});
};

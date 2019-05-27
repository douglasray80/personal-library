const Book = require('../models/Book');

function getAllBooks(req, res) {
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
}

function addBook(req, res) {
	const title = req.body.title;
	if (!title) return res.json({ error: 'error, no title given' });

	const book = new Book({ title });
	book.save((err, data) => {
		if (err) {
			res.json(err);
		} else {
			res.json({ _id: data._id, title });
		}
	});
}

function deleteAllBooks(req, res) {
	Book.deleteMany((err, data) => {
		if (err) {
			res.json({ error: 'error, delete unsuccessful' });
		} else {
			res.json({ message: 'complete delete successful' });
		}
	});
}

function getBook(req, res) {
	const bookId = req.params.id;
	Book.findById(bookId, (err, data) => {
		if (err) {
			res.json({ error: `error, _id: ${bookId} not in database` });
		} else {
			res.json(data);
		}
	});
}

function addCommentToBook(req, res) {
	const timestamp = new Date();
	const bookId = req.params.id;
	const { comment } = req.body;

	Book.findById(bookId, (_, data) => {
		data.comments.push({ text: comment, date: timestamp });
		data.save((err, data) => {
			if (err) {
				res.json({ error: 'error, failed to post comment' });
			} else {
				res.json(data);
			}
		});
	});
}

function deleteBook(req, res) {
	const bookId = req.params.id;
	Book.findByIdAndDelete(bookId, (err, data) => {
		if (err) {
			res.json({ error: 'error, delete unsuccessful' });
		} else {
			res.json({ message: 'delete successful' });
		}
	});
}

module.exports = {
	addBook,
	addCommentToBook,
	deleteAllBooks,
	deleteBook,
	getAllBooks,
	getBook
};

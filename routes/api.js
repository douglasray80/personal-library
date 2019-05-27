/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const controllers = require('../controllers');

module.exports = function(app) {
	app
		.route('/api/books')
		.get(controllers.getAllBooks)
		.post(controllers.addBook)
		.delete(controllers.deleteAllBooks);

	app
		.route('/api/books/:id')
		.get(controllers.getBook)
		.post(controllers.addCommentToBook)
		.delete(controllers.deleteBook);
};

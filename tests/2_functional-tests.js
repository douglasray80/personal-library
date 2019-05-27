/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
	suite('Routing tests', function() {
		suite(
			'POST /api/books with title => create book object/expect book object',
			function() {
				test('Test POST /api/books with title', function(done) {
					chai
						.request(server)
						.post('/api/books')
						.send({
							title: 'Some Book Title'
						})
						.end(function(err, res) {
							assert.equal(res.status, 200);
							assert.equal(
								res.type,
								'application/json',
								'Response should be json'
							);
							assert.equal(
								res.body.title,
								'Some Book Title',
								'Response should contain book title'
							);
							assert.property(res.body, '_id', 'Response should contain _id');
							done();
						});
				});

				test('Test POST /api/books with no title given', function(done) {
					chai
						.request(server)
						.post('/api/books')
						.send({})
						.end(function(err, res) {
							assert.equal(res.status, 200);
							assert.equal(
								res.type,
								'application/json',
								'Response should be json'
							);
							assert.equal(res.body.error, 'error, no title given');
							done();
						});
				});
			}
		);

		suite('GET /api/books => array of books', function() {
			test('Test GET /api/books', function(done) {
				chai
					.request(server)
					.get('/api/books')
					.end(function(err, res) {
						assert.equal(res.status, 200);
						assert.isArray(res.body, 'response should be an array');
						assert.property(
							res.body[0],
							'commentcount',
							'Books in array should contain commentcount'
						);
						assert.property(
							res.body[0],
							'title',
							'Books in array should contain title'
						);
						assert.property(
							res.body[0],
							'_id',
							'Books in array should contain _id'
						);
						done();
					});
			});
		});

		suite('GET /api/books/[id] => book object with [id]', function() {
			test('Test GET /api/books/[id] with id not in db', function(done) {
				chai
					.request(server)
					.get('/api/books/12345')
					.end(function(err, res) {
						assert.equal(res.status, 200);
						assert.equal(
							res.type,
							'application/json',
							'Response should be json'
						);
						assert.equal(res.body.error, 'error, _id: 12345 not in database');
						done();
					});
			});

			test('Test GET /api/books/[id] with valid id in db', function(done) {
				chai
					.request(server)
					.get('/api/books/5cebde15dcdac2450a0b6a54')
					.end(function(err, res) {
						assert.equal(res.status, 200);
						assert.equal(
							res.type,
							'application/json',
							'Response should be json'
						);
						assert.property(
							res.body,
							'_id',
							'Response should contain book _id'
						);
						assert.equal(res.body._id, '5cebde15dcdac2450a0b6a54');
						assert.property(
							res.body,
							'title',
							'Response should contain book title'
						);
						assert.property(
							res.body,
							'comments',
							'Response should contain book title'
						);
						assert.isArray(
							res.body.comments,
							'Response should contain an array of comments'
						);
						done();
					});
			});
		});

		suite('POST /api/books/[id] => post comment book object/', function() {
			test('Test POST /api/books/[id] comment posted successfully', function(done) {
				chai
					.request(server)
					.post('/api/books/5cebde15dcdac2450a0b6a54')
					.send({ comment: 'test comment' })
					.end(function(err, res) {
						assert.equal(res.status, 200);
						assert.equal(
							res.type,
							'application/json',
							'Response should be json'
						);
						assert.property(
							res.body,
							'_id',
							'Response should contain book _id'
						);
						assert.equal(res.body._id, '5cebde15dcdac2450a0b6a54');
						assert.property(
							res.body,
							'title',
							'Response should contain book title'
						);
						assert.property(
							res.body,
							'comments',
							'Response should contain book title'
						);
						assert.isArray(
							res.body.comments,
							'Response should contain an array of comments'
						);
						done();
					});
			});

			test('Test POST /api/books/[id] error posting comment', function(done) {
				chai
					.request(server)
					.post('/api/books/5cebde15dcdac2450a0b6a54')
					.send({})
					.end(function(err, res) {
						assert.equal(res.status, 200);
						assert.equal(
							res.type,
							'application/json',
							'Response should be json'
						);
						assert.equal(res.body.error, 'error, failed to post comment');
						done();
					});
			});
		});

		suite(
			'DELETE /api/books/[id] => delete book/expect return text',
			function() {
				test('Test DELETE /api/books/[id] book deleted successfully', function(done) {
					chai
						.request(server)
						.delete('/api/books/5cebde3b7c70424530d52367')
						.send()
						.end(function(err, res) {
							assert.equal(res.status, 200);
							assert.equal(
								res.type,
								'application/json',
								'Response should be json'
							);
							assert.equal(res.body.message, 'delete successful');
							done();
						});
				});

				test('Test DELETE /api/books[id] delete unsuccessful, error returned', function(done) {
					chai
						.request(server)
						.delete('/api/books/12354123')
						.send()
						.end(function(err, res) {
							assert.equal(res.status, 200);
							assert.equal(
								res.type,
								'application/json',
								'Response should be json'
							);
							assert.equal(res.body.error, 'error, delete unsuccessful');
							done();
						});
				});
			}
		);

		suite(
			'DELETE /api/books => delete all books, return success message',
			function() {
				test('Test DELETE /api/books successful deletion', function(done) {
					chai
						.request(server)
						.delete('/api/books')
						.end(function(err, res) {
							assert.equal(res.status, 200);
							assert.equal(
								res.type,
								'application/json',
								'Response should be json'
							);
							assert.equal(res.body.message, 'complete delete successful');
							done();
						});
				});
			}
		);
	});
});

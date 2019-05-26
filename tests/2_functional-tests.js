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
	/*
	 * ----[EXAMPLE TEST]----
	 * Each test should completely test the response of the API end-point including response status code!
	 */
	// test('#example Test GET /api/books', function(done) {
	// 	chai
	// 		.request(server)
	// 		.get('/api/books')
	// 		.end(function(err, res) {
	// 			assert.equal(res.status, 200);
	// 			assert.isArray(res.body, 'response should be an array');
	// 			assert.property(
	// 				res.body[0],
	// 				'commentcount',
	// 				'Books in array should contain commentcount'
	// 			);
	// 			assert.property(
	// 				res.body[0],
	// 				'title',
	// 				'Books in array should contain title'
	// 			);
	// 			assert.property(
	// 				res.body[0],
	// 				'_id',
	// 				'Books in array should contain _id'
	// 			);
	// 			done();
	// 		});
	// });
	/*
	 * ----[END of EXAMPLE TEST]----
	 */

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
							assert.equal(res.body.error, 'Error: no title given');
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
						assert.equal(res.body.error, 'Error: id not in database');
						done();
					});
			});

			test('Test GET /api/books/[id] with valid id in db', function(done) {
				chai
					.request(server)
					.get('/api/books/5ceaeaa7f3f04f0a6d069f45')
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
						assert.property(
							res.body,
							'title',
							'Response should contain book title'
						);
						done();
					});
			});
		});

		suite(
			'POST /api/books/[id] => add comment/expect book object with id',
			function() {
				test('Test POST /api/books/[id] with comment', function(done) {
					//done();
				});
			}
		);
	});
});

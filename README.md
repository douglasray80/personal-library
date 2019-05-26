## **FreeCodeCamp**- Information Security and Quality Assurance

Project Personal Library

1. ADD YOUR MongoDB connection string to .env without quotes as db
   `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
2. SET NODE_ENV to `test` without quotes
3. You need to create all routes within `routes/api.js`
4. You will add any security features to `server.js`
5. You will create all of the functional tests in `tests/2_functional-tests.js`

## User stories:

<li>Nothing from my website will be cached in my client as a security measure.</li>
<li>I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.</li>
<li>I can <b>post</b> a <code>title</code> to /api/books to add a book and returned will be the object with the <code>title</code> and a unique <code>_id</code>.</li>
<li>I can <b>get</b> /api/books to retrieve an aray of all books containing <code>title</code>, <code>_id</code>, & <code>commentcount</code>.</li>
<li>I can <b>get</b> /api/books/{_id} to retrieve a single object of a book containing <code>title</code>, <code>_id</code>, & an array of <code>comments</code> (empty array if no comments present).</li>
<li>I can <b>post</b> a <code>comment</code> to /api/books/{_id} to add a comment to a book and returned will be the books object similar to <b>get</b> /api/books/{_id}.</li>
<li>I can <b>delete</b> /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.</li>
<li>If I try to request a book that doesn't exist I will get a 'no book exists' message.</li>
<li>I can send a <b>delete</b> request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.</li>
<li>All 6 functional tests required are complete and passing.</li>

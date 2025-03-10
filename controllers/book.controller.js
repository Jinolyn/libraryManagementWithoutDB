const express = require('express');
const router = express.Router();

let books = [];
let nextId = 1;

// Route to show all books
router.get('/', (req, res) => {
    res.render('books/index', { books });
});

// Route to display addOEdit form
router.get('/addOrEdit/:id?', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id)) || {};
    res.render('books/addOrEdit', { book });
});

// Route to display book's details
router.get('/view/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.render('books/view', { book });
    } else {
        res.status(404).send('Book not found');
    }
});

// Route to add or edit book
router.post('/addOrEdit', (req, res) => {
    const { id, title, author, publishedYear, price } = req.body;
    if (id) {
        // update data
        const bookIndex = books.findIndex(b => b.id === parseInt(id));
        if (bookIndex !== -1) {
            books[bookIndex] = { id: parseInt(id), title, author, publishedYear: parseInt(publishedYear), price: parseFloat(price) };
        } else {
            res.status(404).send('Book not found');
            return;
        }
    } else {
        // Add book
        const newBook = { id: nextId++, title, author, publishedYear: parseInt(publishedYear), price: parseFloat(price) };
        books.push(newBook);
    }
    res.redirect('/books');
});

// Route to delete book
router.post('/delete/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.redirect('/books');
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports = router;

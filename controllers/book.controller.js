const express = require('express');
const router = express.Router();

const books = require('../models/book.model')

router.get('/', (req, res)=>{
    res.render("books/index", { books})
});

router.get('/addOrEdit', (req, res)=>{
    const book = books.find(b => b.id === req.params.id || {} )
    res.render('books/addOrEdit', {book})
})

// Update data
router.get('/addOrEdit/:id', (req, res)=>{
    const {id, title, author, publishedYear, price} = req.body;
    
    const index = books.findIndex(b=> b.id === id);
    if(index !== -1){
        books[index] = [id, title, author, publishedYear, price];
    }
    res.redirect('/');
})

// read
router.get('/view/:id', (req, res)=>{
    const book = books.find(b => b.id === req.params.id);
    if(book){
        res.render('books/view', {book});
    }else{
        res.status(404).send('Book not found');
    }
});


router.post('/addOrEdit', (req, res)=>{
    const {id, title, author, publishedYear, price} = req.body;
    if(id){
        // update data book 
        const index = books.findIndex(b=> b.id === id);
        if(index !== -1){
            books[index] = [id, title, author, publishedYear, price];
        }
    }else{
        // add new book
        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            publishedYear,
            price
        };
        books.push(newBook);
    }
    res.redirect('/books')
});

// Delete 
router.post('/delete/:id', (req, res)=>{
    const index =books.findIndex(b => b.id === req.params.id);
    if(index !== -1){
        books.splice(index, 1);
    }
    res.redirect('/books');
});

module.exports = router
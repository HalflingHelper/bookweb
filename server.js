const express = require('express');
const path = require('path')

const books = require('google-books-search');

const app = express();
app.use(express.text({limit:'1mb'}))
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {

    books.search(req.body, function(error, results) {
        if ( ! error ) {
            console.log(results);
        } else {
            console.log(error);
        }
    });

    res.json(req.body)
});


app.listen(port);

// Google Books API package!
// https://www.npmjs.com/package/google-books-search
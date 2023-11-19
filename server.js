const express = require('express');
const books = require('google-books-search'); // https://www.npmjs.com/package/google-books-search

const port = 3000;

const app = express();

app.use(express.text({limit:'1mb'}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    let list = books.search(req.body, (error, results) => {
        if ( ! error ) {
            res.json(results);
        } else {
            console.log(error);
        }
    });
});

app.use(function(req, res, next){
    // res.status(404).send("Sorry, page not found");
    res.status(404).render('404_error.ejs', {title: "Sorry, page not found"});

});

app.listen(port);

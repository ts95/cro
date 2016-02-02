'use strict';

var express         = require('express');
var partials        = require('express-partials');
var Api             = require('./api.js');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/public', express.static('./public'));
app.use(partials());

app.get('/', function(req, res, next) {
    var q = req.query.q ? req.query.q.toLowerCase() : null;

    if (q) {
        Api.query(q)
            .then(html => {
                res.render('index.ejs', {
                    query: q,
                    contents: html,
                });
            })
            .catch(err => {
                next(err);
            });
    } else {
        res.render('index.ejs', {
            query: '',
            contents: '',
        });
    }
});

app.listen(8008, function() {
    console.log('cro running');
});

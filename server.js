//stale
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const hbs = require('express-handlebars');
const path = require("path");

app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))
app.use(express.static('static/cwiczenia/lekcja1'))
app.use(express.static('static/cwiczenia/lekcja2'))
app.use(express.static('static/cwiczenia/lekcja3'))


app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');
let context = {}
app.get("/", function (req, res) {
    fs.readdir(__dirname + "/static/cwiczenia/", function (err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach((dir) => {
            fs.readdir(`static/cwiczenia/${dir}`, (err, SFiles) => {

                if (err) {
                    return console.log(err);
                }
                if (dir == 'lekcja1') {
                    context.lekcja1 = SFiles;
                } else if (dir == 'lekcja2') {
                    context.lekcja2 = SFiles;
                } else if (dir == 'lekcja3') {
                    context.lekcja3 = SFiles;
                    if (context.lekcja1 && context.lekcja2 && context.lekcja3) {
                        res.render('index.hbs', context);
                    }
                }
            })
        })
    });
})
//nasluch
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

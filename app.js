/*
 進入點
 */
var express = require('express');
var upload=require('./routes/upload.js');
var format = require('util').format;
var app = express();


app.configure(function() {
    //運用jade為views engine
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'jade');
    //app.use(express.logger('dev'));
    /* 'default', 'short', 'tiny', 'dev' */
//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view options', {
    layout: false
    });
app.set('port', process.env.PORT || 80);
app.use(express.logger());
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.methodOverride());
app.use(express.bodyParser());
    app.use(app.router);
});

app.get('/upload', function (req, res) {
        res.render('upload');//res.sendfile(__dirname + '/upload.html');
                });
app.get('/import', function (req, res) {
        res.render('import.html');//res.sendfile(__dirname + '/import.html');
                        });
app.post('/upload', upload.uploadFile);
app.post('/import', upload.importDb);


app.listen(80);

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const cookieParser = require('cookie-parser');
const sessionParser = require('cookie-session');

const config = require('./config/config');

let port = config.serverPort;
if (process.argv.length == 3) {
    port = parseInt(process.argv[2]);
}

let app = express();

console.log('server port: ', port);
app.listen(port);


app.use(cookieParser());
app.use(sessionParser({keys:['123456','abcdef']}));

//post file 
let upload = multer({dest:'./upload'});
global.upload = upload;

//post url-encoded
app.use(bodyParser.urlencoded({extended:true}));

//ejs render
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', consolidate.ejs);

app.use('/', require('./routers/main-router'));

app.use(express.static('./www'));


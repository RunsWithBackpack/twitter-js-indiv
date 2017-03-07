const express = require( 'express' );
const app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
const routes = require('./routes');
let bodyParser = require('body-parser');


var socketio = require('socket.io');


//app.use('/', routes);>>> I FIGURE THIS GOES BELOW MORGAN

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/', routes(io));

app.use(express.static('public'));

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
});

nunjucks.configure('views', { noCache: true })




//ORIGINAL ROUTE
// app.get('/', function(req, res){
// 	//console.log(req);
// 	const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// 	//res.send("It works!");
// })











var server = app.listen(3000);
var io = socketio.listen(server);


// app.listen(3000, function () {
//   console.log('Listening on 3000!');
// });
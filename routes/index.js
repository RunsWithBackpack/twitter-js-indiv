const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');


router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// router.get('/stylesheets/style.css', function(req, res){
// 	res.sendFile('/Users/alyssaramsey/Desktop/Projects/twitter-js-indiv/public/stylesheets/style.css')
// })

// router.get('/test',function(req,res){
//  res.send('testtest');
// })

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  console.log("user name:", name);
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweets, user: name, showForm: true } );
});


router.get('/tweets/:id', function(req, res) {
  var id = req.params.id;
  console.log("ID is ", id);
  var tweets = tweetBank.find( {id: +id} );
  res.render( 'index', { tweets: tweets } );
});


router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

io.sockets.emit('newTweet', { /* tweet info */ });

module.exports = function(io){
	return router;
};



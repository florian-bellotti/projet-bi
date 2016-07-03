var express = require('express'),
  app = express(),
  generator = require('./controllers/generator');

app.use('/public', express.static(__dirname + '/public'))
.use('/node_modules', express.static(__dirname + '/node_modules'))
.set('view engine', 'jade')

// import all generator's routes
.use('/generator', generator)

// redirect if url don't match
.use(function(req, res, next){
    res.redirect('/generator');
})

// open the sever on port 8080
.listen(8080, function () {
  console.log('Listening on port 8080!');
});
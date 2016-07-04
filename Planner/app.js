var express = require('express'),
  app = express();

app.use('/public', express.static(__dirname + '/public'))

// open the sever on port 8080
.listen(8080, function () {
  console.log('Listening on port 8080!');
});
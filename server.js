var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'hr')));

var port = 8080;

app.listen(port, function (err){
	if (err) {
		console.log(err);
		return;
	}
	console.log('listen to: http://loaclhost:' + port);
});
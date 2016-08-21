var express = require('express');
var app = express();
var port = process.env.PORT || 9001;

// SETUP SERVER
app.use('/app', express.static(__dirname + '/app'));
app.get('/data', function (req, res) {
	res.sendFile(__dirname+'/data.json');
});
app.get('*', function(req, res){
	res.sendFile(__dirname + '/app/index.html');
});


app.listen(port, function (){
	console.log('server started at ' + port);
});


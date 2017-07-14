/* SET UP YOUR MAIN VARIABLES */
var express = require('express'),
	config = require('./server/configure'),
	app = express(),
	mongoose = require('mongoose');
	https = require('https'),
	http = require('http'),
	fs = require('fs'),
	options = {
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem')
	};

/* CALL THE MODULE.EXPORTS CONSTRUCTOR FUNCTION OF THE CONFIGURE FILE THIS ADDS TO APP AND RETURNS APP
THIS IS DONE SO WE DO NOT HAVE TO WRITE A BUNCH OF CODE IN OUR INDEX FILE. */
app = config(app);

/*CONNECT TO MONGOOSE*/
mongoose.connect('mongodb://127.0.0.1/classProject');
mongoose.connection.on('open',function(){
	console.log('Mongoose Connected.')
});

/* THE DEFAULT PORT FOR HTTPS IS 443.*/
app.set('port',process.env.PORT || 443);

/* MAKE THE VIEWS DIRECTORY SO WE CAN SERVE UP THE FILES WITHIN THAT DIRECTORY */
app.set('views', __dirname + '/views');

/*LISTEN ON PORT 80 */
http.createServer(app).listen(80);

https.createServer(options, app).listen(app.get('port'),function(){
	console.log('Server up : https://45.55.242.213:' + app.get('port'));
});

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(expressSession);


var port = process.env.PORT || 4000;
var dbUrl = 'mongodb://localhost/theater';
var path = require('path');

mongoose.connect(dbUrl);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './app/views/pages');
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: false 
}));
app.use(bodyParser.json({
	limit: '50mb'
}));
app.use(cookieParser());
app.set('view engine', 'jade');

app.use(expressSession({
	secret: 'lynn',
	store: new mongoStore({
		url: dbUrl,
		colletion: 'sessions'
	})
}));


app.listen(port, function() {
	console.log('listening on ' + port);
});
app.locals.moment = require('moment');

// if ('development' === app.get('env')) {
// 	app.set('showStackError', true);
// 	// app.use(express.logger(':method :url :status'));
// 	app.locals.pretty = true;
// 	mongoose.set('debug', true);
// }



require('./config/router')(app);




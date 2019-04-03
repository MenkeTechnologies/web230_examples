/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/home'),
	names= require('../controllers/names')

module.exports = function(app){
	/* HOME */
	router.get('/', home.index);
	router.get('/diff', home.diff);
	router.get('/names', names.getNames);


	app.use(router);
}

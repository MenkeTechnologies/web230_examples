/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	userdocs = require('../controllers/user/docs');
	login = require('../controllers/user/login');
	admin = require('../controllers/admin/home');
	admindocs = require('../controllers/admin/docs');
	multer = require('multer');

module.exports = function(app){
	/* USER ROUTES */
	router.get('/user/', home.index);
	router.get('/user/about', home.about);
	router.get('/user/login', login.index);
	router.post('/user/login', login.access);
	router.get('/user/docs', userdocs.showDoc);

	/* ADMIN ROUTES */
	router.get('/admin/', admin.index);
	router.get('/admin/about/', admin.about);
	router.get('/admin/logout/', login.logout);
	router.get('/admin/adddoc/', admindocs.index);
	router.get('/admin/showdoc/', admindocs.showDoc);

	router.post('/admin/', admin.postindex);
	router.post('/admin/about/', admin.postabout);
	router.post('/admin/adddoc/',multer({dest:'./public/docs'}).single('file'),admindocs.addDoc);
	router.post('/admin/deletedoc/', admindocs.deleteDoc);

	app.use(router);
}
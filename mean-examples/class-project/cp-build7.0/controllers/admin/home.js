var db = require('../../server/db'),
    mysql = require('mysql'),
    /* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
    pool = db.connect(),

    /*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
    tinyMCE = '<script src="//cdn.tinymce.com/4/tinymce.min.js"></script><script src="/public/js/tinymce.js"></script>',
    js = '<script src="/public/js/Ajax.js"></script>';
    js += '<script src="/public/js/main.js"></script>';

module.exports = {

    /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
        if(req.session.success){
            pool.getConnection(function(err, connection){
                if(err){
                    console.log(err);
                }
                else {
                    var sql = "SELECT text FROM ?? WHERE name = ?";
                    /*I USED THE INSERTS HERE TO DESIGNATE WHETHER GETTING DATA FROM HOME OR ADMIN  I DID THIS THROUGHOUT THIS PAGE*/
                    var inserts = ['content','home'];
                    sql = mysql.format(sql, inserts);
                    connection.query(sql, function(error, results, fields){
                        if(error){
                            console.log(error);
                        }
                        else {
                            res.render('admin/home',{pageData: results[0].text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true, tinyMCE: tinyMCE, js: js});
                            connection.release();

                            /* HANDLE ERROR AFTER RELEASE*/
                            if(error) throw error;
                        }
                    });
                }
            });
        }
        /*IF THERE IS NO SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
        }
    },
    about: function(req, res){
        if(req.session.success){
            pool.getConnection(function(err, connection){
                if(err){
                    console.log(err);
                }
                else {
                    /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
                    var sql = "SELECT text FROM ?? WHERE name = ?";
                    var inserts = ['content','about'];
                    sql = mysql.format(sql, inserts);
                    connection.query(sql, function(error, results, fields){
                        if(error){
                            console.log(error);
                        }
                        else {
                            res.render('admin/home',{pageData: results[0].text, title: 'Admin About Page', heading: 'Admin About Page', admin: true, tinyMCE: tinyMCE, js: js});
                            connection.release();

                            /* HANDLE ERROR AFTER RELEASE*/
                            if(error) throw error;
                        }
                    });
                }
            });
        }
        /*IF THERE IS NO SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
        } 

    },
    postindex: function(req, res){
        var data = req.body.data;
        
        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                var sql = "UPDATE content SET text = ? WHERE name = ?";
                var inserts = [data,'home'];
                sql = mysql.format(sql, inserts);
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                        res.send('error');
                    }
                    else {
                        /*I USED SEND HERE BECAUSE I AM RESPONDING TO AN AJAX REQUEST*/
                        res.send('success');
                        connection.release();

                        /* HANDLE ERROR AFTER RELEASE*/
                        if(error) throw error;
                    }
                });
            }
        });
    },
    postabout: function(req, res){
        var data = req.body.data;
        
        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                var sql = "UPDATE content SET text = ? WHERE name = ?";
                var inserts = [data,'about'];
                sql = mysql.format(sql, inserts);
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                        res.send('error');
                    }
                    else {
                        res.send('success');
                        connection.release();

                        /* HANDLE ERROR AFTER RELEASE*/
                        if(error) throw error;
                    }
                });
            }
        });
    }
}
 
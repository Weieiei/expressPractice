var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function (req, res) {
    //res.render('index');

    //always render index here when you have the link '/'
    res.render('index', {
        randomString: "hello"
    });
});

//middleware (will go to the function makeSureLegit for verification before going to function(req,res))
router.post('/form', makeSureLegit,function (req, res) {
    //var email = req.body.email;  get the input
    var fname = req.body.firstname;
    var lname = req.body.lastname;

        res.render('loggedin', {
            fname: fname,   //pass some variables to the view loggedin.handlebars
            lname: lname
        });

    //res.render('index'); stay on same link but shows another view
    //res.redirect('/'); will redirect to this link but if there is a router.get('/') it will go to it
    //res.sendStatus('500');    for errors
});

function makeSureLegit(req, res, next) {
    if (req.body.secret == "secret") {
        next();  //If verification is ok it will go back to router.post('/form') above and go inside the function
    } else {
        res.render('index', {msg: "Failed"}); //if verification is not good, it will not proceed inside the function but to index
    }
}

module.exports = router;
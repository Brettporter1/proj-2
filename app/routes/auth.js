const authController = require('../controllers/authcontroller.js');
const passport = require('passport')
 
 
module.exports = function(app, passport) {
 
    app.get('/register', authController.register);
 
 
    app.get('/login', authController.login);
 
    app.get('/amidrunk', isLoggedIn, authController.amidrunk);

    app.get('/logout',authController.logout);

//     // app.post('/login', passport.authenticate('local-login', {
//     //     successRedirect: '/amidrunk',

//     //     failureRedirect: '/login'
//     // }
//     // ));

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/login');
     
    }






 
 
 
}
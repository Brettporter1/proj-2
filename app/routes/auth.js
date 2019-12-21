var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
    app.get('/register', authController.register);
 
 
    app.get('/login', authController.login);
 
 
    app.post('/register', passport.authenticate('local-register', {
            successRedirect: '/amidrunk',
 
            failureRedirect: '/register'
        }
 
    ));

    app.get('/amidrunk',authController.amidrunk);



 
 
 
}

module.exports = {
 
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            console.log('Authenticated')
            return next();
        }
        req.flash('error_msg', 'Please log in to view');
        res.redirect('/login');
    }
//     app.get('/register', authController.register);
 
 
//     app.get('/login', authController.login);
 
//     app.get('/amidrunk', isLoggedIn, authController.amidrunk);

//     app.get('/logout',authController.logout);

// //     // app.post('/login', passport.authenticate('local-login', {
// //     //     successRedirect: '/amidrunk',

// //     //     failureRedirect: '/login'
// //     // }
// //     // ));

//     function isLoggedIn(req, res, next) {
 
//         if (req.isAuthenticated())
         
//             return next();
             
//         res.redirect('/login');
     
//     }

}
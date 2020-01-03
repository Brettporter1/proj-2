
module.exports = {
 
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            console.log('Authenticated')
            return next();
        }
        req.flash('error_msg', 'Please log in to view');
        res.redirect('/login');
    }
}
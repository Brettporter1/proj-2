var exports = module.exports = {}
 
exports.register = function(req, res) {
 
    res.render('register');
 
}

exports.login = function(req, res) {
 
    res.render('login');
 
}

exports.amidrunk = function(req, res) {
 
    res.render('am-i-drunk');
 
}
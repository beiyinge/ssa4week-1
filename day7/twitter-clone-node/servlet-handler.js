// Servlet handler

exports.signon = function(req, res) {
    console.log('signon');
    var userId = req.body.uidtxt;
    var password = req.body.passtxt;
    console.log('userId=' + userId + ', ' + 'password=' + password);

}

exports.signup = function(req, res) {
    console.log('signup');
}

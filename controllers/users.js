const User = require('../models/user')
module.exports.renderRegister = (req, res,) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registerdUser = await User.register(newUser, password);
        req.login(registerdUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YELPCAMP!!!!!!');
            res.redirect('/campgrounds');
        })
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome Back!!!!!!!!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'GoodByeeeeee!');
        res.redirect('/campgrounds');
    });
}
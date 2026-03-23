const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect("/login/index"));
            return;
        }

        req.flash('errors', "Seu usuário foi criado com sucesso");
        req.session.save(() => res.redirect("/login/index"));
    } catch (e) {
        console.log(e);
        res.render('404');
    }

}
exports.middleWareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors'); // injetando em todo, pode colocar no ejs
    res.locals.success = req.flash('success'); 
    res.locals.user = req.session.user;
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};


exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }
    next();
}

exports.csfrMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login');
        req.session.save(() => res.redirect('back'));
        return;
    } 
    next();
}


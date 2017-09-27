module.exports = function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    if (req.wantsJSON) {
        return res.forbidden("No estas permitido accesar aqui");
    }
    return res.redirect('/');
};
const checkUser = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = checkUser;

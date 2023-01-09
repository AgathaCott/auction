const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('AuctionCookie');
    res.redirect('/');
  });
};

module.exports = { logoutUser };

const bcrypt = require('bcrypt');
const renderTemplate = require('../lib/renderTemplate');
const Register = require('../views/Register.jsx');

const { User } = require('../db/models');

const renderRegister = (req, res) => {
  renderTemplate(Register, null, res);
};

const regUser = async (req, res) => {
  const { email, password } = req.body;
  const error = [];
  try {
    const findUser = await User.findOne({ where: { email }, raw: true });
    if (findUser) {
      error.push('Tакой email уже существует. Введите уникальный email.');
    }
    if (password.length < 5 || password.length > 20 || password.length === 0) {
      error.push(' Пароль должен быть от 5 до 20 символов включительно.');
    }
    if (error.length) {
      return renderTemplate(Register, { error }, res);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash });
    req.session.userEmail = newUser.email;
    req.session.userId = newUser.id;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
};

module.exports = { renderRegister, regUser };

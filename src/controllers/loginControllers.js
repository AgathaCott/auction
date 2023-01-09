const bcrypt = require('bcrypt');
const renderTemplate = require('../lib/renderTemplate');
const Login = require('../views/Login.jsx');
const { User } = require('../db/models');

const renderLogin = (req, res) => {
  renderTemplate(Login, null, res);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        req.session.userEmail = user.email;
        req.session.userId = user.id;
        req.session.save(() => {
          res.redirect('/');
        });
      } else {
        const error = ['Вы ввели неверный пароль!'];
        renderTemplate(Login, { error }, res);
      }
    } else {
      const error = [
        'Ваш email не найден. Зарегистрируйтесь, пожалуйста, или проверьте Ваш email.',
      ];
      renderTemplate(Login, { error }, res);
    }
  } catch (error) {
    res.send(`ERROR---> ${error}`);
  }
};

module.exports = { renderLogin, loginUser };

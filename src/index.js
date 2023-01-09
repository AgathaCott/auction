require('dotenv').config();
require('@babel/register');
const express = require('express');
const morgan = require('morgan');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { PORT, SESSION_SECRET } = process.env;

const app = express();
const indexRoutes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const regRoutes = require('./routes/regRoutes');
const profileRoutes = require('./routes/profileRoutes');
const itemsRoutes = require('./routes/itemsRoutes');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const sessionConfig = {
  name: 'AuctionCookie',
  store: new FileStore(),
  secret: SESSION_SECRET ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  // console.log('req.session=>>>', req.session);
  next();
});

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/register', regRoutes);
app.use('/logout', logoutRoutes);
app.use('/profile', profileRoutes);
app.use('/items', itemsRoutes);

app.listen(PORT ?? 3100, () => {
  console.log('Сервер запущен!');
});

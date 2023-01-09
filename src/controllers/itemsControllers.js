const renderTemplate = require('../lib/renderTemplate');
const Profile = require('../views/Profile.jsx');
const NewItem = require('../views/NewItem.jsx');
const OneItem = require('../views/OneItem.jsx');
const Error = require('../views/Error.jsx');
const { User, Item, Bid } = require('../db/models');

const renderProfile = async (req, res) => {
  const { userEmail } = req.session || { userEmail: null };
  const userId = req.session?.userId;
  // const user = req.session?.userEmail;
  const user = await User.findOne({ where: { email: userEmail }, raw: true });
  if (!user) {
    const message = 'Данный пользователь не найден.';
    return renderTemplate(Error, { message }, res);
  }

  const items = await Item.findAll({
    order: [['id', 'DESC']],
    where: { user_id: user.id },
    raw: true,
  });

  const myBids = await Bid.findAll({
    where: { user_id: userId },
    raw: true,
    include: { model: Item },
  });
  console.log('🚀 ~ myBids', myBids);

  renderTemplate(Profile, { items, user: userEmail, myBids }, res);
};

const renderForm = (req, res) => {
  const userEmail = req.session?.userEmail;
  if (!userEmail) {
    const message = 'У вас нет прав на создание новой записи.';
    return renderTemplate(Error, { message }, res);
  }
  renderTemplate(NewItem, { user: userEmail }, res);
};

const submitForm = async (req, res) => {
  try {
    const userEmail = req.session?.userEmail;
    if (!userEmail) {
      const message = 'Вы не можете добавить товар. Зарегистрируйтесь, пожалуйста.';
      return renderTemplate(Error, { message }, res);
    }
    const user = await User.findOne({ where: { email: userEmail }, raw: true });
    const { title, body, startOfAuction, endOfAuction, startPrice } = req.body;
    await Item.create({
      title,
      body,
      user_id: user.id,
      startOfAuction,
      endOfAuction,
      startPrice,
      winner_id: null,
    });
    res.redirect('/profile');
  } catch (error) {
    const message = 'Не удалось добавить запись в базу данных.';
    renderTemplate(Error, { message }, res);
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const user = req.session?.userEmail;
  const item = await Item.findOne({
    where: { id },
    raw: true,
    include: [{ model: User }],
  });
  if (user === item['User.email']) {
    await Item.destroy({ where: { id } });
    res.redirect('/profile');
  } else {
    const message = 'Вы не имеете доступа к этой записи';
    renderTemplate(Error, { message }, res);
  }
};

const editForm = async (req, res) => {
  const { id } = req.params;
  const user = req.session?.userEmail;
  const item = await Item.findOne({
    where: { id },
    raw: true,
    include: [{ model: User }],
  });
  if (user === item['User.email']) {
    renderTemplate(NewItem, { item, user }, res);
  } else {
    const message = 'Вы не имеете доступа к этой записи';
    renderTemplate(Error, { message }, res);
  }
};

const submitEditForm = async (req, res) => {
  const user = req.session?.userEmail;
  const { id } = req.params;
  if (!user) {
    const message = 'Зарегистрируйтесь, пожалуйста.';
    return renderTemplate(Error, { message }, res);
  }
  const item = await Item.findOne({
    where: { id },
    raw: true,
    include: [{ model: User }],
  });
  if (user === item['User.email']) {
    const { title, body, startOfAuction, endOfAuction, startPrice } = req.body;
    await Item.update(
      {
        title,
        body,
        startOfAuction,
        endOfAuction,
        startPrice,
      },
      {
        where: { id },
      }
    );
    res.redirect('/profile');
  } else {
    const message = 'Вы не смогли обновить этот товар';
    renderTemplate(Error, { message }, res);
  }
};

const submitBidForm = async (req, res) => {
  const user = req.session?.userEmail;
  const { id } = req.params; // item
  if (!user) {
    const message = 'Зарегистрируйтесь, пожалуйста.';
    return renderTemplate(Error, { message }, res);
  }
  const { price } = req.body;

  const item = await Item.findOne({ where: { id }, raw: true });
  if (price < item.startPrice) {
    const message = 'Ваша ставка должна быть выше ставки продавца.';
    return renderTemplate(Error, { message }, res);
  }

  const currentUser = await User.findOne({ where: { email: user }, raw: true });
  await Bid.create({
    item_id: id,
    user_id: currentUser.id,
    price,
  });
  res.redirect('/');
};

const deleteItemFetch = async (req, res) => {
  const { id } = req.params;
  const user = req.session?.userEmail;
  try {
    const item = await Item.findOne({
      where: { id },
      raw: true,
      include: [{ model: User }],
    });
    if (user === item['User.email']) {
      await Item.destroy({ where: { id } });
      res.json({ isDeleteSuccessful: true });
    } else {
      res.json({
        isDeleteSuccessful: false,
        errorMessage: 'У вас нет прав на удаление этой записи.',
      });
    }
  } catch (error) {
    res.json({
      isDeleteSuccessful: false,
      errorMessage: 'Не удалось удалить запись из базы данных.',
    });
  }
};

const renderItem = async (req, res) => {
  const userEmail = req.session?.userEmail;
  const userId = req.session?.userId;
  // if (!userEmail) {
  //   const message = 'У вас нет прав на создание новой записи.';
  //   return renderTemplate(Error, { message }, res);
  // }
  const { id } = req.params;
  const item = await Item.findOne({ where: { id }, raw: true });
  if (userId) {
    const bid = await Bid.findOne({
      raw: true,
      where: { user_id: userId, item_id: id },
    });
    return renderTemplate(OneItem, { user: userEmail, userId, item, bid }, res);
  }
  renderTemplate(OneItem, { item }, res);
};

const addBidtoItem = async (req, res) => {
  const userId = req.session?.userId;
  console.log('🚀 ~ userId', userId);
  const { id } = req.params;
  console.log('🚀 ~ id', id);
  const { price } = req.body;
  console.log('🚀 ~ price', price);
  try {
    if (userId) {
      await Bid.create({ user_id: userId, item_id: id, price });
      res.sendStatus(200);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  submitBidForm,
  renderProfile,
  renderForm,
  submitForm,
  deleteItem,
  editForm,
  submitEditForm,
  deleteItemFetch,
  renderItem,
  addBidtoItem,
};

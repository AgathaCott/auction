const { Op } = require('sequelize');
const renderTemplate = require('../lib/renderTemplate');
const Home = require('../views/Home.jsx');
const { Item, User, Bid } = require('../db/models');

const renderHome = async (req, res) => {
  const user = req.session?.userEmail;
  const userId = req.session?.userId;
  const startedDate = new Date(); // now

  // const itemsWithBids = await Item.findAll({
  //   raw: true,
  //   include: [
  //     {
  //       model: Bid,
  //     },
  //   ],
  // });

  const itemsRaw = await Item.findAll({
    order: [['id', 'DESC']],
    raw: true,
    include: [
      {
        model: User,
      },
    ],
    where: { endOfAuction: { [Op.gte]: startedDate } },
  });

  const expItems = await Item.findAll({
    order: [['id', 'DESC']],
    raw: true,
    include: [{ model: User }],
    where: { endOfAuction: { [Op.lte]: startedDate } },
  });

  let bids = [];

  if (userId) {
    bids = await Bid.findAll({
      raw: true,
      where: { user_id: userId },
    });
  }

  const bidsItemIds = bids.map((item) => item.item_id);

  // const bidsItemPrice = bids.map((item) => item.price);
  // console.log('🚀 ~ bidsItemIds', bidsItemIds);

  // eslint-disable-next-line arrow-body-style
  // const items = itemsRaw.map((item) => {
  //   if (bidsItemIds.includes(item.id)) {
  //     return { ...item, canBid: false };
  //   } else {
  //     return { ...item, canBid: true };
  //   }
  // });

  const items = itemsRaw.map((item) => {
    const myBidPrice = bids.find((bid) => bid.item_id === item.id)?.price || null;
    return {
      ...item,
      canBid: !bidsItemIds.includes(item.id) && item.user_id !== userId,
      didIBid: bidsItemIds.includes(item.id),
      myBidPrice,
    };
  });

  renderTemplate(Home, { user, items, expItems }, res);
};

module.exports = { renderHome };

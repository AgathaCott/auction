const React = require('react');
const format = require('date-fns/format');
const Layout = require('./Layout');

module.exports = function Profile({ items, user, myBids }) {
  return (
    <Layout user={user} active="Profile">
      {user ? (
        <a
          href="/items/new"
          className="mb-4 block button w-100 mar-t-2 maxsr-b-3 pad-2 round-1 text-c center"
        >
          <button className="mb-4 btn btn-primary">Add new item</button>
        </a>
      ) : null}

      <div className="alert alert-danger hidden" id="error-container" role="alert" />

      <main role="main">
        {items.length !== 0 ? <h3>Мои товары:</h3> : null}
        <ul id="list-of-entries" className="entries-list no-bullets no-padding">
          {items?.map((item) => (
            <li className="entry-item pad-b-4 mb-4" id={`list${item.id}`} key={item.id}>
              <a href={`/items/${item.id}`} className="entry-title font-2 pad-b-1-4 c-white">
                {item.title}
              </a>
              <p>Oписание: {item.body}</p>
              <div className="entry-date block font-3-4 c-lt-gray">
                Auction starts: {format(item.startOfAuction, 'dd.MM.yyyy HH:mm')}
                {/* {item.startOfAuction.toString().slice(0, 33)} */}
              </div>
              <span className="entry-date block font-3-4 c-lt-gray">
                Auction ends: {format(item.endOfAuction, 'dd.MM.yyyy HH:mm')}
                {/* {item.endOfAuction.toString().slice(0, 33)} */}
              </span>
              <div className="entry-date block font-3-4 c-lt-gray">
                Start price: {item.startPrice} рублей
              </div>
              {item.winner_id ? (
                <span className="entry-date block font-3-4 c-lt-gray">
                  Winner of auction: {item.winner_id}
                </span>
              ) : null}
              <a href={`/items/${item.id}/edit`}>Редактировать</a>&nbsp;|&nbsp;
              {/* <a href={`/items/${item.id}/delete`}>Удалить товар</a> */}
              <a href="#" data-delete={`${item.id}`}>
                Удалить товар
              </a>
            </li>
          ))}
        </ul>
        {myBids.length !== 0 ? <h3>Мои ставки:</h3> : null}
        <ul id="list-of-entries" className="entries-list no-bullets no-padding">
          {myBids?.map((bid) => (
            <li className="entry-item pad-b-4 mb-4" id={`bid${bid.id}`} key={bid.id}>
              <a href={`/items/${bid['Item.id']}`} className="entry-title font-2 pad-b-1-4 c-white">
                {bid['Item.title']}
              </a>
              <p>Oписание: {bid['Item.body']}</p>
              {/* <div className="entry-date block font-3-4 c-lt-gray">
                Auction starts: {item.startOfAuction.toString().slice(0, 33)}
              </div> */}
              <span className="entry-date block font-3-4 c-lt-gray">
                Auction ends: {format(bid['Item.endOfAuction'], 'dd.MM.yyyy HH:mm')}
                {/* {bid['Item.endOfAuction'].toString().slice(0, 33)}
                {format(item.startOfAuction, 'dd.MM.yyyy HH:mm')} */}
              </span>
              <div className="entry-date block font-3-4 c-lt-gray">
                Start price: {bid['Item.startPrice']} рублей
              </div>
              <div className="entry-date block font-3-4 c-lt-gray">
                Your price: {bid.price} рублей
              </div>
              {bid['Item.winner_id'] ? (
                <span className="entry-date block font-3-4 c-lt-gray">
                  Определен победитель аукциона
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

// price: 555,
//     createdAt: 2023-01-05T18:28:23.981Z,
//     updatedAt: 2023-01-05T18:28:23.981Z,
//     'Item.id': 13,
//     'Item.title': 'dog',
//     'Item.body': 'red',
//     'Item.startOfAuction': 2023-01-06T00:36:00.000Z,
//     'Item.endOfAuction': 2023-01-07T00:36:00.000Z,
//     'Item.startPrice': 2000,
//     'Item.user_id': 2,
//     'Item.winner_id': null,
//     'Item.createdAt': 2023-01-05T00:36:12.050Z,
//     'Item.updatedAt':

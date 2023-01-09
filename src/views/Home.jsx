const React = require('react');
const Layout = require('./Layout');
const format = require('date-fns/format');

module.exports = function Home({ user, items, expItems }) {
  // console.log('🚀 ~ items', items);
  // console.log('🚀 ~ user', user);

  return (
    <Layout user={user} active="Home">
      <h1>Home</h1>
      {user ? (
        ''
      ) : (
        <div className="alert alert-success" role="alert">
          {' '}
          Чтобы принять участие в аукционе, зарегистрируйтесь, пожалуйста.
        </div>
      )}
      <main role="main">
        {items.length !== 0 ? <h3>Активные аукционы:</h3> : null}
        <ul id="list-of-entries" className="entries-list no-bullets no-padding">
          {items?.map((item) => (
            <li className="entry-item pad-b-4 mb-4" id={`list${item.id}`} key={item.id}>
              <a href={`/items/${item.id}`} className="entry-title font-2 pad-b-1-4 c-white">
                {item.title}
              </a>
              {user && user == item['User.email'] ? (
                <p>
                   <a href="/profile">Это ваш товар</a>
                </p>
              ) : null}
              <p>Oписание: {item.body}</p>
              <div className="entry-date block font-3-4 c-lt-gray">
                {/* <p>{format(item.startOfAuction, 'dd.MM.yyyy HH:mm')}</p> */}
                {/* {format(item.startOfAuction, 'Pp')}  */}
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

              {item.didIBid ? (
                <div>
                  <strong>Ставка принята: {item.myBidPrice}</strong>
                </div>
              ) : null}

              {/* <form method="POST" action={`${item ? `/items/${item.id}/edit` : '/items/new'}`}> */}

              {/* {user && user !== item['User.email'] ? ( */}
              {user && user !== item['User.email'] && item.canBid ? (
                <form method="POST" action={`/items/bid/${item.id}`}>
                  {/* Ваша ставка:{item['User.Bids.price']} */}
                  <div className="form-container">
                    <div className="mb-3">
                      <label htmlFor="price" className="block mar-b-1">
                        Ваша цена:
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">₽</span>
                        <input
                          required
                          id="title-input"
                          name="price"
                          type="number"
                          className=" no-outline no-border pad-1 mar-b-2 form-control"
                        />
                      </div>
                    </div>

                    <button type="submit" className="mb-2 mt-2 btn btn-primary">
                      Сделать ставку
                    </button>
                  </div>
                </form>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
        {expItems.length !== 0 ? <h3>Прошедшие аукционы</h3> : null}
        <ul id="list-of-entries" className="entries-list no-bullets no-padding">
          {expItems?.map((item) => (
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

              {/* <form method="POST" action={`${item ? `/items/${item.id}/edit` : '/items/new'}`}> */}

              {/* {user && user !== item['User.email'] ? ( */}
              {user && user !== item['User.email'] && item.canBid ? (
                <form method="POST" id="" action={`/items/bid/${item.id}`}>
                  {/* <form method="POST" action={`/items/bid/${item.id}`}> */}
                  <div className="form-container">
                    <div className="mb-3">
                      <label htmlFor="price" className="block mar-b-1">
                        Ваша цена:
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text">₽</span>
                        <input
                          required
                          id="title-input"
                          name="price"
                          type="number"
                          className=" no-outline no-border pad-1 mar-b-2 form-control"
                        />
                      </div>
                    </div>

                    <button type="submit" className="mb-2 mt-2 btn btn-primary">
                      Сделать ставку
                    </button>
                  </div>
                </form>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

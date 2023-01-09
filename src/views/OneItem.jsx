const React = require('react');
const Layout = require('./Layout');
const format = require('date-fns/format');

module.exports = function Home({ user, item, bid, userId }) {
  // console.log('🚀 ~ userId', userId);
  // console.log('🚀 ~ item', item);
  // console.log('🚀 ~ bid', bid);
  // console.log('🚀 ~ item', item);
  // console.log('🚀 ~ user', user);

  return (
    <Layout user={user} active="Profile">
      <h3>{item.title}</h3>
      {user ? (
        ''
      ) : (
        <div className="alert alert-success" role="alert">
          {' '}
          Чтобы принять участие в аукционе, зарегистрируйтесь, пожалуйста.
        </div>
      )}{' '}
      <main role="main">
        <div className="entry-item pad-b-4 mb-4" id={`list${item.id}`} key={item.id}>
          {/* <a href={`/items/${item.id}`} className="entry-title font-2 pad-b-1-4 c-white">
            {item.title}
          </a> */}
          {/* <strong>{item.title}</strong> */}
          {/* {user && user == item['User.email'] ? (
            <p>
               <a href="/profile">Это ваш товар</a>
            </p>
          ) : null} */}
          <p>Oписание: {item.body}</p>
          <div className="entry-date block font-3-4 c-lt-gray">
            Auction starts: {format(item.startOfAuction, 'dd.MM.yyyy HH:mm')}
          </div>
          <div className="entry-date block font-3-4 c-lt-gray">
            Auction ends: {format(item.endOfAuction, 'dd.MM.yyyy HH:mm')}
          </div>
          {/* <div className="entry-date block font-3-4 c-lt-gray">
            Auction starts: {format(item.startOfAuction, 'dd.MM.yyyy HH:mm')}
          </div>

          <span className="entry-date block font-3-4 c-lt-gray">
            Auction ends: {format(item.endOfAuction, 'dd.MM.yyyy HH:mm')}
            {/* {item.endOfAuction.toString().slice(0, 33)} */}
          {/* </span> */}
          <div className="entry-date block font-3-4 c-lt-gray">
            Start price: {item.startPrice} рублей
          </div>
          {user && bid ? (
            <div>
              <strong>Ваша ставка: {bid.price} рублей</strong>
            </div>
          ) : null}
          {user && userId === item.user_id ? (
            <>
              <a href={`/items/${item.id}/edit`}>Редактировать</a>|&nbsp;
              <a href={`/items/${item.id}/delete`}>Удалить товар</a>
              {/* <a href="#" data-delete={`${item.id}`}>
                Удалить товар
              </a> */}
            </>
          ) : null}

          {user && userId !== item.user_id && bid === null ? (
            <form method="POST" id="bid-form" data-itemid={item.id}>
              {/* <form method="POST" id="" action={`/items/bid/${item.id}`}> */}
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
                      id="bid-input"
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
        </div>
      </main>
    </Layout>
  );
};

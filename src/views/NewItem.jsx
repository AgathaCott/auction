const React = require('react');
const Layout = require('./Layout');
const format = require('date-fns/format');

module.exports = function NewItem({ user, item }) {
  return (
    <Layout user={user} active="Profile">
      <h1>{`${item ? 'Редактировать товар' : 'Create my new item'}`}</h1>
      <div className="form-container">
        <form method="POST" action={`${item ? `/items/${item.id}/edit` : '/items/new'}`}>
          <div className="mb-3">
            <label htmlFor="title" className="block mar-b-1">
              Название товара:
            </label>
            <input
              required
              value={`${item ? item.title : ''}`}
              id="title-input"
              name="title"
              type="text"
              tabIndex="1"
              className="block w-100 no-outline no-border pad-1 mar-b-2 form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="block mar-b-1">
              Описание товара:
            </label>
            <textarea
              required
              id="body-textarea"
              name="body"
              tabIndex="2"
              className="form-control block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
            >
              {item ? item.body : ''}
            </textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="startOfAuction" className="block mar-b-1">
              Начало аукциона:
            </label>
            <input
              required
              value={`${item ? format(item.startOfAuction, 'dd.MM.yyyy HH:mm') : ''}`}
              id="title-input"
              name="startOfAuction"
              type="datetime-local"
              tabIndex="3"
              className="block w-100 no-outline no-border pad-1 mar-b-2 form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endOfAuction" className="block mar-b-1">
              Окончание аукциона:
            </label>
            <input
              required
              value={`${item ? format(item.endOfAuction, 'dd.MM.yyyy HH:mm') : ''}`}
              // value={`${item ? item.endOfAuction.toISOString().slice(0, 16) : ''}`}
              id="title-input"
              name="endOfAuction"
              type="datetime-local"
              tabIndex="4"
              className="block w-100 no-outline no-border pad-1 mar-b-2 form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startPrice" className="block mar-b-1">
              Начальная цена:
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">₽</span>
              <input
                required
                value={`${item ? item.startPrice : ''}`}
                id="title-input"
                name="startPrice"
                type="number"
                tabIndex="5"
                className=" no-outline no-border pad-1 mar-b-2 form-control"
              />
            </div>
          </div>

          <input
            type="submit"
            value={`${item ? 'Save' : 'Publish'}`}
            tabIndex="6"
            className="btn btn-primary form-control block button w-100 mar-t-4 mar-b-3 pad-2 round-1 text-c center no-border no-outline"
          />
        </form>
      </div>
    </Layout>
  );
};

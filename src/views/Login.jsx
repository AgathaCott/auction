const React = require('react');

const Layout = require('./Layout');

module.exports = function Login({ error }) {
  return (
    <Layout active="Login">
      <h2>Введите свои данные, чтобы войти в систему</h2>

      <hr />
      {error ? (
        <div>
          Ошибка:{' '}
          {error.map((str, i) => (
            <div className="alert alert-danger" role="alert" key={i}>
              {str}
            </div>
          ))}
        </div>
      ) : null}

      {/* <script defer src="js/posts.js" /> */}
      <div className="form-container">
        <form action="/login" method="POST" id="loginForm">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Введите ваш Email
            </label>

            <input name="email" type="email" className="form-control" id="exampleInput1" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Введите ваш Password
            </label>

            <input name="password" type="password" className="form-control" id="exampleInput2" />
          </div>
          <button type="submit" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>

      <hr />
    </Layout>
  );
};

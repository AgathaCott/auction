const React = require('react');

const Layout = require('./Layout');

module.exports = function Register({ error }) {

  return (
    <Layout active="Register">
      <h2>Зарегистрируйтесь/sign up</h2>
      {error ? error.map((str, i) => <p key={i}>{str}</p>) : null}

      <hr />

      {/* <script defer src="js/posts.js" /> */}
      <div className="form-container">
        <form action="/register" method="POST" id="loginForm">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input name="email" type="email" className="form-control" id="exampleInput1" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
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

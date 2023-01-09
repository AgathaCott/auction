const React = require('react');

module.exports = function Layout({ children, user, active }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossOrigin="anonymous"
        ></script>
        <script defer src="/js/script.js"></script>
        <title>Document</title>
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="container">
              <div className="navbar-nav">
                <a className={`nav-item nav-link ${active === 'Home' ? 'active' : null}`} href="/">
                  Home
                </a>
                {user ? (
                  <>
                    <a
                      className={`nav-item nav-link ${active === 'Profile' ? 'active' : null}`}
                      href="/profile"
                    >
                      {user}
                    </a>
                    <a className="nav-item nav-link" href="/logout">
                      Log out
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className={`nav-item nav-link ${active === 'Login' ? 'active' : null}`}
                      href="/login"
                    >
                      Sign in
                    </a>
                    <a
                      className={`nav-item nav-link ${active === 'Register' ? 'active' : null}`}
                      href="/register"
                    >
                      Sign up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="container pt-5">{children}</div>
      </body>
    </html>
  );
};

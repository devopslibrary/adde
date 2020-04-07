import axios from "axios";

export const authGuard = () => {
  if (localStorage.getItem("user-token")) {
    this.orgs = axios
      .post("http://localhost:8000/organizations", null, {
        params: {
          jwt: this.token
        }
      })
      .then(response => (this.orgs = response.data));
  } else {
    console.log("Not logged in!");
  }
};

// app.get('/login', (req, res, next) => {
//   // generate that csrf_string for your "state" parameter
// req.session.csrf_string = randomString.generate();
//   // construct the GitHub URL you redirect your user to.
//   // qs.stringify is a method that creates foo=bar&bar=baz
//   // type of string for you.
// const githubAuthUrl =
//   'https://github.com/login/oauth/authorize?' +
//   qs.stringify({
//     client_id: process.env.CLIENT_ID,
//     redirect_uri: redirect_uri,
//     state: req.session.csrf_string,
//     scope: 'user:email'
//   });
// // redirect user with express
// res.redirect(githubAuthUrl);
// });

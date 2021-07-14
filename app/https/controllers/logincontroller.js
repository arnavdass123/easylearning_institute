const passport = require("passport");

function logincontroller() {
  return {
    index(req, res) {
      res.render("login");
    },
    postlogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          // req.flash('error',info.message)
          console.log("somthing wrong");
          return next(err);
        }
        if (!user) {
          // req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.login(user, (err) => {
          if (err) {
            // req.flash('error'.info.message)
            return next(err);
          }

          return res.redirect("/");
        });
      })(req, res, next);

    },
  };
}

module.exports = logincontroller;

const User = require("../../../Database/Models/userdata");
const bcrypt = require("bcrypt");

function registercontroller() {
  return {
    register(req, res) {
      res.render("register");
    },
    async postregister(req, res) {
      const { name, email, password } = req.body;
      console.log(req.body);
      if (!name || !email || !password) {
        return res.redirect("/register");
      }

      if (name.length == 2) {
        return res.redirect("/register");
      }

      // if (email == password) {
      //   return res.redirect("/register");
      // }

      // if data exits in data-base:
      // checking email
      User.exists({ email: email }, (err, result) => {
        if (result) {
          // req.flash("error", "Email already taken");
          // req.flash("name", name);
          // req.flash("email", email);
          return res.redirect("/register");
        }
      });

      // hash password:
      const safepassword = await bcrypt.hashSync(password, 10);

      // create a user collection in database:
      const user = new User({
        name,
        email,
        password: safepassword,
      });
      console.log(user);

      user
        .save()
        .then((user) => {
          // loginss
          return res.redirect("/login");
        })
        .catch((err) => {
          // req.flash("error", "Smothing went worng");
          return res.redirect("/register");
        });

      console.log(req.body);
    },
  };
}

module.exports = registercontroller;

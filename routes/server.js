require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const Mongodbstore = require("connect-mongo")(session);
const flash = require("express-flash");

// connect with mongodb:
const url = "mongodb://localhost/easy_learning";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// information about connection:
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log("connection failed");
  });

// session store:
let mongoStore = new Mongodbstore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.COOKIE_SECRECT,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

app.use(flash());

// passport config:
const passportInit = require("../app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


// set engine:
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("/views", path.join(__dirname, "veiws")); // connect with file

// express specific stuff:
app.use(express.static("static"));


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// global middleware:
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routing pages
require("./routes")(app);

// prot listening:
app.listen(port, () => {
  console.log("listing on port", port);
});

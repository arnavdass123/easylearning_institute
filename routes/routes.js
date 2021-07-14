// importing controllers 
const homecontroller = require('../app/https/controllers/homecontroller')
const logincontroller = require('../app/https/controllers/logincontroller')
const registercontroller = require('../app/https/controllers/registercontroller')

//  routing is here:

function initroutes(app) {
    // all app.get request is here: 
    app.get("/", homecontroller().index)
    app.get("/login", logincontroller().index)
    app.get("/register", registercontroller().register)
      // all app.post request is here: 
    app.post("/login",logincontroller().postlogin)
    app.post("/register",registercontroller().postregister)
}

module.exports = initroutes
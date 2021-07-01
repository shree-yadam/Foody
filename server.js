// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const router = express.Router();

//TBD :HARD CODED RESTAURANT ID TO BEGIN
const RESTAURANT_ID = 1;

//Database changes
const menuDb = require('./lib/database/menu_queries');
const customerDb = require('./lib/database/customer_queries');
const restaurantDb = require('./lib/database/restaurant_queries');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//Use cookie-parser
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Separated Routes for each Resource
const customersRoutes = require("./routes/customers");
const restaurantsRoutes = require("./routes/restaurants");
const menuRoutes = require("./routes/menu");

// Mount all resource routes
app.use("/api/customers", customersRoutes(router, customerDb));
app.use("/api/menu", menuRoutes(router, menuDb, customerDb));
app.use("/api/restaurants", restaurantsRoutes(router, restaurantDb));


// Home page
app.get("/", (req, res) => {
  req.session.restaurantId = null;
  let customerId = null;
  if (req.session.customerId) {
    customerId = req.session.customerId;
    const promise1 = customerDb.getCustomerWithId(customerId);
    const promise2 = restaurantDb.getAllRestaurants();
    Promise.all([promise1,promise2])
    .then(data => {
      const customerName = data[0].name;
      const restaurants = data[1];
      const templateVars = {
        customerId,
        customerName,
        restaurants
      }
      res.render("restaurantList", templateVars);
      return;
    })
    .catch(e => {
      console.log(e);}
      );
  } else {
  restaurantDb.getAllRestaurants()
    .then(restaurants => {
      let customerName = null;
      const templateVars = {
        customerId,
        customerName,
        restaurants
      }
      res.render("restaurantList", templateVars);
      return;
    })
    .catch(e => {
      console.log(e);
    });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

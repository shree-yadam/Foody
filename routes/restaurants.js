/*
 * All routes for Restaurants are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /api/restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const sms = require('../lib/sms/receiveSMS');

module.exports = (router, db) => {

  router.post("/sms/", sms.handleSMSReceived);

  // router.get("/login/", (req, res) => {
  //   // DISPLAY RESTAURANT LOGIN FORM
  //   if (req.session.restaurantId) {
  //     res.redirect(`/api/restaurants/${req.session.restaurantId}`);
  //     return;
  //   }
  //   // TBD RENDER LOGIN PAGE
  //   // res.render("restaurant_login");
  //   res.send("restaurant login");
  // });

  // //STRETCH
  // router.get("/register/", (req, res) => {
  //   // DISPLAY RESTAURANT REGISTRATION FORM
  //   res.send("restaurant registration");
  // });

  router.get("/:id/menu/", (req, res) => {
    //DISPLAY RESTAURANT with id MENU EDIT FORM
    res.send(`restaurant ${req.params.id} menu edit`);
  });

  router.get("/:id/current_orders/:order_id", (req, res) => {
    //DISPLAY RESTAURANT with id  EDIT FORM for order # order_id
    res.send(`restaurant ${req.params.id} current_order edit ${req.params.order_id}`);
  });

  router.get("/:id/current_orders/", (req, res) => {
    //DISPLAY CURRENT ORDERS FOR RESTAURANT WITH id
    res.send(`restaurant ${req.params.id} current_orders`);
  });

  router.get("/:id/old_orders/", (req, res) => {
    //DISPLAY old orders for restaurant #id
    res.send(`restaurant ${req.params.id} old_orders`);
  });

  router.get("/:id/", (req, res) => {
    //Display restaurant owner main page with options for viewing/editing/orders/menu
    res.send(`restaurant ${req.params.id} main page`);
  });

  router.post("/login/", (req, res) => {
    const { email, password } = req.body;
    db.getRestaurantWithEmail(email)
      .then(restaurant => {
        if (!restaurant || !bcrypt.compareSync(password, restaurant.password)) {
          res
            .status(403)
            .send("Invalid credentials!!");
          return;
        }
        req.session.restaurantId = restaurant.id;
        res.redirect(`/api/restaurants/${req.session.restaurantId}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/logout/", (req, res) => {
    //TBD Check Functionality
    req.session = null;
    res.redirect("/");
    console.log("restaurant logout");
  });

  //STRETCH
  router.post("/register/", (req, res) => {
    // RESTAURANT REGISTRATION FORM submitted - add to db
    res.send("restaurant registration form submit");
  });
  return router;
};


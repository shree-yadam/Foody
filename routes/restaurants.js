/*
 * All routes for Restaurants are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

module.exports = (router, db) => {
  router.get("/login/", (req, res) => {
    // DISPLAY RESTAURANT LOGIN FORM
    res.send("restaurant login");
  });
  //STRETCH
  router.get("/register/", (req, res) => {
    // DISPLAY RESTAURANT REGISTRATION FORM
    res.send("restaurant registration");
  });
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
    // RESTAURANT LOGIN FORM submitted verify against DB and display restaurants main page
    res.send("restaurant login submitted");
  });
  //STRETCH
  router.post("/register/", (req, res) => {
    // RESTAURANT REGISTRATION FORM submitted - add to db
    res.send("restaurant registration form submit");
  });
  return router;
};


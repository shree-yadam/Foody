/*
 * All routes for Customers are defined here
 * Since this file is loaded in server.js into api/customers,
 *   these routes are mounted onto /customers
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcrypt');

module.exports = (router, db) => {

  router.get("/login_register/", (req, res) => {
    if (req.session.customerId) {
      res.redirect("/api/menu");
      return;
    }
    // TBD RENDER LOGIN PAGE
    // res.render("customer_login");
    //Display customer login form
    let customerId = req.session.customerId;
    const templateVars = {
      customerId
    };
    res.render("login_register_form", templateVars);
  });

  //TBD Remove if not needed
  // router.get("/register/", (req, res) => {
  //   //display customer registration form
  //   res.send("customer registration form");
  // });

  //TBD:: STRETCH Customer can edit order using link provided as long as status is requested
  router.get("/:id/order/:order_id", (req, res) => {
    //Get order_id belonging to customer #id
    res.send(`customer ${req.params.id} order ${req.params.order_id}`);
  });

  router.post("/login/", (req, res) => {
    //Verify customer login information and display order placement form
    const { email, password } = req.body;
    db.getCustomerWithEmail(email)
      .then(customer => {
        if (!customer || !bcrypt.compareSync(password, customer.password)) {
          res
            .status(403)
            .send("Invalid credentials!!");
          return;
        }
        req.session.customerId = customer.id;
        res.redirect("/");
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/register/", (req, res) => {
    //Add customer details to DB and display order menu
    res.send("customer registration form submitted");
  });

  router.post("/logout/", (req, res) => {
    //TBD Check Functionality
    req.session = null;
    res.redirect("/");
  });

  router.post("/:id/order", (req, res) => {
    //Post order for customer #id
    res.send(`customer ${req.params.id} order edit`);
  });
  return router;
};

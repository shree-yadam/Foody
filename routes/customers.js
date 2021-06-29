/*
* All routes for Customers are defined here
* Since this file is loaded in server.js into api/customers,
*   these routes are mounted onto /customers
* See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/
const bcrypt = require('bcrypt');
const sms = require('../lib/sms/sendSMS');
const SALT_ROUNDS = 10;

//TBD :HARD CODED RESTAURANT ID TO BEGIN
const RESTAURANT_ID = 1;

module.exports = (router, db) => {

  //Display login/register form
  router.get("/login_register/", (req, res) => {
    if (req.session.customerId) {
      res.redirect("/api/menu");
      return;
    }
    //Display customer login form
    let customerId = req.session.customerId;
    const templateVars = {
      customerId
    };
    res.render("login_register_form", templateVars);
  });

  //get past/curr order for customer
  router.get("/:id/orders", (req, res) => {
    const customerId = req.params.id;
    db.getCurrentOrderAndItems(customerId)
    .then(currOrders => {
      const currOrdersArr = _.toPairs(_.groupBy(currOrders, (order) => order.id))
        .sort((a, b) => b[0] - a[0])
        .map(order => order[1]);
      db.getPastOrderAndItems(customerId)
      .then(pastOrders => {
        const pastOrdersArr = _.toPairs(_.groupBy(pastOrders, (order) => order.id))
        .sort((a, b) => b[0] - a[0])
        .map(order => order[1]);
        db.getCustomerWithId(customerId)
        .then(customer => {
          const customerName = customer.name;
          const templateVars = {
            currOrdersArr,
            pastOrdersArr,
            customerId,
            customerName
          };
          res.render("orders", templateVars);
        });
      });
    });
  });

  //TBD:: STRETCH Customer can edit order using link provided as long as status is requested
  router.get("/:id/order/:order_id", (req, res) => {

  });

  //Login request
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

  //Submit new registration
  router.post("/register/", (req, res) => {
    //Add customer details to DB and display order menu
    // res.send("customer registration form submitted");
    console.log(req.body);
    db.getCustomerWithEmail(req.body.email)
    .then(customer => {
      if(!customer) {
        const {name, phonenumber, email} = req.body;
        const password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        return db.addCustomer({name, phonenumber, email, password});
      }
      else{
        console.log("customer exists");
        res
            .status(403)
            .send("Email already in use!!");
          return;
      }
    })
    .then(customer => {
      if(customer){
      req.session.customerId = customer.id;
      }
      res.redirect(`/`);
    })
    .catch(e => {
      console.error(e);
      console.log("Customer Register FAILURE");
      res.send(e);
    });
  });

  //Logout
  router.post("/logout/", (req, res) => {
    //TBD Check Functionality
    req.session = null;
    res.redirect("/");
  });

  //Submit order
  router.post("/:id/order", (req, res) => {
    //Post order for customer #id
    const itemIds = req.body.itemId;
    const quantities = req.body.quantity;
    if (!itemIds) {
      res.send("InvalidEntry");
      return;
    }
    db.createOrderForCustomerForRestaurant(req.session.customerId, RESTAURANT_ID, itemIds, quantities)
      .then(order => {
        return db.addOrderItemsForOrderId(order.id, itemIds, quantities);
      })
      .then(order_items => {
        return db.updateTotalPriceForOrder(order_items[0].order_id);
      })
      .then(order => {
        return db.getOrderDetailsAndCustomerAndRestaurantFromOrderId(order.id);
      })
      .then(customer_order_restaurant => {
        // Render page for user
        const total_price = customer_order_restaurant[0].total_price;
        const customerId = req.session.customerId;
        const order_id = customer_order_restaurant[0].id;
        const customerName = customer_order_restaurant[0].name;
        const menuDetails = [];
        for (let i = 0; i < customer_order_restaurant.length; i++) {
          const menuItem = {};
          menuItem.name = customer_order_restaurant[i].item_name;
          menuItem.unit_price = customer_order_restaurant[i].unit_price;
          menuItem.quantity = customer_order_restaurant[i].quantity;
          menuItem.order_price = customer_order_restaurant[i].order_price;
          menuDetails.push(menuItem);
        }
        const templateVars = {
          customerId,
          order_id,
          total_price,
          customerName,
          menuDetails
        };
        res.render("order_placed", templateVars);
        //Send Customer SMS
        const customerNumber = customer_order_restaurant[0].phone_number;
        const customerMessage = `
        Dear, ${customer_order_restaurant[0].name},
        your order #${customer_order_restaurant[0].id} has been sent to the restaurant. Your total amount due at the time of pickup is $${customer_order_restaurant[0].total_price / 100}. You will be updated about the status soon. Thanks!`
        const smsCustomerPromise = sms.sendSMS(customerNumber, customerMessage);
        const restaurantNumber = customer_order_restaurant[0].restaurant_phone_number;
        console.log(restaurantNumber);
        //prepare restaurant message
        let restaurantMessage = `
        Order requested:
        Order #${customer_order_restaurant[0].id}
        Details:
        `;
        for (let i = 0; i < customer_order_restaurant.length; i++) {
          restaurantMessage += `${i + 1}. ${customer_order_restaurant[i].item_name} - ${customer_order_restaurant[i].quantity}
          `;
        }
        restaurantMessage += `Respond as any of following messages:
        ACCEPTED:<time_expected>
        or
        READY
        or
        DELIVERED
        or
        REJECTED:<reason>
        to update status`
        const smsRestaurantPromise = sms.sendSMS(restaurantNumber, restaurantMessage);
        //send SMS to restaurant and customer
        return Promise.all([smsCustomerPromise, smsRestaurantPromise]);
      })
      .then(message => {
        console.log("Message sent to customer!");
        console.log(message[0].sid);
        console.log("Message sent to Restaurant!");
        console.log(message[1].sid);
      })
      .catch(e => {
        console.error(e);
        console.log("ORDER CREATE FAILURE");
        res.send(e);
      });
  });
  return router;
};

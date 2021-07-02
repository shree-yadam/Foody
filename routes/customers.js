/*
* All routes for Customers are defined here
* Since this file is loaded in server.js into api/customers,
*   these routes are mounted onto /customers
* See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/
const bcrypt = require('bcrypt');
const sms = require('../lib/sms/sendSMS');
const SALT_ROUNDS = 10;
const _ = require('lodash');

module.exports = (router, db) => {

  //Display login/register form
  router.get("/login_register", (req, res) => {
    if (req.session.customerId) {
      res.redirect("/api/menu");
      return;
    }
    //Display customer login form
    let customerId = req.session.customerId;
    const loginError = false;
    const registerError = false;
    const templateVars = {
      customerId,
      loginError,
      registerError
    };
    res.render("login_register_form", templateVars);
  });

  //get past/curr order for customer
  router.get("/:id/orders", (req, res) => {
    const customerId = req.params.id;
    const promise1 = db.getCurrentOrderAndItems(customerId);
    const promise2 = db.getPastOrderAndItems(customerId);
    const promise3 = db.getCustomerWithId(customerId);
    Promise.all([promise1, promise2, promise3])
      .then(data => {
        const currOrders = data[0];
        const pastOrders = data[1];
        const customer = data[2];
        const currOrdersArr = _.toPairs(_.groupBy(currOrders, (order) => order.id))
          .sort((a, b) => b[0] - a[0])
          .map(order => order[1]);
        const pastOrdersArr = _.toPairs(_.groupBy(pastOrders, (order) => order.id))
          .sort((a, b) => b[0] - a[0])
          .map(order => order[1]);
        const customerName = customer.name;
        const templateVars = {
          currOrdersArr,
          pastOrdersArr,
          customerId,
          customerName
        };
        res.render("orders", templateVars);
      })
      .catch(e => console.log(e));
  });

  // router.get("/:id/restaurants/:restaurantId", (req, res) => {
  //   req.session.restaurantId = req.params.restaurantId;

  // });

  //TBD:: STRETCH Customer can edit order using link provided as long as status is requested
  // router.get("/:id/orders/:order_id", (req, res) => {

  // });

  router.get("/:id/order", (req, res) => {
    const customerId = req.params.id;
    db.getLastorderForCustomer(customerId)
    .then(order => {
      return db.getOrderDetailsAndCustomerAndRestaurantFromOrderId(order.id)

    })
    .then(orderItems => {

        // Render page for user
        const total_price = orderItems[0].total_price/100;
        const order_id = orderItems[0].id;
        const customerName = orderItems[0].name;
        const restaurantName = orderItems[0].restaurant_name;
        const menuDetails = [];
        for (let i = 0; i < orderItems.length; i++) {
          const menuItem = {};
          menuItem.name = orderItems[i].item_name;
          menuItem.unit_price = orderItems[i].unit_price/100;
          menuItem.quantity = orderItems[i].quantity;
          menuItem.order_price = orderItems[i].order_price/100;
          menuDetails.push(menuItem);
        }
        const templateVars = {
          customerId,
          order_id,
          total_price,
          customerName,
          restaurantName,
          menuDetails
        };
        res.render("order_placed", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Login request
  router.post("/login/", (req, res) => {
    //Verify customer login information and display order placement form
    const { email, password } = req.body;
    db.getCustomerWithEmail(email)
      .then(customer => {
        if (!customer || !bcrypt.compareSync(password, customer.password)) {
          const customerId = null;
          const customerName = null;
          const loginError = true;
          const registerError = false;
          const templateVars = {
            customerId,
            customerName,
            loginError,
            registerError
          };
          res.render("login_register_form", templateVars);
          return;
        }
        req.session.customerId = customer.id;
        if(req.session.restaurantId) {
          res.redirect(`/api/menu/${req.session.restaurantId}`);
          return;
        }
        res.redirect("/");
      })
      .catch(e => {
        console.error(e);
      });
  });

  //Submit new registration
  router.post("/register", (req, res) => {
    //Add customer details to DB and display order menu
    db.getCustomerWithEmail(req.body.email)
      .then(customer => {
        if (!customer) {
          const { name, phonenumber, email } = req.body;
          const password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
          return db.addCustomer({ name, phonenumber, email, password });
        }
        else {
          const customerId = null;
          const registerError = true;
          const loginError = false;
          const templateVars = {
            customerId,
            registerError,
            loginError
          };
          res.render("login_register_form", templateVars);
          return;
        }
      })
      .then(customer => {
        if (customer) {
          req.session.customerId = customer.id;
          if(req.session.restaurantId) {
            res.redirect(`/api/menu/${req.session.restaurantId}`);
            return;
          }
          res.redirect("/");
        }
      })
      .catch(e => {
        console.error(e);
        console.log("Customer Register FAILURE");
      });
  });

  //Logout
  router.post("/logout", (req, res) => {
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
    db.createOrderForCustomerForRestaurant(req.session.customerId, req.session.restaurantId, itemIds, quantities)
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
        res.redirect(`/api/customers/${req.session.customerId}/order`)
        //Send Customer SMS
        const customerNumber = customer_order_restaurant[0].phone_number;
        const customerMessage = `
        Dear, ${customer_order_restaurant[0].name},
        your order #${customer_order_restaurant[0].id} has been sent to ${customer_order_restaurant[0].restaurant_name}. Your total amount due at the time of pickup is $${customer_order_restaurant[0].total_price / 100}. You will be updated about the status soon. Thanks!`
        const smsCustomerPromise = sms.sendSMS(customerNumber, customerMessage);
        const restaurantNumber = customer_order_restaurant[0].restaurant_phone_number;
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
        ${customer_order_restaurant[0].id}: accepted: <time_expected_minutes>
        or
        ${customer_order_restaurant[0].id}: ready
        or
        ${customer_order_restaurant[0].id}: completed
        or
        ${customer_order_restaurant[0].id}: rejected: <reason>
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
        // res.send(e);
        //TBD fix 0 quantity
        res.redirect("/");
      });
  });
  return router;
};

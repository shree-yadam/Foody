const bcrypt = require('bcrypt');
//HARD CODED RESTAURANT ID TO BEGIN
const RESTAURANT_ID = 1;

module.exports = (router, db, customerDb) => {
  router.get("/", (req, res) => {
    db.getMenuItemsWithRestaurantId(RESTAURANT_ID)
      .then(menuItems => {
        let customerId = undefined;
        if (req.session.customerId) {
          customerId = req.session.customerId;
          customerDb.getCustomerWithId(customerId)
            .then(customer => {
              const customerName = customer.name;
              const templateVars = {
                menuItems,
                customerId,
                customerName
              };
              res.render("index", templateVars);
              return;
            })
            .catch(e => {
              console.log(e);
              res.send(e);
            });
        } else {
          const templateVars = {
            menuItems,
            customerId,
          };
          res.render("index", templateVars);
        }
      })
      .catch(e => {
        console.log(e);
        res.send(e);
      });
  });
  return router;
};

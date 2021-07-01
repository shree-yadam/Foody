const bcrypt = require('bcrypt');
//HARD CODED RESTAURANT ID TO BEGIN

module.exports = (router, db, customerDb) => {
  router.get("/:restaurantId", (req, res) => {
    req.session.restaurantId = req.params.restaurantId;//TBD check if needed
    db.getMenuItemsWithRestaurantId(req.params.restaurantId)
      .then(menuItems => {
        let customerId = undefined;
        const restaurantName = menuItems[0].restaurant_name;
        const restaurantDescription = menuItems[0].restaurant_description;
        if (req.session.customerId) {
          customerId = req.session.customerId;
          customerDb.getCustomerWithId(customerId)
            .then(customer => {
              const customerName = customer.name;
              const templateVars = {
                menuItems,
                customerId,
                customerName,
                restaurantName,
                restaurantDescription
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
            restaurantName,
            restaurantDescription
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

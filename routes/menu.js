const bcrypt = require('bcrypt');
//HARD CODED RESTAURANT ID TO BEGIN
const RESTAURANT_ID = 1;

module.exports = (router, db) => {
  router.get("/", (req, res) => {
    db.getMenuItemsWithRestaurantId(RESTAURANT_ID)
    .then(menuItems => res.json(menuItems))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });
  return router;
};

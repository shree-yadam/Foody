/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into api/login,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
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

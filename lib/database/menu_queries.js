const db = require('./db');

/**
 * Get all menu items for a particular restaurant from the database
 * @param {String} restaurantID The id of the restaurant.
 * @return {Promise<{}>} A promise to the array of menuItems.
 */
 const getMenuItemsWithRestaurantId = function(restaurantId) {
  const queryString = `
    SELECT *
    FROM menu_items
    WHERE restaurant_id = $1;
    `;
  const queryParams = [restaurantId];
  return db.query(queryString, queryParams, 0);
}
exports.getMenuItemsWithRestaurantId = getMenuItemsWithRestaurantId;

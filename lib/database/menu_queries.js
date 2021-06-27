const db = require('./db');

/**
 * Get all menu items for a particular restaurant from the database
 * @param restaurantID The id of the restaurant.
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

/**
 * Get  a particular menu item for a particular restaurant from the database
 * @param menuItemId id of menu item
 * @param restaurantID The id of the restaurant.
 * @return {Promise<{}>} A promise to the array of menuItems.
 */
 const getMenuItemWithMenuIDRestaurantId = function(menuItemId, restaurantId) {
  const queryString = `
    SELECT *
    FROM menu_items
    WHERE id = $1 AND restaurant_id = $2;
    `;
  const queryParams = [menuItemId, restaurantId];
  return db.query(queryString, queryParams, 1);
}
exports.getMenuItemWithMenuIDRestaurantId = getMenuItemWithMenuIDRestaurantId;

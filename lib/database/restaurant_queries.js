const db = require('./db');

/**
 * Get all restaurants from the database
 * @return {Promise<{}>} A promise to the restaurant.
 */
 const getAllRestaurants = function() {
  const queryString = `
    SELECT *
    FROM restaurants;
    `;
  const queryParams = [];
  return db.query(queryString, queryParams, 0);
}
exports.getAllRestaurants = getAllRestaurants;

/**
 * Get a single restaurant from the database given their email.
 * @param {String} email The email of the restaurant.
 * @return {Promise<{}>} A promise to the restaurant.
 */
 const getRestaurantWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM restaurants
    WHERE email = $1;
    `;
  const queryParams = [email];
  return db.query(queryString, queryParams, 1);
}
exports.getRestaurantWithEmail = getRestaurantWithEmail;

/**
 * Get a single restaurant from the database given their id.
 * @param {string} id The id of the restaurant.
 * @return {Promise<{}>} A promise to the restaurant.
 */
 const getRestaurantWithId = function(id) {
  const queryString = `
    SELECT *
    FROM restaurants
    WHERE id = $1;
    `;
  const queryParams = [id];
  return db.query(queryString, queryParams, 1);
}
exports.getRestaurantWithId = getRestaurantWithId;

/**
 * Get a single restaurant from the database given their phonenumber.
 * @param {String} phonenumber The email of the restaurant.
 * @return {Promise<{}>} A promise to the restaurant.
 */
 const getRestaurantAndOrderWithPhonenumberAndOrderID = function(phonenumber, orderId) {
  const queryString = `
    SELECT orders.id as order_id, restaurants.id as restaurant_id, orders.customer_id as customer_id
    FROM restaurants
    JOIN orders ON orders.restaurant_id = restaurants.id
    WHERE restaurants.phone_number = $1 AND orders.id = $2;
    `;
  const queryParams = [phonenumber, orderId];
  return db.query(queryString, queryParams, 1);
}
exports.getRestaurantAndOrderWithPhonenumberAndOrderID = getRestaurantAndOrderWithPhonenumberAndOrderID;

/**
 * Add a new retaurant to the database.
 * @param {{name: string, password: string, email: string}} restaurant
 * @return {Promise<{}>} A promise to the restaurant.
 */
const addRestaurant = function(restaurant) {
  const queryString = `
    INSERT INTO restaurants (name, email, password, street, city, country, phone_number, type_of_cuisine)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    RETURNING *;
    `;
  const queryParams = [restaurant.name, restaurant.email, restaurant.password, restaurant.street, restaurant.city, restaurant.country, restaurant.phone_numer, restaurant.type_of_cuisine];
  return db.query(queryString, queryParams, 1);
}
exports.addRestaurant = addRestaurant;


/**
 * Get current orders for restaurant
 * @param {number} restaurant_id
 * @return {Promise<{}>} A promise to the restaurant.
 */

const getRestaurantOnGoingOrderFromId = (restaurant_id) => {
  const queryString = `
    SELECT *
    FROM orders
    WHERE restaurant_id = $1 AND order_status <> 'completed';
  `;
  const queryParams = [restaurant_id];
  return db.query(queryString, queryParams, 0);
}
exports.getRestaurantOnGoingOrderFromId = getRestaurantOnGoingOrderFromId;

/**
 * Update order status for order id
 * @param {number} order_id
* @param {string} order_status
 * @return {Promise<{}>} A promise to the restaurant.
 */

const updateOrderStatus = (order_id, order_status) => {
  const queryString = `
  UPDATE orders
  SET order_status = $1
  WHERE orders.id = $2
  RETURNING *;
  `;
  const queryParams = [order_status, order_id];
  return db.query(queryString, queryParams, 1)
}
exports.updateOrderStatus = updateOrderStatus;

/**
 * Delete order with order id
 * @param {number} order_id
 * @param {String} order_status
 * @return {Promise<{}>} A promise to the restaurant.
 */

 const deleteRejectedOrderWithId = (order_id) => {
  const queryString = `
    DELETE FROM orders
    WHERE orders.id = $1
    RETURNING *;
  `;
  const queryParams = [order_id];
  return db.query(queryString, queryParams, 1)
}
exports.deleteRejectedOrderWithId = deleteRejectedOrderWithId;

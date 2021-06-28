const db = require('./db');

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
 * Get orders from restaurant id
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
  return db.query(queryString, queryParams);
}
exports.getRestaurantOnGoingOrderFromId = getRestaurantOnGoingOrderFromId;


/**
 * Get orders from restaurant id
 * @param {string} order_status
 * @param {number} order_id
 * @return {Promise<{}>} A promise to the restaurant.
 */

const updateOrderStatus = (order_status, order_id) => {
  const queryString = `
    UPDATE orders
    SET order_status = $1
    WHERE orders.id = $2;
  `;
  const queryParams = [order_status, order_id];
  return db.query(queryString, queryParams)
}
exports.updateOrderStatus = updateOrderStatus;

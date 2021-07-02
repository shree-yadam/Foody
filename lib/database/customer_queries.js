const customers = require('../../routes/customers');
const db = require('./db');

/**
 * Get a single customer from the database given their email.
 * @param {String} email The email of the customer.
 * @return {Promise<{}>} A promise to the customer.
 */
const getCustomerWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM customers
    WHERE email = $1;
    `;
  const queryParams = [email];
  return db.query(queryString, queryParams, 1);
}
exports.getCustomerWithEmail = getCustomerWithEmail;

/**
 * Get a single Customer from the database given their id.
 * @param {string} id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const getCustomerWithId = function(id) {
  const queryString = `
    SELECT *
    FROM customers
    WHERE id = $1;
    `;
  const queryParams = [id];
  return db.query(queryString, queryParams, 1);
}
exports.getCustomerWithId = getCustomerWithId;


/**
 * Add a new Customer to the database.
 * @param {{name: string, password: string, email: string}} Customer
 * @return {Promise<{}>} A promise to the Customer.
 */
const addCustomer = function(customer) {
  const queryString = `
    INSERT INTO customers (name, phone_number, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
  const queryParams = [customer.name, customer.phonenumber, customer.email, customer.password];
  return db.query(queryString, queryParams, 1);
}
exports.addCustomer = addCustomer;

const createOrderForCustomerForRestaurant = function(customerId, restaurantId, itemIds, quantities) {
  const queryString = `
    INSERT INTO orders (customer_id, restaurant_id, order_date, order_status)
    VALUES ($1, $2,  NOW(), 'requested')
    RETURNING *;
    `;
  const queryParams = [customerId, restaurantId];
  return db.query(queryString, queryParams, 1);
}
exports.createOrderForCustomerForRestaurant = createOrderForCustomerForRestaurant;

/**
 * Insert order_items for the order ID
 * @param {number} order_id The id of the Customer.
 * @param {array} itemIds array of item ID
 * @param {array} quantities array of quantities for corresponding itemIDs
 * @return {Promise<{}>} A promise to the Customer.
 */
const addOrderItemsForOrderId = function(order_id, itemIds, quantities) {
  const promiseArray = [];
  for (let i = 0; i < itemIds.length; i++) {
    if (quantities[i]) {
      const queryString = `
              INSERT INTO order_items (order_id, menu_item_id, quantity, order_price)
              VALUES ($1, $2,  $3, ($3 * (SELECT price FROM menu_items WHERE id = $2)))
              RETURNING *;
            `;
      const queryParams = [order_id, parseInt(itemIds[i]), parseInt(quantities[i])];
      promiseArray.push(db.query(queryString, queryParams, 1));
    }
  }
  return Promise.all(promiseArray)
}
exports.addOrderItemsForOrderId = addOrderItemsForOrderId;

/**
 * Update TotalPrice for an order
 * @param {number} order_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const updateTotalPriceForOrder = function(order_id) {
  const queryString = `
    UPDATE orders
    SET total_price =
    (SELECT SUM(order_price) FROM order_items
    JOIN orders ON orders.id = order_items.order_id
    WHERE orders.id = $1
    GROUP BY orders.id)
    WHERE orders.id = $1
    RETURNING *;
    `;
  const queryParams = [order_id];
  return db.query(queryString, queryParams, 1);
}
exports.updateTotalPriceForOrder = updateTotalPriceForOrder;

/**
 * Get TotalPrice for an order
 * @param {number} order_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const getOrderFromId = function(order_id) {
  const queryString = `
    SELECT *
    FROM orders
    WHERE orders.id = $1;
    `;
  const queryParams = [order_id];
  return db.query(queryString, queryParams, 1);
}
exports.getOrderFromId = getOrderFromId;

/**
 * Get order and customer from order_id
 * @param {number} order_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const getOrderAndCustomerFromOrderId = function(order_id) {
  const queryString = `
    SELECT orders.id as id, customers.name as name, customers.phone_number as phone_number, orders.total_price as total_price
    FROM orders
    JOIN customers ON orders.customer_id = customers.id
    WHERE orders.id = $1;
    `;
  const queryParams = [order_id];
  return db.query(queryString, queryParams, 1);
}
exports.getOrderAndCustomerFromOrderId = getOrderAndCustomerFromOrderId;

/**
 * Get order and customer details from order_id
 * @param {number} order_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const getOrderDetailsAndCustomerAndRestaurantFromOrderId = function(order_id) {
  const queryString = `
      SELECT orders.id as id, customers.name as name, customers.phone_number as phone_number, menu_items.name as item_name, order_items.quantity as quantity, orders.total_price as total_price, order_items.order_price as order_price, menu_items.price as unit_price, restaurants.id as restaurant_id, restaurants.name as restaurant_name, restaurants.phone_number as restaurant_phone_number
      FROM orders
      JOIN customers ON orders.customer_id = customers.id
      JOIN order_items ON order_items.order_id = orders.id
      JOIN restaurants ON restaurants.id = orders.restaurant_id
      JOIN menu_items ON order_items.menu_item_id = menu_items.id
      WHERE orders.id = $1;
      `;
  const queryParams = [order_id];
  return db.query(queryString, queryParams, 0);
}
exports.getOrderDetailsAndCustomerAndRestaurantFromOrderId = getOrderDetailsAndCustomerAndRestaurantFromOrderId;

/**
 * Get current order and customer from order_id
 * @param {number} customer_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const getCurrentOrderAndItems = (customer_id) => {
  const queryString = `
    SELECT orders.id AS id, menu_items.name AS name, order_items.quantity AS quantity, orders.order_date AS date, orders.order_status AS status, total_price AS total
    FROM orders
    JOIN order_items ON orders.id = order_id
    JOIN menu_items ON menu_item_id = menu_items.id
    WHERE customer_id = $1 AND order_status <> 'completed'
    ORDER BY orders.order_date DESC, menu_items.name;
  `;
  const queryParams = [customer_id];
  return db.query(queryString, queryParams, 0);
}
exports.getCurrentOrderAndItems = getCurrentOrderAndItems;


/**
 * Get past order and items from order_id
 * @param {number} customer_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
const getPastOrderAndItems = (customer_id) => {
  const queryString = `
    SELECT orders.id AS id, menu_items.name AS name, order_items.quantity AS quantity, orders.order_date AS date, orders.order_status AS status, total_price AS total
    FROM orders
    JOIN order_items ON orders.id = order_id
    JOIN menu_items ON menu_item_id = menu_items.id
    WHERE customer_id = $1 AND order_status = 'completed'
    ORDER BY orders.order_date DESC, menu_items.name;
  `;
  const queryParams = [customer_id];
  return db.query(queryString, queryParams, 0);
}
exports.getPastOrderAndItems = getPastOrderAndItems;

/**
 * Get order and customer details from order_id
 * @param {number} customer_id The id of the Customer.
 * @return {Promise<{}>} A promise to the Customer.
 */
 const getLastorderForCustomer = function(customer_id) {
  const queryString = `
      SELECT orders.id as id, orders.order_date as date
      FROM orders
      JOIN customers ON orders.customer_id = customers.id
      WHERE customers.id = $1
      ORDER BY date DESC
      LIMIT 1;
      `;
  const queryParams = [customer_id];
  return db.query(queryString, queryParams, 1);
}
exports.getLastorderForCustomer = getLastorderForCustomer;

const deleteEmptyOrderWithId = (order_id) => {
  const queryString = `
    DELETE FROM orders
    WHERE orders.id = $1
    RETURNING *;
  `;
  const queryParams = [order_id];
  return db.query(queryString, queryParams, 1)
}
exports.deleteEmptyOrderWithId = deleteEmptyOrderWithId;

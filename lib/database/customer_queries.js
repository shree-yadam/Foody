const db = require('./db');
/**
 * Get a single customer from the database given their email.
 * @param {String} email The email of the customer.
 * @return {Promise<{}>} A promise to the customer.
 */
//TBD let itemIds
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
  ;
  const queryString = `
    INSERT INTO Customers (name, phone_number, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
  const queryParams = [customer.name, customer.phoneNumber, customer.email, customer.password];
  return db.query(queryString, queryParams, 1);
}
exports.addCustomer = addCustomer;

const createOrderForCustomerForRestaurant = function(customerId, restaurantId, itemIds, quantities) {
  const queryString = `
    INSERT INTO orders (customer_id, restaurant_id, order_date, order_status)
    VALUES ($1, $2,  NOW(), 'requested')
    RETURNING *
    `;
  const queryParams = [customerId, restaurantId];
  return db.query(queryString, queryParams, 1)
    .then(order => {
      const promisArray = [];
      for (let i = 0; i < itemIds.length; i++) {
        if (quantities[i]) {
          const queryString = `
            INSERT INTO order_items (order_id, menu_item_id, quantity, order_price)
            VALUES ($1, $2,  $3, ($3 * (SELECT price FROM menu_items WHERE id = $2)))
            RETURNING *
          `;
          const queryParams = [order.id, parseInt(itemIds[i]), parseInt(quantities[i])];
          promisArray.push(db.query(queryString, queryParams, 1));
        }
      }
      return Promise.all(promisArray)
        .then(data => data);
        // .catch(e => {
        //   console.error(e);
        // });
    })
    // .catch(e => {
    //   console.error(e);
    // });
}
exports.createOrderForCustomerForRestaurant = createOrderForCustomerForRestaurant;

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

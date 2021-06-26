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

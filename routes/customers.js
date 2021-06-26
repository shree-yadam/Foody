/*
 * All routes for Customers are defined here
 * Since this file is loaded in server.js into api/customers,
 *   these routes are mounted onto /customers
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/login/", (req, res) => {
    //Display customer login form
    res.send("customer Login");
  });
  router.get("/register/", (req, res) => {
    //display customer registration form
    res.send("customer registration form");
  });
  router.get("/:id/order/:order_id", (req, res) => {
    //Get order_id belonging to customer #id
    res.send(`customer ${req.params.id} order ${req.params.order_id}`);
  });
  router.post("/login/", (req, res) => {
    //Verify customer login information and display order placement form
    res.send("customer Login submitted");
  });
  router.post("/register/", (req, res) => {
    //Add customer details to DB and display order menu
    res.send("customer registration form submitted");
  });
  //STRETCH
  router.post("/:id/order", (req, res) => {
    //Post order for customer #id
    res.send(`customer ${req.params.id} order edit`);
  });
  return router;
};

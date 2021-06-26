/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into api/login,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //get menu display for main page no taking order
    res.send("Menu");
  });
  return router;
};

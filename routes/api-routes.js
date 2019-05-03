// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var dB = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/all", function(req, res) {
    //constructor capitalized
    dB.Message.findAll().then(function(results) {
      res.json(results);
      // res.render("index");
    });
    // Add a new message
    app.post("/api/new", function(req, res) {
      console.log("Message Data:");
      console.log(req.body);

      dB.Message.create({
        username: req.body.username,
        message: req.body.message
      }).then(function(results) {
        // `results` here would be the newly created message
        res.status(200).end();
      });
    });
  });
};
// Get all messages
//   app.get("/api/all", function(req, res) {
//     // Finding all Messages, and then returning them to the user as JSON.
//     // Sequelize queries are asynchronous, which helps with perceived speed.
//     // If we want something to be guaranteed to happen after the query, we'll use
//     // the .then function
//     Message.findAll({}).then(function(results) {
//       // results are available to us inside the .then
//       res.json(results);
//     });
//   });

//   // Add a message
//   app.post("/api/new", function(req, res) {
//     console.log("Message Data:");
//     console.log(req.body);

//     Message.create({
//       author: req.body.author,
//       body: req.body.body,
//       created_at: req.body.created_at
//     }).then(function(results) {
//       // `results` here would be the newly created message
//       res.end();
//     });
//   });
// };

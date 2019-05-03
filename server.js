var express = require("express");
var app = express();

// Load
let path = require("path");
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let hbs = require("express-handlebars");
//

let dB = require("./models");

let port = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Express Handlebars
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main" }));
app.set("views");
app.set("view engine", "hbs");

// require routes
// var routes = require("./controllers/spaceship_controller.js");
// app.use(routes);
// app.use("/", routes);

// Routes
// =============================================================
require("./routes/api-routes")(app);

// Chatroom

let numUsers = 0;

io.on("connection", socket => {
  let addedUser = false;

  // when the client emits 'new message', this listen and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
    var newMessage = {
      username: socket.username,
      message: data,
      category: "hello"
    };
    console.log(newMessage);

    // Send an AJAX POST-request with jQuery
    // app.post("/api/new", newMessage);
    // var message = new dB.Message();
    //import object on constructor function
    dB.Message.create(newMessage);
  });

  //newmessage is an object,

  // whtn the clitn emits 'add user', this listens and executes
  socket.on("add user", username => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });

  //when the user disconnects.. perform this

  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      //echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

// Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log(`Server listening on: http://localhost:${PORT}`);
// });

/**
 * Sequelize
 *
 * npx sequelize init - add sequelize magic to your project
 * npx sequelize db:create - create database based on config/config.json
 * npx sequelize model:generate --name <MODEL_NAME> --atributes attr1:string,attr2:text,attr3:<TYPE>
 * npx sequelize db:migrate - going to create a new table based off of the model creatred from the previous command
 */
// =======
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
// require("dotenv").config();
// app.get("/", (req, res) => {
//   res.send(process.env.SECRET_KEY);
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });
// >>>>>>> master
// >>>>>>> 81c37add5fbaaeb13081afe17d76c5de0e877913

app.get("/testroot", function(req, res) {
  res.render("filbert", { logoURL: "./public/assets/img/slack.svg" });
});

app.get("/chat", function(req, res) {
  res.render("chatroom");
});

// listener
server.listen(port, () => {
  console.log("Server listening at port http://localhost:" + port);
});

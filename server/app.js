var express = require("express");
var app = express();
var path = require("path");
var cors = require('cors');

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");

dotenv.config();
require("./db");




app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));


// //use this to show the image you have in node js server to client (react js)
// //https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// // Serve static assets if in production
if (process.env.NODE_ENV === "production") {

//   // Set static folder
  app.use(express.static("client/build"));

//   // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
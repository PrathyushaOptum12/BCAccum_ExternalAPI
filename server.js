var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const logger = require("morgan");
var routes = require("./api/routes/web3Routes");
const respHandler = require("./api/services/responseHandler");
const cors = require("cors");

require("body-parser-xml")(bodyParser);

//Middlewares

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.xml({
    limit: "1MB", // Reject payload bigger than 1 MB
    xmlParseOptions: {
      normalize: true, // Trim whitespace inside text nodes
      normalizeTags: false, // Transform tags to lowercase
      explicitArray: false // Only put nodes in array if >1
    }
  })
);

app.use(bodyParser.text());

// Route Middlewares
// app.use('/',convert);
// app.use("/accum", routes);

routes(app)

// Basic Test Route

app.get("/test", function(req, res) {
  return respHandler(null, req, res, "This is a Test api");
});

app.listen(port, function(err) {
  if (err) console.log("Error in connecting to server");
  console.log("Successfully Running on port 3000");
});

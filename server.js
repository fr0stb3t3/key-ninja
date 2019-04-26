const express = require("express");
const app = express();
app.use(express.json());

var cors = require("cors");
app.use(cors());

var fs = require("fs");

var data = JSON.parse(fs.readFileSync("Customer.txt", "utf8"));
console.log(data);
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/", function(req, res) {
  res.json(data);
});

app.post("/", function(req, res) {
  ndx = req.body[1];
  if (ndx === null) {
    data.push(req.body[0]);
  } else {
    data[ndx] = req.body[0];
  }
  fs.writeFile("Customer.txt", JSON.stringify(data), function(err) {
    if (err) {
      console.log(err);
    }
  });
  console.log(data);
});

app.delete("/", function(req, res) {
  console.log(req.body);
  data.splice(req.body.ndx, 1);
  fs.writeFile("Customer.txt", JSON.stringify(data), function(err) {
    if (err) {
      console.log(err);
    }
  });
});

const express = require("express");
const emailValidator = require("email-validator");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

//Public folder
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

app.post("/sendEmail", (req, res) => {
  if (emailValidator.validate(req.body.email)) {
    res.send({
      ok: true,
      status: 200
    });
  } else
    res.send({
      ok: false,
      status: 404
    });
});

app.listen(PORT, () => console.log(`serving site on ${PORT}`));

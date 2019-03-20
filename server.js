const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

app.listen(PORT, () => console.log(`serving site on ${PORT}`));

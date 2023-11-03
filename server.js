const express = require("express");
const app = express();
require("dotenv").config();
app.listen(3000, () => console.log("listening at 3000"));

app.use(express.static("public"));

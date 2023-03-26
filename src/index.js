const express = require("express");
const cors = require("cors");
const router = require("./router.js");

const app = express();

app.use(express.json(), cors(), router);

app.listen(4000);

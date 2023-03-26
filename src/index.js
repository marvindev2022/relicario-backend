const express = require("express");
const cors = require("cors");
const router = require("./router.js");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json(), cors(), router);

app.listen(4000);

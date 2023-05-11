require("dotenv").config();
const jwt = require("jsonwebtoken");
const knex = require("../service/instance");
const jwtSecret = process.env.JWT_SECRET;

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  try {
    const bearer = authorization.split(" ")[1];

    if (!authorization) return res.status(400).json({ message: "Faça login" });

    const { id } = jwt.verify(bearer, jwtSecret);

    const [user] = await knex("usuarios").where({ id });

    if (!user) return res.status(401).json({ message: "Unauthorized user" });

    req.user = user;
    next();
  } catch (error) {
    res.json(error);
  }
}

module.exports = validateToken;

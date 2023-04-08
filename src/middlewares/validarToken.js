const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = require("../service/instance");
const jwtSecret = process.env.JWT_SECRET;

async function validarToken(req, res, next) {
  const { authorization } = req.headers;
  try {
    const bearer = authorization.split(" ")[1];

    if (!authorization) return res.status(400).json({ mensagem: "Faça login" });

    const { id } = jwt.verify(bearer, jwtSecret);
    const { rows, rowCount } = await pool.query(
      `select * from usuarios where id = $1`,
      [id]
    );

    if (rowCount < 1)
      return res.status(401).json({ mensagem: "Não autorizado" });

    if (rowCount < 1) {
      const { rows, rowCount } = await pool.query(
        `select * from administradores where id = $1`,
        [id]
      );
      if (rowCount < 1)
        return res.status(401).json({ mensagem: "Não autorizado" });
    }
    req.usuario = rows[0];

    next();
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = validarToken;

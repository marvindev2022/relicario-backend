const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const senhaSegura = require('../controllers/senhaSegura')
=======
const senhaSegura = require("../controllers/senhaSegura");
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
const pool = require("../service/instance");

async function validarToken(req, res, next) {
  const { authorization } = req.headers;
<<<<<<< HEAD
=======

>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
  try {
    const bearer = authorization.split(" ")[1];

    if (!authorization) return res.status(400).json({ mensagem: "Faça login" });

    const { id } = jwt.verify(bearer, senhaSegura);
    const { rows, rowCount } = await pool.query(
      `select * from usuarios where id = $1`,
      [id]
    );

<<<<<<< HEAD
    if (rowCount < 1)
      return res.status(401).json({ mensagem: "Não autorizado" });

=======
    if (rowCount < 1) {
      const { rows, rowCount } = await pool.query(
        `select * from administradores where id = $1`,
        [id]
      );
      if (rowCount < 1)
        return res.status(401).json({ mensagem: "Não autorizado" });
    }
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
    req.usuario = rows[0];

    next();
  } catch (error) {
    res.json(error.message);
  }
}

<<<<<<< HEAD
module.exports = validarToken
=======
module.exports = validarToken;
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)

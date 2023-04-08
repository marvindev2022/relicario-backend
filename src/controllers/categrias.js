const pool = require("../service/instance");


async function listarCategorias(_, res) {
  try {
    const { rows:categorias } = await pool.query(`SELECT * FROM categorias;`);
    const { rows:subcategorias } = await pool.query(`SELECT * FROM subcategorias;`);

    return res.status(200).json({
      categorias,
      subcategorias
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  listarCategorias,
  
};

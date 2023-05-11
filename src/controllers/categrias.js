const knex = require("../service/instance");

async function listCategories(_, res) {
  try {
    const categories = await knex.select().from("categorias");
    const subcategories = await knex.select().from("subcategorias");

    return res.status(200).json({
      categories,
      subcategories,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  listCategories,
};

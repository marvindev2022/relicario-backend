const knex = require("../service/instance");

async function createProduct(req, res) {
  const {
    nome: name,
    descricao: description,
    preco: price,
    subcategoria_id: subcategory_id,
    categoria_id: category_id,
    quantidade: quantity,
    imagem: image,
  } = req.body;

  try {
    if (
      !name ||
      !description ||
      !price ||
      !subcategory_id ||
      !category_id ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields must be filled!" });
    }

    if (price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater or equal to zero!" });
    }

    const [insertData] = await knex("produtos")
      .insert({
        nome: name,
        descricao: description,
        preco: price,
        subcategoria_id: subcategory_id,
        categoria_id: category_id,
        quantidade: quantity,
        imagem: image,
      })
      .returning("*");

    return res.status(201).json(insertData);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const {
    nome: name,
    descricao: description,
    preco: price,
    subcategoria_id: subcategory_id,
    categoria_id: category_id,
    quantidade: quantity,
    imagem: image,
  } = req.body;

  try {
    if (
      !name ||
      !description ||
      !price ||
      !subcategory_id ||
      !category_id ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields must be filled in!" });
    }

    if (price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater than or equal to zero!" });
    }

    const [produtoExistente] = await knex("produtos").select().where("id", id);

    if (!produtoExistente) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await knex("produtos").where("id", id).update(
      {
        nome: name,
        descricao: description,
        preco: price,
        subcategoria_id: subcategory_id,
        categoria_id: category_id,
        quantidade: quantity,
        imagem: image,
      },
      [
        "id",
        "nome",
        "descricao",
        "preco",
        "subcategoria_id",
        "categoria_id",
        "quantidade",
        "imagem",
      ]
    );

    res.status(200).json(updatedProduct[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deletedRows = await knex("produtos").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listProducts(req, res) {
  try {
    const products = await knex
      .select(
        "p.*",
        "s.descricao as subcategoria_nome",
        "c.descricao as categoria_nome"
      )
      .from("produtos as p")
      .join("subcategorias as s", "p.subcategoria_id", "=", "s.id")
      .join("categorias as c", "p.categoria_id", "=", "c.id");
;

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await knex("produtos as p")
      .select("p.*", "s.descricao as subcategoria_nome")
      .join("subcategorias as s", "p.subcategoria_id", "=", "s.id")
      .where("p.id", id)
      .first();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProductPrice(req, res) {
  const { id } = req.params;
  const { preco: price } = req.body;

  try {
    const updatedProduct = await knex("produtos")
      .where({ id })
      .update({ preco: price })
      .returning("*");

    if (!updatedProduct[0]) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function modifyQuantity(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (typeof quantity === "undefined") {
      return res.status(400).json({ error: "Quantity must be informed" });
    }

    const result = await knex("produtos")
      .where({ id })
      .update({ quantidade: quantity })
      .returning("*");

    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listHighlights(req, res) {
  try {
    const result = await knex("destaques");

    if (result.length > 0) {
      return res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {

  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProductById,
  updateProductPrice,
  modifyQuantity,
  listHighlights,
};

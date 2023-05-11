const knex = require("../service/instance");









async function addToShoppingCart(req, res) {
  try {
    const { id } = req.user;
    const {
      nome:name,
      imagem:image,
      produtoId:productId,
      quantidade:quantity,
      valorTotal:totalPrice,
      tipoEnvio:shippingType,
      custoEnvio:shippingCost,
    } = req.body;

    if (
      !name ||
      !image ||
      !productId ||
      !quantity ||
      !totalPrice ||
      !shippingType ||
      !shippingCost
    ) {
      return res.status(401).json({ message: "Fill all fields!" });
    }

    const rows = await knex("transactions")
      .where("user_id", id)
      .andWhere("product_id", productId);

    if (rows.length) {
      const { quantidade: existingQuantity, valor_total: existingPrice } =
        rows[0];

      const newQuantity = parseFloat(existingQuantity) + quantity;
      const newPrice = parseFloat(existingPrice);

      const updatedRows = await knex("transactions")
        .where("product_id", productId)
        .update({ quantidade: newQuantity, valor_total: newPrice })
        .returning("*");

      if (updatedRows[0].quantidade < 1) {
        await knex("transactions")
          .where("quantidade", "<", 1)
          .delete();
      }

      return res.status(200).json(updatedRows[0]);
    } else {
      const insertedRows = await knex("transactions")
        .insert({
          user_id: id,
          nome:name,
          imagem:image,
          produto_id: productId,
          quantidade: quantity,
          valor_total: totalPrice,
          custo_envio: shippingCost ?? 0,
          tipo_envio: shippingType,
        })
        .returning("*");

      return res.status(200).json(insertedRows[0]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


async function listShoppingCart(req, res) {
  try {
    const { id } = req.user;

    const shoppingCartItems = await knex
      .select()
      .from("transacoes")
      .where({ usuario_id: id });

    return res.status(200).json(shoppingCartItems);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
};

async function deleteProductFromCart(req, res) {
  try {
    await pool.query(`DELETE FROM transactions WHERE quantity < 1`);
    res.json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  addToShoppingCart,
  listShoppingCart,
  deleteProductFromCart
};

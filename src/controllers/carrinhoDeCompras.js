const pool = require("../service/instance");

async function adicionarAoCarrinhoDeCompras(req, res) {
  try {
    const { id } = req.usuario;
    const {
      nome,
      imagem,
      produtoId,
      quantidade,
      valorTotal,
      tipoEnvio,
      custoEnvio,
    } = req.body;

    if (
      !nome ||
      !imagem ||
      !produtoId ||
      !quantidade ||
      !valorTotal ||
      !tipoEnvio ||
      !custoEnvio
    ) {
      return res.status(401).json({ mensagem: "Preencha todos os campos!" });
    }

    const { rows } = await pool.query(
      `SELECT * FROM transacoes WHERE usuario_id = $1 AND produto_id = $2`,
      [id, produtoId]
    );

    if (rows.length) {
      const { quantidade: existingQuantity, valor_total: existingPrice } =
        rows[0];

      const newQuantity = parseFloat(existingQuantity) + quantidade;
      const newPrice = parseFloat(existingPrice);

      const { rows: updatedRows } = await pool.query(
        `UPDATE transacoes SET quantidade = $1, valor_total = $2 WHERE produto_id = $3 RETURNING *`,
        [newQuantity, newPrice, produtoId]
      );

      if (updatedRows[0].quantidade < 1)
        await pool.query(
          `DELETE FROM transacoes WHERE quantidade < 1`
        );

      return res.status(200).json(updatedRows[0]);
    } else {
      const { rows: insertedRows } = await pool.query(
        `INSERT INTO transacoes (usuario_id,nome,imagem, produto_id, quantidade, valor_total, custo_envio, tipo_envio)
        VALUES ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING *`,
        [
          id,
          nome,
          imagem,
          produtoId,
          quantidade,
          valorTotal,
          custoEnvio ?? 0,
          tipoEnvio,
        ]
      );

      return res.status(200).json(insertedRows[0]);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro interno no servidor." });
  }
}

async function listarCarrinhoDeCompras(req, res) {
  try {
    const { id } = req.usuario;

    const { rows } = await pool.query(
      `SELECT * FROM transacoes WHERE usuario_id = $1`,
      [id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error});
  }
}

async function deletarProdutoCarrinho(req, res) {
  try {
    await pool.query(
      `DELETE FROM transacoes WHERE quantidade < 1;
`
    );
    res.json("deletei");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  adicionarAoCarrinhoDeCompras,
  deletarProdutoCarrinho,
  listarCarrinhoDeCompras,
};

async function realizarCompra(req, res) {
  const { id: id_usuario } = req.usuario;
  const { produto, preco } = req.body;

  if ([produto, preco].includes("undefined"))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });

  try {
    const params = [id_usuario, produto, preco];

    const insertCompra = await pool.query(
      `INSERT INTO compras (
      id_usuario,
      produto,
      preco
      ) VALUES ($1, $2, $3) RETURNING *`,
      params
    );

    return res.json({
      id: insertCompra.rows[0].id,
      produto: insertCompra.rows[0].produto,
      preco: insertCompra.rows[0].preco,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

async function listarCompras(req, res) {
  const { id: id_usuario } = req.usuario;

  try {
    const queryListarCompras = `SELECT * FROM compras WHERE id_usuario = $1`;
    const params = [id_usuario];
    const { rows } = await pool.query(queryListarCompras, params);

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}
async function adicionarProdutoCarrinho(req, res) {
  const { produto_id, quantidade } = req.body;
  const { id: user_id } = req.user;

  try {
    const selectQuery = `SELECT * FROM produtos WHERE id = $1`;
    const selectParams = [produto_id];

    const { rows: produtos, rowCount: produtosCount } = await pool.query(
      selectQuery,
      selectParams
    );

    if (produtosCount === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const { rows: carrinho, rowCount: carrinhoCount } = await pool.query(
      `SELECT * FROM carrinho WHERE user_id = $1 AND produto_id = $2`,
      [user_id, produto_id]
    );

    if (carrinhoCount === 0) {
      // Se não existir uma entrada para esse produto no carrinho, insere uma nova
      const insertQuery = `INSERT INTO carrinho (user_id, produto_id, quantidade) VALUES ($1, $2, $3) RETURNING *`;
      const insertParams = [user_id, produto_id, quantidade || 1];

      const { rows: carrinhoAtualizado } = await pool.query(
        insertQuery,
        insertParams
      );

      return res.json(carrinhoAtualizado[0]);
    } else {
      // Se já existir uma entrada para esse produto no carrinho, atualiza a quantidade
      const carrinhoAtualizado = await pool.query(
        `UPDATE carrinho SET quantidade = quantidade + $1 WHERE user_id = $2 AND produto_id = $3 RETURNING *`,
        [quantidade || 1, user_id, produto_id]
      );

      return res.json(carrinhoAtualizado.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

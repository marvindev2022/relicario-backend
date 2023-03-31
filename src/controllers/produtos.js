const pool = require("../service/instance");

async function cadastrarProduto(req, res) {
  const {
    nome,
    descricao,
    preco,
    subcategoria_id,
    categoria_id,
    quantidade,
    imagem,
  } = req.body;

  try {
    if (
      !nome ||
      !descricao ||
      !preco ||
      !subcategoria_id ||
      !categoria_id ||
      !quantidade
    ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos!" });
    }

    if (preco < 0) {
      return res
        .status(400)
        .json({ mensagem: "O preço deve ser maior ou igual a zero!" });
    }

    const { rows: insertData } = await pool.query(
      `INSERT INTO produtos (nome, descricao, preco, subcategoria_id,categoria_id ,quantidade,imagem) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *;`,
      [
        nome,
        descricao,
        preco,
        subcategoria_id,
        categoria_id,
        quantidade,
        imagem,
      ]
    );

    return res.status(201).json({
      id: insertData[0].id,
      nome: insertData[0].nome,
      descricao: insertData[0].descricao,
      preco: insertData[0].preco,
      subcategoria_id: insertData[0].subcategoria_id,
      categoria_id: insertData[0].categoria_id,
      quantidade: insertData[0].quantidade,
      imagem: insertData[0].imagem,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function atualizarProduto(req, res) {
  const { id } = req.params;
  const {
    nome,
    descricao,
    preco,
    subcategoria_id,
    categoria_id,
    quantidade,
    imagem,
  } = req.body;

  try {
    if (
      !nome ||
      !descricao ||
      !preco ||
      !subcategoria_id ||
      !categoria_id ||
      !quantidade
    ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos!" });
    }

    if (preco < 0) {
      return res
        .status(400)
        .json({ mensagem: "O preço deve ser maior ou igual a zero!" });
    }

    const { rows: produtoExistente } = await pool.query(
      `SELECT * FROM produtos WHERE id = $1`,
      [id]
    );

    if (!produtoExistente[0]) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const params = [
      nome,
      descricao,
      preco,
      subcategoria_id,
      categoria_id,
      quantidade,
      imagem,
      id,
    ];

    const { rows: produtoAtualizado } = await pool.query(
      `UPDATE produtos SET nome = $1, descricao = $2, preco = $3, subcategoria_id = $4, categoria_id = $5, quantidade = $6 ,imagem = $7 WHERE id = $8 RETURNING *`,
      params
    );

    res.status(200).json(produtoAtualizado[0]);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
}

async function deletarProduto(req, res) {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      "DELETE FROM produtos WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

async function listarProdutos(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT p.*, s.descricao as subcategoria_nome, c.descricao as categoria_nome
FROM produtos p 
JOIN subcategorias s ON p.subcategoria_id = s.id
JOIN categorias c ON s.categoria_id = c.id;
`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function buscarProdutoPorId(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      `SELECT p.*, s.descricao as subcategoria_nome FROM produtos p 
      JOIN subcategorias s ON p.subcategoria_id = s.id WHERE p.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function modificarPreco(req, res) {
  const { id } = req.params;
  const { preco } = req.body;

  try {
    const params = [preco, id];

    const data = await pool.query(
      `UPDATE produtos SET preco = $1 WHERE id = $2 RETURNING *;`,
      params
    );

    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
}

async function modificarQuantidade(req, res) {
  const { id } = req.params;
  const { quantidade } = req.body;
  try {
    if (typeof quantidade === "undefined") {
      return res.status(400).json({ error: "A quantidade deve ser informada" });
    }

    const params = [quantidade, id];
    const result = await pool.query(
      "UPDATE produtos SET quantidade = $1 WHERE id = $2 RETURNING *;",
      params
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function listarDestaques(req, res) {
  try {
    const { rows } = await pool.query("select * from destaques");
    if (rows.length > 0) return res.json(rows);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function adicionarAoCarrinhoDeCompras(req, res) {
  try {
    const { id } = req.usuario;
    const { produtoId, quantidade, valorTotal, tipoEnvio, custoEnvio } =
      req.body;

    if (
      ![produtoId, quantidade, valorTotal, tipoEnvio, custoEnvio].every(Boolean)
    ) {
      return res
        .status(401)
        .json({ mensagem: "Preencha todos os campos obrigatórios." });
    }

    const { rows } = await pool.query(
      `SELECT * FROM transacoes WHERE usuario_id = $1 AND produto_id = $2`,
      [id, produtoId]
    );

    if (rows.length) {
      const { quantidade: existingQuantity, valor_total: existingPrice } =
        rows[0];
      const newQuantity = parseFloat(existingQuantity) + quantidade;
      const newPrice = parseFloat(existingPrice) * newQuantity;

      const { rows: updatedRows } = await pool.query(
        `UPDATE transacoes SET quantidade = $1, valor_total = $2 WHERE produto_id = $3 RETURNING *`,
        [newQuantity, newPrice, produtoId]
      );

      return res.status(200).json(updatedRows[0]);
    } else {
      const { rows: insertedRows } = await pool.query(
        `INSERT INTO transacoes (usuario_id, produto_id, quantidade, valor_total, custo_envio, tipo_envio)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [id, produtoId, quantidade, valorTotal, custoEnvio, tipoEnvio]
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
    console.error(error);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro interno no servidor." });
  }
}

module.exports = {
  listarProdutos,
  listarDestaques,
  buscarProdutoPorId,
  adicionarAoCarrinhoDeCompras,
  listarCarrinhoDeCompras,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
  modificarPreco,
  modificarQuantidade,
};

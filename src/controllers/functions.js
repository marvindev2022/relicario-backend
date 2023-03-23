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
async function cadastrarTransacao(req, res) {
  const {
    usuario_id,
    produto_id,
    quantidade,
    valor_total,
    custo_envio,
    tipo_envio,
  } = req.body;

  try {
    if (
      !usuario_id ||
      !produto_id ||
      !quantidade ||
      !valor_total ||
      !custo_envio ||
      !tipo_envio
    ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos!" });
    }

    const { rows: insertData } = await pool.query(
      `INSERT INTO transacoes (
        usuario_id,
        produto_id,
        quantidade,
        valor_total,
        custo_envio,
        tipo_envio
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [usuario_id, produto_id, quantidade, valor_total, custo_envio, tipo_envio]
    );

    return res.status(201).json(insertData[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


async function listarTransacoes(req, res) {
  try {
    // Extrai o ID do usuário da requisição
    const userId = req.usuario.id;

    // Extrai o filtro de categorias da query string da requisição
    const filterByCategories = req.query.filtro;

    // Define a query base para selecionar transações
    let selectTransactionsQuery = `
      SELECT 
        t.id AS transaction_id, 
        t.tipo, 
        t.descricao, 
        t.valor, 
        t.data, 
        t.categoria_id, 
        t.usuario_id, 
        c.descricao AS category_name, 
        c.id 
      FROM 
        transacoes t 
        JOIN categorias c ON t.categoria_id = c.id 
      WHERE 
        t.usuario_id = $1
    `;

    // Define os parâmetros da query, iniciando com o ID do usuário
    const selectTransactionsParams = [userId];

    // Se houver filtro de categorias, adiciona as categorias à query e aos parâmetros
    if (filterByCategories) {
      const categories = filterByCategories.split(",");
      const placeholders = categories.map((_, i) => `$${i + 2}`);
      selectTransactionsQuery += ` AND c.descricao IN (${placeholders})`;
      selectTransactionsParams.push(...categories);
    }

    // Executa a query e extrai as transações retornadas
    const { rows: transactionRows } = await pool.query(
      selectTransactionsQuery,
      selectTransactionsParams
    );
    const transactions = transactionRows.map((data) => ({
      id: data.transaction_id,
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
      data: data.data,
      categoria_id: data.categoria_id,
      usuario_id: data.usuario_id,
      categoria_nome: data.category_name,
    }));

    // Retorna as transações como resposta da requisição
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);

    // Extrai a mensagem de erro do objeto de erro
    const { message } = error;

    return res
      .status(500)
      .json({ mensagem: `Erro interno do servidor: ${message}` });
  }
}

async function detalharTransacaoID(req, res) {
  try {
    const id = req.params.id;
    const query = `SELECT t.id as transacao_id,
     t.tipo,
     .descricao,
     t.valor,
     t.data,
     t.categoria_id,
     t.usuario_id, 
     c.descricao as categoria_nome,
     c.id as id_categoria 
      transacoes t join categorias c ON t.categoria_id = c.id WHERE t.id = $1;`;
    const { rows, rowCount } = await pool.query(query, [id]);

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    const insertData = {
      id: rows[0].transacao_id,
      tipo: rows[0].tipo,
      descricao: rows[0].descricao,
      valor: rows[0].valor,
      data: rows[0].data,
      categoria_id: rows[0].categoria_id,
      usuario_id: req.usuario.id,
      categoria_nome: rows[0].categoria_nome,
    };

    return res.status(200).json(insertData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

async function atualizarTransacaoID(req, res) {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        mensagem: "Informe um ID válido da Transação para atualização.",
      });
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos!" });
    }

    const { rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE categoria_id = $1`,
      [categoria_id]
    );

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: "Informe uma categoria válida da Transação para atualização.",
      });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({ mensagem: "Informe um tipo válido!" });
    }

    const params = [descricao, valor, data, categoria_id, tipo, id];
    await pool.query(
      `UPDATE transacoes 
      SET descricao = $1, 
      valor = $2, 
      data = $3, 
      categoria_id = $4, 
      tipo = $5 
      WHERE id = $6`,
      params
    );

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deletarTransacaoID(req, res) {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: "Informe um ID existente para a exclusão da transação.",
      });
    }

    await pool.query("DELETE FROM transacoes WHERE id = $1", [id]);

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json(error.message);
  }
}


async function listarExtrato(req, res) {
  const { id } = req.usuario;

  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 or tipo = $2 and usuario_id = $3;`,
      ["entrada", "saida", id]
    );

    if (rowCount === 0) {
      return res.status(200).json({
        entrada: 0,
        saida: 0,
      });
    }

    const { rows: entrada } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 and usuario_id = $2`,
      ["entrada", id]
    );

    const entryValue = entrada.map((value) => {
      return value.valor;
    });

    let entry = 0;

    for (const value of entryValue) {
      entry += parseInt(value);
    }

    const { rows: saida } = await pool.query(
      `SELECT * FROM transacoes WHERE tipo = $1 and usuario_id = $2`,
      ["saida", id]
    );

    const exitValue = saida.map((value) => {
      return value.valor;
    });
    let exit = 0;

    for (const value of exitValue) {
      exit += parseInt(value);
    }

    return res.status(201).json({
      entrada: entry,
      saida: exit,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  listarCategorias,
  listarTransacoes,
  detalharTransacaoID,
  cadastrarTransacao,
  atualizarTransacaoID,
  deletarTransacaoID,
  listarExtrato,
};

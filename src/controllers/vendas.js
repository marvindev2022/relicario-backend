const knex = require("knex");


async function realizarCompra(req, res) {
  const { id: id_usuario } = req.usua;
  const { produto, preco } = req.body;

  if ([produto, preco].includes(undefined))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });

  try {
    const compra = await pool("compras")
      .insert({
        id_usuario,
        produto,
        preco,
      })
      .returning("*");

    return res.json(compra[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function listarCompras(req, res) {
  const { id: id_usuario } = req.usua;

  try {
    const compras = await pool("compras").where("id_usuario", id_usuario);

    return res.json(compras);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function adicionarProdutoCarrinho(req, res) {
  const { produto_id, quantidade = 1 } = req.body;
  const { id: user_id } = req.user;

  try {
    const produtos = await pool("produtos").where("id", produto_id);

    if (produtos.length === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const carrinho = await pool("carrinho").where({
      user_id,
      produto_id,
    });

    if (carrinho.length === 0) {
      // Se não existir uma entrada para esse produto no carrinho, insere uma nova
      const carrinhoAtualizado = await pool("carrinho")
        .insert({
          user_id,
          produto_id,
          quantidade,
        })
        .returning("*");

      return res.json(carrinhoAtualizado[0]);
    } else {
      // Se já existir uma entrada para esse produto no carrinho, atualiza a quantidade
      const carrinhoAtualizado = await pool("carrinho")
        .where({
          user_id,
          produto_id,
        })
        .update({
          quantidade: knex.raw("quantidade + ?", quantidade),
        })
        .returning("*");

      return res.json(carrinhoAtualizado[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

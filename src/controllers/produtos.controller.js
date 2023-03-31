const pool = require("../service/instance");

async function listarProdutos(req, res) {
  const produtos = await pool.query("select * from produtos");

  if (produtos.rows.length > 0) return res.json(produtos.rows);

  return res.json("Nenhum produto cadastrado");
}


async function addProduto(req, res) {
  const { nome, categoria, preco, quantidade, medida } = req.body;

  const params = [nome, categoria, preco, quantidade, medida];
  const insert = await pool.query(
    ` INSERT INTO produtos (nome,categoria,preco,quantidade,medida) VALUES($1,$2,$3,$4,$5) returning *`,
    params
  );

  return res.json(insert.rows);
}

async function alterarPrecoProduto(req, res) {
  const { preco } = req.body;
  const { id } = req.params;

  const params = [preco, id];
  const produtoAlterado = await pool.query(
    `UPDATE produtos SET preco = $1 WHERE id = $2  returning *;`,
    params
  );

  return res.json(produtoAlterado.rows);
}
async function alterarQuantidadeProduto(req, res) {
  const { quantidade } = req.body;
  const { id } = req.params;

  const params = [quantidade, id];
  const produtoAlterado = await pool.query(
    `UPDATE produtos SET quantidade = $1 WHERE id = $2  returning *;`,
    params
  );

  return res.json(produtoAlterado.rows);
}

async function deletarProduto(req, res) {
  const { id } = req.params;

  const params = [id];
  await pool.query(` delete from produtos where id = $1`, params);

  return res.json("Deletado");
}
async function listarDestaques(req, res) {
  const {rows}= await pool.query("select * from destaques");
console.log(rows)
  if (rows.length > 0) return res.json(rows);
}

async function adicionarAoCarrinhoDeCompras(req,res){
const {id} = req.usuarios.rows[0]
const {produto_id,quantidade,custo_total,tipo_envio,custo_envio} = req.body

if ([produto_id, quantidade, custo_total, tipo_envio, custo_envio].includes(undefined)) return 
  try {
    const { rows } = await pool.query(
      `INSERT INTO carrinho (usuario_id,produto_id,quantidade,custo_total,tipo_envio,custo_envio) VALUES($1,$2,$3,$4,$5,$6,) returning *`,
      id
    );

    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
  
}
async function listarCarrinhoDeCompras(req,res){
const {id} = req.usuarios.rows[0]

try{
  const {rows} = await pool.query(`SELECT * from carrinho WHERE usuario_id = $1`,id)

  return res.status(200).json(rows)
}catch(error){
  res.status(500).json(error.message)
}
  
}


module.exports = {
  listarProdutos,
  listarDestaques,
  adicionarAoCarrinhoDeCompras,
  listarCarrinhoDeCompras,
  addProduto,
  alterarPrecoProduto,
  alterarQuantidadeProduto,
  deletarProduto,
};

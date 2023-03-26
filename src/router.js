const express = require("express");
const {
  atualizarProduto,
  buscarProdutoPorId,
  cadastrarProduto,
  deletarProduto,
  listarProdutos,
  listarDestaques,
  modificarPreco,
  modificarQuantidade,
} = require("./controllers/produtos");
const {
  alterarCadastro,
  cadastrarUsuario,
  realizarLogin,
  listarUsuario,
  listarUsuarios,
} = require("./controllers/usuarios.controller");
const {
  listarCategorias,
  listarExtrato,
  listarTransacoes,
  cadastrarTransacao,
  deletarTransacaoID,
  detalharTransacaoID,
  atualizarTransacaoID,
} = require("./controllers/functions");
const validarToken = require("./middlewares/validarToken");
const {
  realizarLoginADM,
  cadastrarADM,
} = require("./controllers/adm.controller");
const router = express();

router.get("/",(req,res)=>{
  res.send("Testando o deploy heroku!")
})
router.post("/usuario", cadastrarUsuario);
router.post("/login", realizarLogin);

router.post("/login/admcontroller", realizarLoginADM);
router.post("/adm/sign-up", cadastrarADM);

router.get("/produtos", listarProdutos);
router.get("/destaques", listarDestaques);
router.get("/categorias", listarCategorias);

router.use(validarToken);

router.get("/usuario/", listarUsuarios);
router.get("/usuario/:id", listarUsuario);
router.put("/usuario/:id/editar", alterarCadastro);

router.get("/transacoes", listarTransacoes);
router.get("/transacao/extrato", listarExtrato);
router.get("/transacao/:id", detalharTransacaoID);
router.post("/transacao", cadastrarTransacao);
router.put("/transacao/:id", atualizarTransacaoID);
router.delete("/transacao/:id", deletarTransacaoID);

// Rota para cadastrar um novo produto
router.post("/produtos", cadastrarProduto);

// Rota para listar todos os produtos

// Rota para obter informações de um produto específico
router.get("/produtos/:id", buscarProdutoPorId);

// Rota para atualizar as informações de um produto
router.put("/produtos/:id", atualizarProduto);

// Rota para excluir um produto
router.delete("/produtos/:id", deletarProduto);

router.patch("/produtos/:id/modificar-preco", modificarPreco);

router.patch("/produtos/:id/modificar-quantidade", modificarQuantidade);

module.exports = router;

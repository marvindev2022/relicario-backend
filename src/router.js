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
const { adicionarAoCarrinhoDeCompras, listarCarrinhoDeCompras } = require("./controllers/produtos.controller");
const router = express();

router.get("/", (req, res) => {
  res.send("Bem vindo a minha primeira api onlinecd !");
});
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

/*ADM*/
router.post("/produtos", cadastrarProduto);
router.get("/produtos/:id", buscarProdutoPorId);
router.put("/produtos/:id", atualizarProduto);
router.delete("/produtos/:id", deletarProduto);
router.patch("/produtos/:id/modificar-preco", modificarPreco);
router.patch("/produtos/:id/modificar-quantidade", modificarQuantidade);

router.post("/carrinho",adicionarAoCarrinhoDeCompras)
router.get("/carrinho",listarCarrinhoDeCompras)

module.exports = router;

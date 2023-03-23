const express = require("express");
const {
<<<<<<< HEAD
  cadastrarUsuario,
  realizarLogin,
  alterarCadastro,
} = require("./controllers/usuarios.controller");
const {addProduto, deletarProduto, alterarPrecoProduto, alterarQuantidadeProduto, listarProdutos} = require('./controllers/produtos.controller')
const validarToken = require("./middlewares/validarToken");
const router = express();


router.post("/", realizarLogin);
router.post("/signup/cadastro", cadastrarUsuario);

router.use(validarToken)
router.get("/produtos",listarProdutos);

router.post("/produtos",addProduto);

router.put("/usuarios/:id/editar",alterarCadastro);

router.patch("/produtos/:id/preco",alterarPrecoProduto);
router.patch("/produtos/:id/quantidade",alterarQuantidadeProduto);

router.delete("/produtos/:id",deletarProduto);
=======
  atualizarProduto,
  buscarProdutoPorId,
  cadastrarProduto,
  deletarProduto,
  listarProdutos,
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
const { realizarLoginADM, cadastrarADM } = require("./controllers/adm.controller");
const router = express();

router.post("/usuario", cadastrarUsuario);
router.post("/login", realizarLogin);

router.post("/login/admcontroller", realizarLoginADM);
router.post("/adm/sign-up", cadastrarADM);

router.get("/produtos", listarProdutos);
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

>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)

module.exports = router;

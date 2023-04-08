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
  listarCarrinhoDeCompras,
  adicionarAoCarrinhoDeCompras,
  deletarProdutoCarrinho,
} = require("./controllers/carrinhoDeCompras.js");
const {
  alterarCadastro,
  cadastrarUsuario,
  realizarLogin,
  listarUsuario,
  listarUsuarios,
} = require("./controllers/usuarios");
const { listarCategorias } = require("./controllers/categrias");
const validarToken = require("./middlewares/validarToken");
const { realizarLoginADM, cadastrarADM } = require("./controllers/adm");
const router = express();

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

/*ADM*/
router.post("/produtos", cadastrarProduto);
router.get("/produtos/:id", buscarProdutoPorId);
router.put("/produtos/:id", atualizarProduto);
router.delete("/produtos/:id", deletarProduto);
router.patch("/produtos/:id/modificar-preco", modificarPreco);
router.patch("/produtos/:id/modificar-quantidade", modificarQuantidade);

router.post("/carrinho", adicionarAoCarrinhoDeCompras);
router.delete("/carrinho", deletarProdutoCarrinho);
router.get("/carrinho", listarCarrinhoDeCompras);

module.exports = router;

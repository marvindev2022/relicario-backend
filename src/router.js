const express = require("express");
const { loginAdmin, registerAdmin } = require("./controllers/adm");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProductById,
  updateProductPrice,
  modifyQuantity,
  listHighlights,
} = require("./controllers/produtos");
const {
  updateUser,
  registerUser,
  login,
  getUser,
  listUsers,
} = require("./controllers/usuarios");
const {
  addToShoppingCart,
  listShoppingCart,
  deleteProductFromCart,
} = require("./controllers/carrinhoDeCompras.js");
const { listCategories } = require("./controllers/categrias");
const validateToken = require("./middlewares/validarToken");
const router = express();

router.post("/usuario", registerUser);
router.post("/login", login);

router.post("/login/admcontroller", loginAdmin);
router.post("/adm/sign-up", registerAdmin);

router.get("/produtos", listProducts);
router.get("/destaques", listHighlights);
router.get("/categorias", listCategories);

router.use(validateToken);

router.get("/usuario/", listUsers);
router.get("/usuario/:id", getUser);
router.put("/usuario/:id/editar", updateUser);

/*ADM*/
router.post("/produtos", createProduct);
router.get("/produtos/:id", getProductById);
router.put("/produtos/:id", updateProduct);
router.delete("/produtos/:id", deleteProduct);
router.patch("/produtos/:id/modificar-preco", updateProductPrice);
router.patch("/produtos/:id/modificar-quantidade", modifyQuantity);

router.post("/carrinho", addToShoppingCart);
router.delete("/carrinho", deleteProductFromCart);
router.get("/carrinho", listShoppingCart);

module.exports = router;

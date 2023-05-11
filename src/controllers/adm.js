const knex = require("../service/instance");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerAdmin(req, res) {
  const { name: nome, password: senha } = req.body;
  if (!name || !password) return res.json("Preencha todos os campos!");
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await knex("administradores").insert({
      nome: name,
      senha: encryptedPassword,
    });

    return res.json("Novo administrador adicionado");
  } catch (error) {
    if (
      error.message ===
      `duplicate key value violates unique constraint "usuarios_email_key"`
    )
      return res.status(400).json({ message: "Email já cadastrado" });

    return res.status(500).json({ message: error.message });
  }
}

async function loginAdmin(req, res) {
  const { name: nome, password: senha } = req.body;

  if ([name, password].includes("undefined"))
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser preenchidos!" });

  try {
    const query = `SELECT * FROM administradores WHERE name = ?`;
    const [admin] = await knex.raw(query, [name]);

    if (!admin || !(await bcrypt.compare(password, admin.password)))
      return res.status(400).json({ message: "Acesso negado!" });

    const token = jwt.sign(
      { id: admin.id, name: admin.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { password: _, ...loggedAdmin } = admin;
    return res.json({ admin: loggedAdmin, token });
  } catch (error) {
    if (
      error.message.includes(`
Cannot read properties of undefined (reading 'senha')`)
    )
      return res.status(401).json({ message: "Acesso negado!" });
    return res.status(500).json(error.message);
  }
}

async function listAdmins(req, res) {
  try {
    const admins = await knex("administradores").select("*");
    return res.json(admins);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
};

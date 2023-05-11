const knex = require("../service/instance");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(req, res) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const {
    nome: name,
    email: email,
    senha: password,
    cpf: cpf,
    data_nascimento: birthdate,
    telefone: phone,
    logradouro: street,
    numero: number,
    complemento: complement,
    bairro: neighborhood,
    cidade: city,
    estado: state,
    cep: zip_code,
  } = req.body;
  if (
    !name ||
    !email ||
    !password 
   
  )
    return res.json("Preencha todos os campos!");
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Informe um email valido!" });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const [user] = await knex("usuarios")
      .insert({
        nome: name,
        email,
        senha: encryptedPassword,
        cpf,
        data_nascimento: birthdate,
        telefone: phone,
        logradouro: street,
        numero: number,
        complemento: complement,
        bairro: neighborhood,
        cidade: city,
        estado: state,
        cep: zip_code,
      })
      .returning(["*"]);

    return res.json({
      id: user.id,
      name: user.nome,
      email: user.email,
      cpf: user.cpf,
      birthdate: user.data_nascimento,
      phone: user.telefone,
      street: user.logradouro,
      number: user.numero,
      complement: user.complemento,
      neighborhood: user.bairro,
      city: user.cidade,
      state: user.estado,
      zip_code: user.cep,
    });
  } catch (error) {
    if (
      error.message ===
      `duplicate key value violates unique constraint "usuarios_email_key"`
    )
      return res.status(400).json({ message: "Email já existe no cadastro!" });

    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if ([email, password].includes(undefined)) {
    return res.status(400).json({ message: "All fields must be filled!" });
  }

  try {
    const user = await knex("usuarios").where("email", email).first();

    if (!user) {
      return res.status(400).json({ message: "Invalid email/password!" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.senha);

    if (!passwordIsValid) {
      return res.status(400).json({ message: "Invalid email/password!" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.nome },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { senha: _, ...loggedInUser } = user;
    return res.json({ user: loggedInUser, token });
  } catch (error) {
    if (
      error.message.includes(
        `Cannot read properties of undefined (reading 'senha')`
      )
    ) {
      return res.status(401).json({ message: "Invalid email/password!" });
    }
    console.log(error)
    return res.status(500).json(error.message);
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const {
    nome: name,
    email: email,
    senha: password,
    cpf: cpf,
    data_nascimento: birthdate,
    telefone: phone,
    logradouro: street,
    numero: number,
    complemento: complement,
    bairro: neighborhood,
    cidade: city,
    estado: state,
    cep: zip_code,
  } = req.body;

  try {
    if (
      [
        name,
        email,
        password,
        cpf,
        birthdate,
        phone,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zip_code,
      ].includes(undefined)
    ) {
      return res.status(400).json({ message: "Fill in all fields" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const data = await knex("users")
      .where("id", id)
      .update({
        email: email,
        senha: password,
        cpf: cpf,
        data_nascimento: birthdate,
        telefone: phone,
        logradouro: street,
        numero: number,
        complemento: complement,
        bairro: neighborhood,
        cidade: city,
        estado: state,
        cep: zip_code,
      })
      .returning("*");

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function listUsers(req, res) {
  try {
    const users = await knex("usuarios").select("*");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

async function getUser(req, res) {
  const { id } = req.user;

  try {
    const user = await knex("usuarios").select("*").where({ id }).first();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  registerUser,
  login,
  updateUser,
  listUsers,
  getUser,
};

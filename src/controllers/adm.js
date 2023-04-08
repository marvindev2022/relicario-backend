const pool = require("../service/instance");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaSegura = require("../security/senhaSegura");

async function cadastrarADM(req, res) {
  const { nome, senha } = req.body;
  if (!nome || !senha) return res.json("Preencha todos os campos!");

  try {
    const senhaCryptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      `INSERT INTO administradores (nome,senha) VALUES ($1, $2 ) RETURNING *`,
      [nome, senhaCryptografada]
    );
    return res.json("Novo administrado adicionado");
  } catch (error) {
    if (
      error.message ===
      `duplicate key value violates unique constraint "usuarios_email_key"`
    )
      return res.status(400).json({ mensagem: "Email já cadastrado" });

    return res.status(500).json({ mensagem: error.message });
  }
}

async function realizarLoginADM(req, res) {
  const { nome, senha } = req.body;

  if ([nome, senha].includes("undefined"))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });

  try {
    const queryInsert = `SELECT * FROM administradores WHERE nome = $1`;
    const params = [nome];
    const { rows, rowCount } = await pool.query(queryInsert, params);
    const senhaValida = await bcrypt.compare(senha, rows[0].senha);

    if (rowCount < 1 || !senhaValida)
      return res.status(400).json({ mensagem: "Acesso negado!" });

    const token = jwt.sign(
      { id: rows[0].id, nome: rows[0].nome },
      senhaSegura,
      {
        expiresIn: "30d",
      }
    );

    const { senha: _, ...usuarioLogado } = rows[0];
    return res.json({ usuarioLogado, token });
  } catch (error) {
    if (
      error.message.includes(
        `Cannot read properties of undefined (reading 'senha')`
      )
    )
      return res.status(401).json({ mensagem: "acesso negado!" });
    return res.status(500).json(error.message);
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await pool.query(`SELECT * FROM administradores`);

    return res.json(usuarios.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function alterarCadastro(req, res) {
  const { id } = req.params;
  const {
    nome,
    email,
    senha,
    cpf,
    data_nascimento,
    telefone,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
  } = req.body;

  try {
    if (
      [
        nome,
        email,
        senha,
        cpf,
        data_nascimento,
        telefone,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
      ].includes(undefined)
    ) {
      return res.status(400).json("Preencha todos os campos");
    }

    const senhaCryptografada = await bcrypt.hash(senha, 10);

    const params = [
      nome,
      email,
      senhaCryptografada,
      cpf,
      data_nascimento,
      telefone,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      id,
    ];

    const data = await pool.query(
      `UPDATE administradores SET 
    nome = $1, 
    senha = $2, 
  WHERE id = $14 RETURNING *;`,
      params
    );

    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
module.exports = {
  cadastrarADM,
  realizarLoginADM,
  listarUsuarios,
};

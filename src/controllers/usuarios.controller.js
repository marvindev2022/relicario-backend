const pool = require("../service/instance");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaSegura = require("./senhaSegura");

async function cadastrarUsuario(req, res) {
<<<<<<< HEAD
  const { nome, email, endereco, senha } = req.body;

  if ([nome, email, endereco, senha].includes("undefined"))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });
  if (!email.includes("@"))
    return res
      .status(400)
      .json({ mensagem: "Informe um email no formato valido" });
  try {
    const senhaCryptografada = await bcrypt.hash(senha, 10);
    const params = [nome, email, endereco, senhaCryptografada];

    await pool.query(
      `INSERT INTO  usuarios (
    nome,
    email,
    endereco,
    senha
    ) values ($1,$2,$3,$4)`,
      params
    );

    return res.json({ mensagem: "Cadastro realizado com sucesso!" });
=======
  const emailRegex = /^\S+@\S+\.\S+$/;
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
  if (
    !nome ||
    !email ||
    !senha ||
    !cpf ||
    !data_nascimento ||
    !telefone ||
    !logradouro ||
    !numero ||
    !complemento ||
    !bairro ||
    !cidade ||
    !estado ||
    !cep
  )
    return res.json("Preencha todos os campos!");
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: "Informe um e-mail válido" });
  }

  try {
    const senhaCryptografada = await bcrypt.hash(senha, 10);

    const insertUser = await pool.query(
      `INSERT INTO usuarios (
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
    cep
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
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
      ]
    );
    const usuario = insertUser.rows[0];
    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      data_nascimento: usuario.data_nascimento,
      telefone: usuario.telefone,
      logradouro: usuario.logradouro,
      numero: usuario.numero,
      complemento: usuario.complemento,
      bairro: usuario.bairro,
      cidade: usuario.cidade,
      estado: usuario.estado,
      cep: usuario.cep,
    });
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
  } catch (error) {
    if (
      error.message ===
      `duplicate key value violates unique constraint "usuarios_email_key"`
    )
      return res.status(400).json({ mensagem: "Email já cadastrado" });

    return res.status(500).json({ mensagem: error.message });
  }
}

async function realizarLogin(req, res) {
  const { email, senha } = req.body;

  if ([email, senha].includes("undefined"))
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos!" });

  try {
    const queryInsert = `SELECT * FROM usuarios WHERE email = $1`;
    const params = [email];
    const { rows, rowCount } = await pool.query(queryInsert, params);
    const senhaValida = await bcrypt.compare(senha, rows[0].senha);

    if (rowCount < 1 || !senhaValida)
      return res.status(400).json({ mensagem: "Email/Senha invalido!" });
<<<<<<< HEAD
=======

>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
    const token = jwt.sign(
      { id: rows[0].id, nome: rows[0].nome },
      senhaSegura,
      {
<<<<<<< HEAD
        expiresIn: "1d",
=======
        expiresIn: "30d",
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
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
      return res.status(401).json({ mensagem: "Email/Senha invalido!" });
<<<<<<< HEAD
    return res.status(500).json({ mensagem: "Erro servidor" });
=======
    return res.status(500).json(error.message);
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
  }
}

async function alterarCadastro(req, res) {
  const { id } = req.params;
<<<<<<< HEAD
  const { nome, email, endereco, senha } = req.body;
  const senhaCryptografada = await bcrypt.hash(senha, 10);
  const params = [nome, email, endereco, senhaCryptografada, id];
  const update = await pool.query(
    `UPDATE usuarios SET nome = $1 ,email = $2 ,endereco = $3, senha = $4 WHERE id = $5 RETURNING *;`,
    params
  );

  res.json(update.rows);
=======
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
      `UPDATE usuarios SET 
    nome = $1, 
    email = $2, 
    senha = $3,
    cpf = $4,
    data_nascimento = $5,
    telefone = $6,
    logradouro = $7,
    numero = $8,
    complemento = $9,
    bairro = $10,
    cidade = $11,
    estado = $12,
    cep = $13
  WHERE id = $14 RETURNING *;`,
      params
    );

    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function listarUsuario(req, res) {
  const { id } = req.usuario;

  try {
    await pool.query(`SELECT * FROM usuarios WHERE id = $1;`, [id]);

    return res.json({
      id: req.usuario.id,
      nome: req.usuario.nome,
      email: req.usuario.email,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await pool.query(`SELECT * FROM usuarios`);

    return res.json(usuarios.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
}
module.exports = {
  cadastrarUsuario,
  realizarLogin,
  alterarCadastro,
<<<<<<< HEAD
=======
  listarUsuario,
  listarUsuarios,
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
};

const { Pool } = require("pg");

const pool = new Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "postgres",
<<<<<<< HEAD
  database: "portfolio",
=======
  database: "relicario",
>>>>>>> f678ac9 (rotas adm, usuario e produtos prontas)
});

module.exports = pool;

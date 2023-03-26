const { Pool } = require("pg");

const pool = new Pool({
  user: "yfajfrbz",
  password: "YJlbQxq1LGvmaqtNuQkNcai-tEqBesGl",
  host: "mahmud.db.elephantsql.com",
});

module.exports = pool;

const knex = require("knex");
require("dotenv").config();

module.exports = knex({
  client: "pg",
  connection: {
    host: "mahmud.db.elephantsql.com",
    user: "yfajfrbz",
    password: "YJlbQxq1LGvmaqtNuQkNcai-tEqBesGl",
    port: 5432,
    database: "yfajfrbz",
  },
});

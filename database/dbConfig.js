const knex = require("knex")


const knexfile = require("../knexfile")

const Knex = knex(knexfile[process.env.NODE_ENV]);

module.exports = Knex;



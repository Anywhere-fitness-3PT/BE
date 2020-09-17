exports.up = async function(knex) {
    await knex.schema.createTable("auth_codes", (table) => {
        table.increments()
        table.string("email").notNullable()
        table.integer("code")
        table.timestamps(true, true)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("auth_codes")
};

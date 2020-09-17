exports.up = async function(knex) {
    await knex.schema.createTable("user_roles", (table) => {
        table.increments()
        table.string("name").notNullable()
        table.timestamps(true, true)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("user_roles")
};

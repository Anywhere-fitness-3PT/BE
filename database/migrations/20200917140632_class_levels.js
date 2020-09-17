exports.up = async function(knex) {
    await knex.schema.createTable("class_levels", (table) => {
        table.increments()
        table.string("name").notNullable()
        table.timestamps(true, true)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('class_levels"')
};

exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("user_id")
        table.text("name").notNull()
        table.text("email").notNull()
        table.text("password1").notNull().unique()
        table.timestamps(true, true)
    })  
};

exports.down = async function(knex) {
    knex.schema.dropTableIfExists("users")
};


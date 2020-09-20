
exports.up = async function(knex) {
    await knex.schema.createTable("clients", (t) => {
        t.increments().primary()
        t.text("firstName").notNull()
        t.text("lastName").notNull()
        t.text("email").notNull().unique()
        t.text("password").notNull()
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("clients")
};

exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table
          .integer("role_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("user_roles")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.string("first_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamps(true, true);
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};

exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table
          .integer("role_id")
          .unsigned()
          .references("id")
          .inTable("user_roles")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("phone").nullable();
        table.string("gender").nullable();
        table.timestamps(true, true);
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};

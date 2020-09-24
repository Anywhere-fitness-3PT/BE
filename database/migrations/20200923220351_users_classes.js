
exports.up = async function(knex) {
    await knex.schema.createTable("users_classes", (table) => {
    table
        .integer("user_id")
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
     table
        .integer("class_id")
        .references("class_id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
    table.primary(["class_id", "user_id"])
    })
};

exports.down = async function(knex) {
    knex.schema.dropTableIfExists("users_classes")
};


exports.up = async function(knex) {
    await knex.schema.createTable("instructors_classes", (table) => {
    table
        .integer("instructor_id")
        .references("instructor_id")
        .inTable("instructors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
     table
        .integer("class_id")
        .references("class_id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
    table.primary(["class_id", "instructor_id"])
    })
};

exports.down = async function(knex) {
    knex.schema.dropTableIfExists("instructors_classes")
};


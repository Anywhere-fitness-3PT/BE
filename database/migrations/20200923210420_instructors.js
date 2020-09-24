exports.up = async function(knex) {
    await knex.schema.createTable("instructors", (table) => {
        table.increments("instructor_id")
        table.text("name").notNull()
        table.text("email").notNull()
        table.text("password").notNull().unique()
        // table
        //     .specificType("created_classes", "INT[]")
        //     .references("class_id")
        //     .inTable("classes")
        //     .onDelete("CASCADE")
        //     .onUpdate("CASCADE")
        table.timestamps(true, true)
    })  
};

exports.down = async function(knex) {
    knex.schema.dropTableIfExists("instructors")
};


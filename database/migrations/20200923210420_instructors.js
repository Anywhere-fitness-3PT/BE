exports.up = async function(knex) {
    await knex.schema.createTable("instructors", (table) => {
        table.increments("instructor_id")
        table.text("name", 128).notNull()
        table.text("email", 128).notNull().unique
        table.text("password", 128).notNull().unique()
        table.text("token", 128).unique()
        table.bigint("createdtime")
        table.bigint("registered")
        table.boolean("emailVerified")
        table.boolean("tokenusedbefore")
        table.text("reset_password_token", 128).unique()
        table.bigint("reset_password_expires")
        table.boolean("reset_password_token_used")
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


exports.up = async function(knex) {
    await knex.schema.createTable("classes", (table) => {
        table.increments()
        table.string("name").notNullable()
        table
          .integer("type")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("class_types")
          .onDelete("CASCADE")
          .onUpdate("CASCADE")
        table.time("start_time").notNullable()
        table.time("duration").notNullable()
        table
          .integer("level")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("class_levels")
          .onDelete("CASCADE")
          .onUpdate("CASCADE")
        table.string("location").notNullable()
        table.integer("attendees").notNullable().default(0)
        table.integer("max_size").notNullable()
        table.string("schedule").notNullable()
        table.text("description")
        table.timestamps(true, true)
    })
};

exports.down = async function(knex) {
    await knex.schema.xropTableIfExists("classes")
};
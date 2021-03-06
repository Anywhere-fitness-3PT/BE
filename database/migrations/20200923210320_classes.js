exports.up = async function (knex) {
    await knex.schema.createTable("classes", (table) => {
      table.increments("class_id");
      table.string("name").notNullable();
      table
        .integer("type")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("class_types")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.date("class_date");
      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
      table.integer("duration").notNullable();
      table
        .integer("level")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("class_levels")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("location").notNullable();
      table.integer("attendees").notNullable().default(0);
      table.integer("max_size").notNullable();
      table.text("description").nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("classes");
  };


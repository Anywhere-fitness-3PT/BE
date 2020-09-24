exports.up = async function (knex) {
    await knex.schema.createTable("class_types", (table) => {
      table.increments();
      table.string("name").notNullable();
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("class_types");
  };


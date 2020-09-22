exports.seed = async function(knex) {
  // Delete all existing entries
  await knex("user_roles").del()
    .then(async function() {
      // inserts seed entries
      await knex("user_roles").insert([
        { name: "Basic" },
        { name: "Client" },
        { name: "Instructor" }
      ])
    })
}



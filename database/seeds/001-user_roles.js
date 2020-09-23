exports.seed =  function(knex) {
  // Delete all existing entries
  return knex("user_roles").del()
    .then(async function() {
      // inserts seed entries
      await knex("user_roles").insert([
        { name: "Client" },
        { name: "Instructor" }
      ])
    })
}



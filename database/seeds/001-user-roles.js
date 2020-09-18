exports.seed = async function(knex) {
  await knex("user_roles").insert([
    { name: "Admin" },
    { name: "Client" },
    { name: "Instructor" }
  ])
}



exports.seed = async function(knex) {
  // delete all existing entries
  await knex("class_levels").del()
  .then( async function() {
    // insert seed entries
    await knex("class_levels").insert([
      { name: "Beginner" },
      {name: "Intermediate" },
      { name: "Advanced" }
    ])
  })
}
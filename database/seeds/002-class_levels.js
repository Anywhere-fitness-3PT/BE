exports.seed =  function(knex) {
  // delete all existing entries
  return knex("class_levels").del()
  .then( async function() {
    // insert seed entries
    await knex("class_levels").insert([
      { name: "Beginner" },
      {name: "Intermediate" },
      { name: "Advanced" }
    ])
  })
}
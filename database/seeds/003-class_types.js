exports.seed =  function(knex) {
  // delete all existing entries
 return knex("class_types").del()
  .then(async function () {
    // insert seed entries
    await knex("class_types").insert([
      { name: "Yoga" },
      { name: "Pilates" },
      { name: "Kickboxing" },
      { name: "Bootcamp" }
    ])
  })
}

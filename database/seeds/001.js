exports.seed = async function(knex) {
  await knex("class_types").insert([
    { name: "Yoga" },
    { name: "Kickboxing" },
    { name: "Pilates" },
    { name: "Bootcamp" }
  ])
}
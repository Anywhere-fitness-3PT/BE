

exports.seed = async function(knex) {
	await knex("class_levels").insert([
		{ name: "Beginner"},
    { name: "Intermediate"},
    { name: "Advanced"},
  
	])
}
   
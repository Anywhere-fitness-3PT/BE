
exports.seed = async function(knex) {
	await knex("class_types").insert([
		{ name: "Yoga"},
    { name: "Pilates"},
    { name: "Kickboxing"},
    { name: "Bootcamp"},
	])
}
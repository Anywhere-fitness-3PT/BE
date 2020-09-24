exports.seed = async function(knex) {
	await knex("users").insert([
    {name: "client1", email: "client1@gmail.com", password: "password1"},
    {name: "client2", email: "client2@gmail.com", password: "password2"},
    {name: "client3", email: "client3@gmail.com", password: "password3"},

	])
}
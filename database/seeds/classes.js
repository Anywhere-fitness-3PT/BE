exports.seed = async function(knex) {
	await knex("classes").insert([
    {
      name: "class1", 
      type: 1, 
      start_time: "9:30", 
      end_time: "10:30", 
      level: 1, 
      location: "park1",
      attendees: 12,
      max_size: 15,
      description: "class1"
    },
    {
      name: "class2", 
      type: 2, 
      start_time: "1:30", 
      end_time: "2:30", 
      level: 1, 
      location: "park2",
      attendees: 5,
      max_size: 15,
      description: "class2"
    },
    {
      name: "class3", 
      type: 3, 
      start_time: "11:30", 
      end_time: "12:30", 
      level: 2, 
      location: "park3",
      attendees: 8,
      max_size: 15,
      description: "class3"
    },
  
	])
}
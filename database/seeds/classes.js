exports.seed = async function(knex) {
  await knex("classes").insert([
    {
      name: "class1", 
      instructor_name: "instructor1", 
      type: 1, 
      start_time: "9:00", 
      end_time: "10:30", 
      level: 2,
      location: "park",
      attendees: 10,
      max_size: 15,
      schedule: "anything",
      description: "anything"
    },
    {
      name: "class2", 
      instructor_name: "instructor2", 
      type: 3, 
      start_time: "11:00", 
      end_time: "12:30", 
      level: 2,
      location: "park2",
      attendees: 10,
      max_size: 15,
      schedule: "anything",
      description: "anything"
    }
  ])
}

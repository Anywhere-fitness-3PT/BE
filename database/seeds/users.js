exports.seed = async function(knex) {
  await knex("users").insert([
    {role_id: 2,
     first_name: "fname1", 
     last_name: "lname1", 
     email: "email1@gmail.com" , 
     password: "pass1", 
     phone: "12343", 
     gender: "male"
    },
    {role_id: 3,
      first_name: "fname2", 
      last_name: "lname2", 
      email: "email2@gmail.com" , 
      password: "pass2", 
      phone: "12343", 
      gender: "male"
     },
     {role_id: 2,
      first_name: "fname3", 
      last_name: "lname3", 
      email: "email3@gmail.com" , 
      password: "pass3", 
      phone: "12343", 
      gender: "male"
     },
     {role_id: 3,
      first_name: "fname4", 
      last_name: "lname4", 
      email: "email4@gmail.com" , 
      password: "pass4", 
      phone: "12343", 
      gender: "male"
     },
  ])
}

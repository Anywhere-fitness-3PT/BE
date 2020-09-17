exports.seed = function(knex, Promise) {
  return knex('clients').truncate()
    .then(function () {
      return knex('clients').insert([
        {
          firstName:"test1",
          lastName: "lname1",
          email: "test1@gmail.com",
          password: "pass1"
      
        },
        {
          firstName:"test2",
          lastName: "lname2",
          email: "test2@gmail.com",
          password: "pass2"
      
        }
      ]);
    });
};

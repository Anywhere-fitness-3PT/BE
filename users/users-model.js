const db = require("../database/dbConfig")

async function add(user){
    await db("users").insert(user).returning("id")
    return findBy(user)
}
function findBy(filter){
    return db("users")
        .select("*")
        .where(filter)
}

function findById(id){
    return db("users")
        .select("id", "email")
        .where({id})
        .first()
}
function findUserRoleById(id){
    console.log('looking for id ', id);
    return db("user_roles")
        .select("name")
        .where({id})
        .first()
}
module.exports= {
    add,
    findById,
    findBy,
    findUserRoleById
}
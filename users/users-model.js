const db = require("../database/dbConfig")

async function add(user){
    await db("users").insert(user).returning("user_id")
    return findBy(user)
}
function findBy(filter){
    return db("users")
        .select("*")
        .where(filter)
}

function findById(id){
    return db("users")
        .select("*")
        .where("user_id", id)
        .first()
}
function update(id, updateInfo){
    return db("users")
    .where("user_id", id)
    .update(updateInfo)
}
module.exports= {
    add,
    findById,
    findBy,
    // findUserRoleById,
    update
}
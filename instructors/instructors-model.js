const db = require("../database/dbConfig")

async function add(instructor){
    await db("instructors").insert(instructor).returning("instructor_id")
    return findBy(user)
}
function findBy(filter){
    return db("instructors")
        .select("*")
        .where(filter)
}

function findById(id){
    return db("instructors")
        .select("*")
        .where("instructor_id", id)
        .first()
}
function update(id, updateInfo){
    return db("instructors")
    .where("instructor_id", id)
    .update(updateInfo)
}
module.exports= {
    add,
    findById,
    findBy,
    update
}


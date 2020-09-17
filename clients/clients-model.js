const db = require("../database/dbConfig")

async function add(client){
    await db("clients").insert(client).returning("id")
    return findBy(client)
}
function findBy(filter){
    return db("clients")
        .select("id","email","password")
        .where(filter)
}

function findById(id){
    return db("clients")
        .select("id", "email")
        .where({id})
        .first()
}
module.exports= {
    add,
    findById,
    findBy
}
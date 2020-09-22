const db = require("../database/dbConfig")

function findClasses(){
    return db("classes")
    .select("*")
}

function findBy(filter){
    console.log('filter ', filter);
    return db("classes")
        .select("*")
        .where(filter)
        .first()
}
function add(newClass){
    return db("classes").insert(newClass).returning("name")
}
function remove(id){
    return db("classes")
    .where("id", id)
    .del()
}
function update(id, updateInfo){
    return db("classes")
    .where("id", id)
    .update(updateInfo)
}
function addAtt(classId, attendees){
    return db("classes")
    .where("id", classId)
    .update(attendees)
}

module.exports= {
    findClasses,
    findBy,
    add,
    remove,
    update,
    addAtt
}
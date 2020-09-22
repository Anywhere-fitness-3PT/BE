const db = require("../database/dbConfig")

function findClasses(){
    return db("classes")
    .select("name","instructor_name","start_time", "end_time",)
}

function findBy(filter){
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
    .where("classes.id", id)
    .del()
}
function update(id, updateInfo){
    return db("classes")
    .where("classes.id", id)
    .update(updateInfo)
}

module.exports= {
    findClasses,
    findBy,
    add,
    remove,
    update
}
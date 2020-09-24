const db = require("../database/dbConfig")

function findClasses(){
    return db("classes")
    .select("*")
}

function findBy(filter){
    return db("classes")
        .select("*")
        .where("class_id", filter)
        .first()
}
function update(id, updateInfo){
    return db("classes")
    .where("id", id)
    .update(updateInfo)
}
function updateAtt(classId, attendees){
    return db("classes")
    .where("class_id", classId)
    .update({attendees})
}
function addToUserClasses(object){
    return db("users_classes").insert(object).returning("*")

}
function findObject(object){
    return db("users_classes")
    .where(function () {
        this
          .where("user_id",object.user_id)
          .andWhere("class_id", object.class_id)
      })
}
function removeFromUserClasses(object){
    return db("users_classes")
    .where(function(){
        this
        .where("user_id",object.user_id)
        .andWhere("class_id", object.class_id)
    })
    .del()
}
module.exports= {
    findClasses,
    findBy,
    update,
    updateAtt,
    addToUserClasses,
    findObject,
    removeFromUserClasses,
}
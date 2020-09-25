const db = require("../database/dbConfig")

async function add(instructor) {
    await db("instructors").insert(instructor).returning("instructor_id")
    return findBy(user)
}
function findBy(filter) {
    return db("instructors")
        .select("*")
        .where(filter)
}

function findById(id) {
    return db("instructors")
        .select("*")
        .where("instructor_id", id)
        .first()
}
function update(id, updateInfo) {
    return db("instructors")
        .where("instructor_id", id)
        .update(updateInfo)
}
function findall() {
    return db("classes")
        .join("instructors", "instructors.instructor_id")
        .join("class_types", "classes.type", "=", "class_types.id")
        .join("class_levels", "classes.level", "=", "class_levels.id")
        .select(
            "classes.class_id as class_id",
            "name",
            "instructor_id",
            "instructors.name as instructors_name",
            "class_types.name",
            "class_date",
            "start_time",
            "duration",
            "location",
            "attendees",
            "max_size"
        )
        .orderBy("classes.class_id")
}
function addClass(classObj) {
    const [id] = await db("classes").insert(classObj)

    return db("classes")
        .join("instructors", "instructors.instructor_id")
        .join("class_types", "classes.type", "=", "class_types.id")
        .join("class_levels", "classes.level", "=", "class_levels.id")
        .select(
            "classes.class_id as class_id",
            "name",
            "instructor_id",
            "instructors.name as instructors_name",
            "class_types.name",
            "class_date",
            "start_time",
            "duration",
            "intensity",
            "location",
            "attendees",
            "max_size"
        )
        .where("classes.class_id", id)
        .first()
}
function updateClass(id, changes) {
    await db("classes").where({ class_id }).update(changes)

    return db("classes")
        .join("instructors", "instructors.instructor_id")
        .join("class_types", "classes.type", "=", "class_types.id")
        .join("class_levels", "classes.level", "=", "class_levels.id")
        .select(
            "classes.class_id as class_id",
            "name",
            "instructor_id",
            "instructors.name as instructors_name",
            "class_types.name",
            "class_date",
            "start_time",
            "duration",
            "intensity",
            "location",
            "attendees",
            "max_size"
        )
        .where("classes.class_id", id)
        .first()
}
function removeClass(id) {
    return db("classes").where({ class_id }).del()
}

module.exports = {
    add,
    findById,
    findBy,
    update,
    addClass,
    updateClass,
    removeClass
}


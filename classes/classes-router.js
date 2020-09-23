
const express = require("express")
const Classes = require("./classes-model")
const restrict = require("./classes-middleware")


const router = express.Router()

router.get("/users/classes", restrict(), async(req, res, next) => {
    try{
        res.json(await Classes.findClasses())
    }
    catch (err){
        console.log(err)
        next(err)
    }
})
router.post("/users/classes", restrict("Instructor"), async(req, res, next) => {
    
    try{
        const {
            name, 
            instructor_name, 
            type, 
            start_time, 
            end_time, 
            level,
            location,
            attendees,
            max_size,
            schedule,
            description
        } = req.body

        const findClass = await Classes.findBy({name}).first()
        if(findClass){
            return res.status(409).json({
                message: "class name already taken"
            })
        }

        const newClass = await Classes.add({
            name, 
            instructor_name, 
            type, 
            start_time, 
            end_time, 
            level,
            location,
            attendees,
            max_size,
            schedule,
            description
        })
        res.status(201).json(newClass)
        
    }
    catch(err){
        console.log(err)
        next(err)
    }
})
router.delete("/users/classes/:id", restrict("Instructor"), async(req, res, next) => {
    try{  
        const {id} = req.params  
        const findClass = await Classes.findBy({id}).first()
        if(findClass){
            await Classes.remove(id)
            res.json({
                message: "Class Removed"
            })
        }
        else{
            res.status(404).json({
                message: "Cannot find class with given Id"
            })
        }
    }
    catch(err){
        next(err)
    }
})

router.put("/users/classes/:id", restrict("Instructor"), async(req, res, next) => {    
    try{
        const {id} = req.params
        const findClass = await Classes.findBy({id}).first()
        if(findClass){
            await Classes.update(id, req.body)  
            res.json({
                message: "class is updated"
            })  
        }
        else {
                res.status(404).json({
                    message: "Cannot find class with given Id"
                })
        }
    }
    catch(err){
        next(err)
    }
})

router.post("/users/classes/:classId", restrict(), async(req, res, next) => {
    const {classId} = req.params
    const findClass = await Classes.findBy({id: classId}).first()
    let numAtt = findClass.attendees
    const maxAtt = findClass.max_size
    if(numAtt >= maxAtt){
        res.json({
            message: "Cannot sign up for class. Class is full"
        })
    } else 
    {
        numAtt++;
        await Classes.addAtt(classId, numAtt);
        res.json({
            message: "You're signed up for the class"  })
    }
})

module.exports = router
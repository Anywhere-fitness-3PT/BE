
const express = require("express")
const Classes = require("./classes-model")
const restrict = require("./classes-middleware")



const router = express.Router()

router.get("/clients/classes", restrict(), async(req, res, next) => {
    try{
        res.json(await Classes.findClasses())
    }
    catch (err){
        console.log(err)
        next(err)
    }
})

router.post("/clients/:id/classes/:classId", restrict(), async(req, res, next) => {
    try {
        const {classId} = req.params
        const {id} = req.params
        const findClass = await Classes.findBy(classId).first()
        const object = {user_id: id, class_id: classId}
        const findObject = await Classes.findObject(object).first()
        let numAtt = findClass.attendees
        const maxAtt = findClass.max_size
        if(numAtt >= maxAtt){
            res.json({
                message: "Cannot sign up for class. Class is full"
            })
        } else 
        if(findObject){
            res.json({
                message: "You already sign up for this class"
            })
        } else
        {
            numAtt++;
            await Classes.updateAtt(classId, numAtt)
            await Classes.addToUserClasses(object)
            res.json({
                message: "You're signed up for the class"  })
        }
    }
    catch (err){
        console.log(err)
        next(err)
    }
    
})
router.delete("/clients/:id/classes/:classId", restrict(), async(req, res, next) => {
    try{  
        const {classId} = req.params 
        const {id} = req.params 
        const findClass = await Classes.findBy(classId).first()
        let numAtt = findClass.attendees
        const object = {user_id: id, class_id: classId}
        console.log('object', object)
        console.log("findclass", findClass)
        if(findClass){
            numAtt--;
            await Classes.updateAtt(classId, numAtt)
            await Classes.removeFromUserClasses(object)
            res.json({
                message: "You're withdrawn from the class"  })
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

router.get("/clients/:id/classes", restrict(), async (req, res, next) => {
    try{
        const {id} = req.params
        classesByClientID = await Classes.findClassesByStudentId(id)
        res.json(classesByClientID)
    }
    catch(err){
        next(err)
    }
})


module.exports = router
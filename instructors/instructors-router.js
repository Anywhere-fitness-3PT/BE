const express = require("express")
const jwt = require("jsonwebtoken")

const instructorOnly = require("./instructors-middleware")

const router = express.Router()

router.post("/register", async(req, res, next) =>{
    try{
        const {firstName, lastName, email, password} = req.body
        const client = await Clients.findBy({email}).first();
        if(client){
            res.status(409).json({
                message: "Email Already Use"
            })
        } 
        const newClient = await Clients.add({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 14)
        })

        res.status(201).json(newClient)
    }
    catch(err){
        console.log(err)
        next(err)
    }
})
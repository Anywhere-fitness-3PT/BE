const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Clients = require("./clients-model")
const restrict = require("./clients-middleware")

const router = express.Router()

router.post("/clients/register", async(req, res, next) =>{
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

module.exports = router
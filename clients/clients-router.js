const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Clients = require("./clients-model")
const restrict = require("./clients-middleware")

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
router.post('/login', async(req, res, next) => {
    // implement login
    try {
      const { email, password } = req.body
      const client = await Clients.findBy({ email }).first()
      if (!client) {
          return res.status(401).json({
              message: "Invalid Credentials, wrong user name",
          })
      }
      // hash the password again and see if it matches what we have in the database
      const passwordValid = await bcrypt.compare(password, client.password)
      if (!passwordValid) {
          return res.status(401).json({
              message: "Invalid Credentials, wrong password",
          })
      }
      // generate a new JSON web token
      const token = jwt.sign({
          id: client.id,
          userRole: "basic", // this value would normally come from the database
      }, process.env.JWT_SECRET)
  
      // send the token back as a cookie
      res.cookie("token", token)
  
      res.json({
        message: `Welcome ${client.email}!`,
        token,
          })
      } catch(err) {
          next(err)
      }
  });

router.get("/clients/classes", restrict(), async(req, res, next) => {
    try{
        res.json(await Classes.find())
    }
    catch (err){
        console.log(err)
        next(err)
    }
})
module.exports = router

module.exports = router
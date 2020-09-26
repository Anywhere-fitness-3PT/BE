const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("./users-middleware")

const router = express.Router()

router.post("/clients/register", async(req, res, next) =>{
    try{
        const {name, email, password} = req.body
        const user = await Users.findBy({email}).first();
        if(user){
            return res.status(409).json({
                message: "Email Already Use"
            })
        } 
        const newUser = await Users.add({
            name, 
            email,
            password: await bcrypt.hash(password, 14),
        })

        res.status(201).json(newUser)
    }
    catch(err){
        console.log(err)
        next(err)
    }
})
router.post('/clients/login', async(req, res, next) => {
    // implement login
    try {
      const { email, password } = req.body
      const user = await Users.findBy({ email }).first()
      if (!user) {
          return res.status(401).json({
              message: "Invalid Credentials, wrong user name",
          })
      }
      // hash the password again and see if it matches what we have in the database
      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
          return res.status(401).json({
              message: "Invalid Credentials, wrong password",
          })
      }

      // generate a new JSON web token
      const token = jwt.sign({
        //   id: user.id,
        //   userRole: userType.name, // this value would normally come from the database
      }, process.env.JWT_SECRET)
  
      // send the token back as a cookie
      res.cookie("token", token)
  
      res.json({
        message: `Welcome ${user.email}!`,
        token, 
        user
        })
      } catch(err) {
          next(err)
      }
  });

  router.put("/clients/:id", restrict(), async(req, res, next) => {
    try{
        const {id} = req.params
        const user = await Users.findById(id).first()
        const newInfo = req.body
        console.log("newInfo", newInfo)
        if (newInfo.password){
            newInfo.password = await bcrypt.hash(newInfo.password, 14)
        }
        if(user){
            await Users.update(id, newInfo)
            res.json({
                message: "user is updated"
            })
        }
    }
    catch(err){
        next(err)
    }

  } )
module.exports = router
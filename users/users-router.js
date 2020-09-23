const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../classes/classes-middleware")

const router = express.Router()

router.post("/register", async(req, res, next) =>{
    try{
        const {first_name, email, password, role_id} = req.body
        const user = await Users.findBy({email}).first();
        if(user){
            res.status(409).json({
                message: "Email Already Use"
            })
        } 
        console.log('create new user');
        const newUser = await Users.add({
            first_name, 
            email,
            password: await bcrypt.hash(password, 14),
            role_id,
        })

        res.status(201).json(newUser)
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
      const userType = await Users.findUserRoleById(user.role_id)
      const token = jwt.sign({
          id: user.id,
          userRole: userType.name, // this value would normally come from the database
      }, process.env.JWT_SECRET)
  
      // send the token back as a cookie
      res.cookie("token", token)
  
      res.json({
        message: `Welcome ${user.email}!`,
        token
        })
      } catch(err) {
          next(err)
      }
  });

  router.put("/users/:id", restrict(), async(req, res, next) => {
    try{
        const {id} = req.params  
        const user = await Users.findById(id).first()
        if(user){
            await Users.update(id, req.body)
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
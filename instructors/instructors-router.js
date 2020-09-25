const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const db = require("../database/dbConfig")
const instructorClass = require("./instructors-model")
// send Email utility
const sendEmail = require("../utils/sendEmail")
// Registration validation
const checkRegistrationFields = require("../validation/register")
// Secret Key
const key = require("../utils/keys")
// Resend email validation
const checkResendField = require("../validation/resend")
// Forgot password validation
const validateResetInput = require("../validation/checkEmail")
// Validate new passwords
const validatePasswordChange = require("../validation/newPassword")


const router = express.Router()

// Register route
router.post("/instructor/register", (req, res) => {
    // Ensures that all entries by the user are valid
    const { errors, isValid } = checkRegistrationFields(req.body);
  
    // If any of the entries made by the user are invalid, a status 400 is returned with the error
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    let token;
    crypto.randomBytes(48, (err, buf) => {
      if (err) throw err;
      token = buf
        .toString("base64")
        .replace(/\//g, "") // Because '/' and '+' aren't valid in URLs
        .replace(/\+/g, "-");
      return token;
    });
  
    bcrypt.genSalt(12, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password1, salt, (err, hash) => {
        if (err) throw err;
        db("instructors")
          .returning(["instructor_id", "email", "registered", "token"])
          .insert({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            registered: Date.now(),
            token: token,
            createdtime: Date.now(),
            emailVerified: "f",
            tokenusedbefore: "f"
          })
          .then(instructor => {
            let to = [instructor[0].email]; // Email address must be an array
  
            // When you set up your front-end you can create a working verification link here
            let link = "https://yourWebsite/v1/users/verify/" + instructor[0].token;
  
            // Subject of your email
            let sub = "Confirm Registration";
  
            // In this email we are sending HTML
            let content =
              "<body><p>Please verify your email.</p> <a href=" +
              link +
              ">Verify email</a></body>";
            // Use the Email function of our send email utility
            sendEmail.Email(to, sub, content);
  
            res.json("Success!");
          })
          .catch(err => {
            console.log(err);
            errors.account = "Email already registered";
            res.status(400).json(errors);
          });
      });
    });
  });
  
  router.post("instructor/verify/:token", (req, res) => {
    const { token } = req.params;
    const errors = {};
    db
      .returning(["email", "emailverified", "tokenusedbefore"])
      .from("instructors")
      .where({ token: token, tokenusedbefore: "f" })
      .update({ emailverified: "t", tokenusedbefore: "t" })
      .then(data => {
        if (data.length > 0) {
          // Return an email verified message
          res.json("Email verified! Please login to access your account");
        } else {
          db
            .select("email", "emailverified", "tokenusedbefore")
            .from("instructors")
            .where("token", token)
            .then(check => {
              if (check.length > 0) {
                if (check[0].emailverified) {
                  errors.alreadyVerified =
                    "Email already verified. Please login to your account.";
                  res.status(400).json(errors);
                }
              } else {
                errors.email_invalid =
                  "Email invalid. Please check if you have registered with the correct email address or re-send the verification link to your email.";
                res.status(400).json(errors);
              }
            })
            .catch(err => {
              errors.db = "Bad request";
              res.status(400).json(err);
            });
        }
      })
      .catch(err => {
        errors.db = "Bad request";
        res.status(400).json(err);
      });
  });
  
  // Resend email route
  router.post("instructor/resend_email", (req, res) => {
    const { errors, isValid } = checkResendField(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    let resendToken;
    crypto.randomBytes(48, (err, buf) => {
      if (err) throw err;
      resendToken = buf
        .toString("base64")
        .replace(/\//g, "")
        .replace(/\+/g, "-");
      return resendToken;
    });
  
    db
      .table("instructors")
      .select("*")
      .where({ email: req.body.email })
      .then(data => {
        if (data.length == 0) {
          errors.invalid = "Invalid email address. Please register again!";
          res.status(400).json(errors);
        } else {
          db
            .table("instructors")
            .returning(["email", "token"])
            .where({ email: data[0].email, emailverified: "false" })
            .update({ token: resendToken, createdtime: Date.now() })
            .then(result => {
              if (result.length) {
                let to = [result[0].email];
  
                let link =
                  "https://yourWebsite/v1/users/verify/" + result[0].token;
  
                let sub = "Confirm Registration";
  
                let content =
                  "<body><p>Please verify your email.</p> <a href=" +
                  link +
                  ">Verify email</a></body>";
                sendEmail.Email(to, sub, content);
  
                res.json("Email re-sent!");
              } else {
                errors.alreadyVerified =
                  "Email address has already been verified, please login.";
                res.status(400).json(errors);
              }
            })
            .catch(err => {
              errors.db = "Bad request";
              res.status(400).json(err);
            });
        }
      })
      .catch(err => {
        errors.db = "Bad request";
        res.status(400).json(err);
      });
  });

  // Forgot password
router.post("instructor/forgot", function(req, res) {
    const { errors, isValid } = validateResetInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let resetToken;
    crypto.randomBytes(48, (err, buf) => {
      if (err) throw err;
      resetToken = buf.toString("hex");
      return resetToken;
    });
  
    db
      .table("instructors")
      .select("*")
      .where("email", req.body.email)
      .then(emailData => {
        if (emailData.length == 0) {
          res.status(400).json("Invalid email address");
        } else {
          db
            .table("instructors")
            .where("email", emailData[0].email)
            .update({
              reset_password_token: resetToken,
              reset_password_expires: Date.now(),
              reset_password_token_used: false
            })
            .then(done => {
              let to = [req.body.email];
  
              let link = "https://yourWebsite/v1/users/verify/" + resetToken;
  
              let sub = "Reset Password";
  
              let content =
                "<body><p>Please reset your password.</p> <a href=" +
                link +
                ">Reset Password</a></body>";
              //Passing the details of the email to a function allows us to generalize the email sending function
              sendEmail.Email(to, sub, content);
  
              res
                .status(200)
                .json("Please check your email for the reset password link");
            })
            .catch(err => {
              console.log(err);
              res.status(400).json("Bad Request");
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json("Bad Request");
      });
  });
  
  // Reset password
  router.post("instructor/reset_password/:token", function(req, res) {
    const { token } = req.params;
    db
      .select(["id", "email"])
      .from("instructors")
      .where({ reset_password_token: token, reset_password_token_used: false })
      .then(data => {
        if (data.length > 0) {
          const { errors, isValid } = validatePasswordChange(req.body);
  
          if (!isValid) {
            return res.status(400).json(errors);
          }
  
          bcrypt.genSalt(12, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(req.body.password1, salt, (err, hash) => {
              if (err) throw err;
              db("instructors")
                .returning("email")
                .where({ id: data[0].id, email: data[0].email })
                .update({ password: hash, reset_password_token_used: true })
                .then(instructor => {
                  const subject = "Password change for your account.";
                  const content = `The password for your account registered under ${
                    instructor[0]
                  } has been successfully changed.`;
                  sendEmail.Email(to, subject, content);
                  res.json("Password successfully changed for " + instructor[0] + "!");
                })
                .catch(err => {
                  res.status(400).json(err);
                });
            });
          });
        } else {
          res.status(400).json("Password reset error!");
        }
      })
      .catch(err => res.status(400).json("Bad request"));
  });

  // Creates a new class
  router.post("/instructor/classes", async(req, res, next) => {
    try {
      const newClass = req.body
      await instructorClass.addClass(newClass)
      res.status(201).json(newClass)
    } catch(err) {
      next(err)
    }
  })

  // Edit a class
  router.put("/instructor/classes/:id", async(req, res, next) => {
    try {
      const classObj = await instructorClass.editClass(req.params.id, req.body)
      res.json(classObj)
    } catch(err) {
      next(err)
    }
  })
  // Delete a class
  router.delete("/instructor/classes/:id", async (req, res, next) => {
    try {
      const classObj = await instructorClass.removeClass(req.params.id, req.body)
      res.json(classObj)
    } catch(err) {
      next(err)
    }
  })


  module.exports = router;
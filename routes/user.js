const express = require('express');
const router  = express.Router();
const User = require("../model/user");
const passport = require('passport');
const { savedRedirectUrl } = require('../middleware.js');

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, Password } = req.body;
        const newUser = new User({ email, username });

        let registeredUser = await User.register(newUser, Password);
        req.login(registeredUser,(err)=>{
            if(err) {
                return next(err);
            }
            req.flash("success","User registerd");
            res.redirect("/posts");
        })
        
    } catch (e) {
        req.flash("error","Error: " + e.message);
        res.redirect("/signup");
    }
});


router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
    
});

router.post("/login",savedRedirectUrl,passport.authenticate("local",{failureRedirect : '/login',failureFlash : true}),async(req,res)=>{
  req.flash("success","Welcome to the OpenPost");
  let redirectUrl = res.locals.redirectUrl || "/posts";
  res.redirect(redirectUrl);
});


router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are now logged out");
        res.redirect("/posts");
    })
});
module.exports = router;
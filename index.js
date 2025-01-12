require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const post = require('./model/post');
const mongo_url = process.env.MONGO_URL;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user');
const session = require('express-session');
const userRouter = require('./routes/user');
const flash = require("connect-flash");
const ejsMate = require('ejs-mate');
const {isLoggedIn} = require('./middleware.js');

const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60*1000,
        maxAge : 7 *24 * 60 * 60*1000,
        httpOnly : true,

    }
};

app.use(session(sessionOptions));
app.use(flash());



app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

main().then(()=>{console.log("success!")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongo_url);
}

app.listen(port, function () {
    console.log(`listening on ${port}`);
});


//Start-authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    
    next();
    
});


app.use("/",userRouter);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/demo",async(req, res) =>{
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "student",
//     });

//    let registerdUser = await User.register(fakeUser,"helloworld");
//    res.send(registerdUser);
// });


//End-authentication

app.get("/", (req, res) => {
    res.redirect("/posts");  // Or render a specific view
});
app.get("/posts",async(req,res)=>{
    let posts = await post.find();
   
    res.render("index.ejs",{posts});
});



app.get("/posts/new",isLoggedIn,(req,res)=>{
   
    res.render("new.ejs");
    
});

app.post("/posts/new",(req,res)=>{
    let {username,content} = req.body;
   
    
    let like =0;
    let newPost = new post({username:username,content:content,like:like});
    console.log(newPost);
    newPost.save().then(()=>{
        console.log("saved");
    }).catch((err)=>{
        console.log(err);
    });
    
    res.redirect('/posts');
});

app.get("/posts/:id/increment",isLoggedIn,async(req, res) => {
    let {id} = req.params;
    
    let newPost = await post.findById(id);
    
    newPost.like += 1;
    await newPost.save();
    res.redirect('/posts');
});

app.get("/posts/:id/edit",isLoggedIn,async(req, res)=>{
    let {id} = req.params;
    let newPost = await post.findById(id);
    res.render("edit.ejs",{newPost});
});

app.patch("/posts/:id/edit",async(req, res)=>{
  let {id} = req.params;
  let newContent = req.body.content;
  let newPost = await post.findById(id);
  newPost.content = newContent;
  await newPost.save();
  res.redirect("/posts");

});
    
app.delete("/posts/:id/delete",isLoggedIn,async(req, res)=>{
    let {id} = req.params;
    
    // let newPost = await post.findById(id);
    await post.findByIdAndDelete(id);
    
    res.redirect("/posts");
});



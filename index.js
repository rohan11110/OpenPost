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




app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

main().then(()=>{console.log("success!")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongo_url);
}

app.listen(port, function () {
    console.log(`listening on ${port}`);
});




app.get("/", (req, res) => {
    res.redirect("/posts");  // Or render a specific view
});
app.get("/posts",async(req,res)=>{
    let posts = await post.find();
   
    res.render("index.ejs",{posts});
});



app.get("/posts/new",(req,res)=>{
     
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

app.get("/posts/:id/increment",async(req, res) => {
    let {id} = req.params;
    
    let newPost = await post.findById(id);
    
    newPost.like += 1;
    await newPost.save();
    res.redirect('/posts');
});

app.get("/posts/:id/edit",async(req, res)=>{
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
    
app.delete("/posts/:id/delete",async(req, res)=>{
    let {id} = req.params;
    
    // let newPost = await post.findById(id);
    await post.findByIdAndDelete(id);
    
    res.redirect("/posts");
});



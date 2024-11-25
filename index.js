const express = require('express');
const app = express();
const port = 1110;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port, function () {
    console.log(`listening on ${port}`);
});

let posts =[
    {
        id : uuidv4(),
        username : "Elon Musk",
        content : "Elon Musk is a billionaire entrepreneur, inventor, and CEO known for founding and leading several groundbreaking companies, including Tesla (electric vehicles and clean energy), SpaceX (space exploration), Neuralink (neurotechnology), and The Boring Company (underground transportation). Musk is also the owner of Twitter, which he acquired in 2022. Widely recognized for his ambitious vision of the future, Musk aims to revolutionize industries like transportation, energy, and space travel, with long-term goals like colonizing Mars and advancing artificial intelligence. His work has made him one of the most influential and controversial figures in the tech world.",
        like : 0,
       
       
    },
    {
        id : uuidv4(),
        username : "Rohan",
        content : "My Name is Rohan and currently Pursuing MCA final year from BBD University.this project is based on X and the tech stack used in it is Express, EJS.",
        like : 0,
        
        
    },

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
    
});

app.post("/posts/new",(req,res)=>{
    let {username,content} = req.body;
   
    let id = uuidv4();
    let like =0;
    let data ={username,content,id,like};
    posts.push(data);
    res.redirect('/posts');
});

app.get("/posts/:id/increment",(req, res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    post.like++;
    res.redirect('/posts');
});

app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id/edit",(req, res)=>{
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p)=> id === p.id);
  post.content = newContent;
  res.redirect("/posts");

});
    
app.delete("/posts/:id/delete",(req, res)=>{
    let {id} = req.params;
    
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

    
    
    


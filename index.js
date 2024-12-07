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
        username : "Rohan",
        content : "Hello, my name is Rohan, and I am currently pursuing a Master's in Computer Applications. I am in my final year of studies, where I am honing my skills and expanding my knowledge in the field of computer science. Alongside my academic journey, I am actively working on developing projects using the MERN stack. ",
        like : 2,
        
        
    },
    {
        id : uuidv4(),
        username : "Douglas Adams",
        content : "Technology is a word that describes something that doesn’t work yet.",
        like : 8,
        
        
    },
    {
        id : uuidv4(),
        username : "Bill Gates",
        content : "We are changing the world with technology",
        like : 7,
        
        
    },
    {
        id : uuidv4(),
        username : "Dr. APJ Abdul Kalam",
        content : "Science and technology are the tools to create a sustainable future",
        like : 3,
        
        
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

    
    
    


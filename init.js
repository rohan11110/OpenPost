const mongoose = require('mongoose');
const post = require('./model/post');


let allPost =[
    {
        
        username : "Rohan",
        content : "Hello, my name is Rohan, and I am currently pursuing a Master's in Computer Applications. I am in my final year of studies, where I am honing my skills and expanding my knowledge in the field of computer science. Alongside my academic journey, I am actively working on developing projects using the MERN stack. ",
        like : 2,
        
        
    },
    {
       
        username : "Douglas Adams",
        content : "Technology is a word that describes something that doesn’t work yet.",
        like : 8,
        
        
    },
    {
        
        username : "Bill Gates",
        content : "We are changing the world with technology",
        like : 7,
        
        
    },
    {
       
        username : "Dr. APJ Abdul Kalam",
        content : "Science and technology are the tools to create a sustainable future",
        like : 3,
        
        
    },

];


main().then(()=>{console.log("success!")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rohanvima:GpVPpvfOzIMFyN40@cluster0.2dtx2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

post.insertMany(allPost);

  
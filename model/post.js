const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username :{
        type  : 'string',
        required : true
    },
    content : {
        type : 'string',
        required : true
    },
    like : {
        type : 'number',
        required : true
    }
});

const post = mongoose.model("post",postSchema);

module.exports = post;
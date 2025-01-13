const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
});

const post = mongoose.model("post",postSchema);

module.exports = post;
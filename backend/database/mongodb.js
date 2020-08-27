const mongoose = require('mongoose');
// const url2 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
const uri = `mongodb://${process.env.HOST}/${process.env.DATABASE}`;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true});
if(!mongoose.connection) {
    console.log("error bro")
    // throw new MongooseError('Could not connect to database')
}

var TodoSchema = new mongoose.Schema(
{
    title: {
        type: String
    },
    done: {
        type: Boolean
    },
    userid: {
        type: String
    }
}, 
    {
        timestamps: true
    }
)
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model("Todo", TodoSchema)
const User = mongoose.model("User", UserSchema)

module.exports = {Todo, User}

/*
module.exports = {
   const Todo : mongoose.model("Todo", TodoSchema)
  
    Todo: mongoose.model('Todo', {
        title: String,
        done: Boolean,
        //comments: [{
        //    type: mongoose.Schema.Types.ObjectId,
        //    ref: "comment"
        //}]
    })
}
*/


/*
// Post
{
    Postid: Number,
    Postitle: String,
    Postcontent: String,
    Postcomments: array commentid

}

// Comment
{
    /*
module.exports = {
   const Todo : mongoose.model("Todo", TodoSchema)
  
    Todo: mongoose.model('Todo', {
        title: String,
        done: Boolean,
        //comments: [{
        //    type: mongoose.Schema.Types.ObjectId,
        //    ref: "comment"
        //}]
    })
}
*/
/*
    commentid: Number,
    Commentcontent: String
}

*/
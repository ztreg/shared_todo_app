const mongoose = require('mongoose');
// const url2 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
const uri = `mongodb://${process.env.HOST}/${process.env.DATABASE}`;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true});
if(!mongoose.connection) {
    console.log("error bro")
    // throw new MongooseError('Could not connect to database')
}

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
        },
        listIds: {
            type: String
        }
    }, 
        {
            timestamps: true
        }
    )

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    userIds: { // list of user _id (plural)
        type: Array,
        required: true
    }
  },
  { timestamps: true }
)

const TodoList = mongoose.model("TodoList", ListSchema)
const Todo = mongoose.model("Todo", TodoSchema)
const User = mongoose.model("User", UserSchema)

module.exports = {Todo, User, TodoList}

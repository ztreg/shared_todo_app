require('dotenv').config();
const mongoose = require('mongoose');
// const url2 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
let uri;
if(process.env.ENVIRONMENT === 'test'){
    uri = `mongodb://${process.env.HOST}/${process.env.DATBASECOPY}`; //testdb
} else if(process.env.ENVIRONMENT === 'development') {
    uri = `mongodb://${process.env.HOST}/${process.env.DATABASE}`; //standard
}

// 

console.log('connecting to ' + uri)

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

if(!mongoose.connection) {
    console.log("error connecting bro")
    throw new MongooseError('Could not connect to database')
} else {
    console.log('making a connection')
}

function disconnect() {
    // Ending connection to db
    console.log('disconnecting')
    mongoose.connection.close()
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
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        },
        userid: {
            type: String,
            required: true
        },
        listId: {
            type: String,
            required: true
        }
    }, 
        {
            timestamps: true,
        },
    )

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    userIds: { // list of user _id (plural)
        type: Array
    }
  },
  { timestamps: true }
)

const TodoList = mongoose.model("TodoList", ListSchema)
const Todo = mongoose.model("Todo", TodoSchema)
const User = mongoose.model("User", UserSchema)

module.exports = {Todo, User, TodoList, disconnect}

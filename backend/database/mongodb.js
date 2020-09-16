require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')
const mondoTest = new MongoMemoryServer();

// mongodb+srv://ztreg:<password>@cluster0.hoyzn.mongodb.net/<dbname>?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ztreg:<password>@cluster0.hoyzn.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const url2 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
let uri;
console.log(process.env.ENVIRONMENT);
async function testConnect () {
    if(process.env.ENVIRONMENT === 'test'){
        console.log('now we go test');
        
        uri = await mondoTest.getUri();
        console.log('HERROWOOOOOOOW');
        console.log('connecting to ' + uri)
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        
        await mongoose.connect(uri, options);

        // async function disconnect() {
        //     // Ending connection to db
        //     console.log('disconnecting')
        //     await mondoTest.stop()
        //     await mongoose.connection.close()
        // }
       // cluster0-shard-00-02.hoyzn.mongodb.net:27017

        //uri = `mongodb://${process.env.HOST}/${process.env.DATBASECOPY}`; //testdb
        
    } else if(process.env.ENVIRONMENT === 'development') {
         uri = `mongodb+srv://ztreg:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`;
        //uri = "mongodb+srv://ztreg:ztreg123@cluster0-shard-00-02.hoyzn.mongodb.net:27017/todo"
        // uri = await mondoTest.getUri();
        console.log('HERROWOOOOOOOW');
        console.log('connecting to ' + uri)
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        console.log('hmmmm');
        await mongoose.connect(uri, options);
        // uri = `mongodb://${process.env.HOST}/${process.env.DATABASE}`; //standard
        // mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}

// 
testConnect();


if(!mongoose.connection) {
    console.log("error connecting bro")
    throw new MongooseError('Could not connect to database')
} else {
    console.log('making a connection')
}

async function disconnect() {
    // Ending connection to db
    console.log('disconnecting')
    await mongoose.connection.close()
    await mondoTest.stop()
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
        },
        urgent: {
            type: Boolean,
            default: false
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

module.exports = {Todo, User, TodoList, disconnect, testConnect}

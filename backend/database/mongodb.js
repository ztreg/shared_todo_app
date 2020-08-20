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
}, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Todo", TodoSchema)

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

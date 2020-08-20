const mongoose = require('mongoose');
// const url2 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
const uri = `mongodb://${process.env.HOST}/${process.env.DATABASE}`;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true});
if(!mongoose.connection) {
    console.log("error bro")
    // throw new MongooseError('Could not connect to database')
}


module.exports = {
    Todo: mongoose.model('Todo', {
        title: String,
        done: Boolean,
        //comments: [{
        //    type: mongoose.Schema.Types.ObjectId,
        //    ref: "comment"
        //}]
    }),
    //Comment: mongoose.model('comment', {
    //    text: String,
    //})
}

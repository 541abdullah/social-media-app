let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let chatlineupschema= new Schema({
    username:{
        type:String
    },
    userid:{
        type:String
    },
    lineup:{
        type:Array
    },
    unread:{
        type:Object
    }

},{timestamps:true})

let Chatlineup = mongoose.model('Chatlineup',chatlineupschema);

module.exports= Chatlineup;
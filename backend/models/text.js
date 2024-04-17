let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let textschema= new Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    receiver:{
        type:String
    },
    thetext:{
        type:String
    },
    status:{
        type:Boolean
    },
    order:{
        type:Object
    },
    holders:{
        type:Array
    },
    brand:{
        type:Object
    },
    branding: {
        type:Array
    },
    effected: {
        type:Array
    },
    recbranding : {
        type:Array
    },
    receffected: {
        type:Array
    }

    
},{timestamps:true})

let Text = mongoose.model('Text',textschema);

module.exports= Text;
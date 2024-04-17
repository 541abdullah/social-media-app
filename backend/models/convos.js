let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let convoschema= new Schema({
    members:{
        type:Array,
    },
    holders:{
        type:Array,
    }

},{timestamps:true})

let Convo = mongoose.model('Convo',convoschema);



module.exports= Convo;
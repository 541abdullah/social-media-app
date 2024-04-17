let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let notificationschema= new Schema({


    from:{
        type:String,
        required:true
    },
    frompfp:{
        type:String,
        required:true
    },
    fromfname:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    attachement:{
        type:String
    },
    commentifany:{
        type:String
    },
    cleared:{
        type:Boolean,
        required:true
    },
    reference:{
        type:String
    }
},{timestamps:true})

let Notif = mongoose.model('Notif',notificationschema);



module.exports= Notif;
let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let postschema= new Schema({
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:68
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
    },
    likesnum:{
        type:Number
    },
    comments:{
        type:Array,
    },
    pfp:{
        type:String,
    }

},{timestamps:true})

let Post = mongoose.model('Post',postschema);
module.exports= Post;
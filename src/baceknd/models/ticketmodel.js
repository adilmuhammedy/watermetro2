const mongoose=require('mongoose');

const ticketschema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
 

    

});
module.exports=mongoose.model("Ticket",ticketschema);
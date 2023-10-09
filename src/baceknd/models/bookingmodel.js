const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    nopass:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true
    },    
});
module.exports=mongoose.model("Booking",bookingSchema);
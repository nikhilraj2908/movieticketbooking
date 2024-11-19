const mongoose=require("mongoose");
const ticketbookingschema=new mongoose.Schema({
    date: {type:String},
    time: {type:String},
    cinema: {type:String}, 
    seatscount: {type:Array}
})
const Ticketbooking=mongoose.model("Ticketbooking",ticketbookingschema);

module.exports={
    Ticketbooking
}

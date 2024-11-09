const mongoose=require("mongoose")
require('dotenv').config();
const url=process.env.URL
async function HandleDBconnection(){
    try{
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("db is connected");
    }
    catch(err){
        console.log(err,'err while connecting to db');
    }
}
module.exports = {
        HandleDBconnection
 };
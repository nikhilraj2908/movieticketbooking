const bcryt=require("bcrypt");
const password="Nikhil@123";
const saltRound= 10;
bcryt.hash(password,saltRound,(err,hash)=>{
    if(err){
        console.log(err);
    }else{
        console.log(hash)
    }
})
// $2b$10$6nnk0yg073O15OkxvwXHEOhOdskWUt88MihlmE2dASd77sutpI4c6

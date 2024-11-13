const express = require("express");
const cors = require("cors");
const mongoose=require("mongoose")
const bcrypt=require("bcrypt");
const multer = require('multer');
const crypto = require('crypto');//////////it is for giving filename unique 16 bytes hax or 32 bytes
const path = require('path');//////////////it is used for giving path name to files
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb'); 
const {HandleDBconnection}=require('../backend/connction/dbconnect.js')
require('dotenv').config();
const port=process.env.PORT;
HandleDBconnection();
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
/////////////models import 

const {Movie}=require("../backend/models/moviemodel/moviemodel.js")
const {User}=require("../backend/models/usermodel/usermodel.js")

const conn = mongoose.connection;
let gfsBucket;

conn.once('open', () => {
  gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  console.log("GridFSBucket initialized");
});


const storage = new GridFsStorage({
    url: "mongodb://127.0.0.1:27017/sathuratch",
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads' // Make sure this matches the bucket name
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });

  app.get('/fileById/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Convert the id from string to ObjectId
      const file = await conn.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId(id) });
      if (!file) {
        return res.status(404).send('File not found.');
      }
  
      const downloadStream = gfsBucket.openDownloadStream(file._id);
      res.set('Content-Type', file.contentType);
      res.set('Content-Disposition', `attachment; filename="${file.filename}"`); // Corrected line
      downloadStream.pipe(res);
    } catch (error) {
      console.error('Error fetching file by id:', error);
      res.status(500).send('Error fetching file.');
    }
  });
  ///////admin pannel route
  app.post("/moviedetails", upload.single('file'), async (req, res) => {
    let id;
    let exists = true;
    while (exists) {
        id = Math.round(Math.random() * 10000);
        exists = await Movie.exists({ id: id });
    }
    try {
      const { name, genre, subtitle, language  } = req.body;
  
      if (!name || !id || !genre || !subtitle || !language || !req.file) {
        return res.status(400).send("All fields are required, including the file.");
      }
      const newMovie = new Movie({
        id,
        name,
        genre,
        subtitle,
        language,
        photoId: new mongoose.Types.ObjectId(req.file.id) 
      });
      await newMovie.save();
      res.status(200).json({ message: 'Movie saved successfully', Movie: newMovie });
      console.log("movie added succefully");
    } catch (err) {
      console.error('Error creating movie:', err);
      res.status(500).send("Server error. Could not create movie.");
    }
  });

app.post('/registeruser',async(req,res)=>{
  try{
    const {uname,email,password}=req.body;
    if (!uname || !password || !email) {
      return res.status(404).json({ message: "data not coming" })
  }
    const saltRound=10;
    const hashpassword=await bcrypt.hash(password,saltRound)
    
    const newuser=new User({uname,email,password:hashpassword})
    newuser.save()
    .then(()=>{
      console.log("user registered succefully")
      res.status(200).json({message:"user created successfully"})
    })
    .catch((err) => {
      console.log("error in registeruser", err)
      res.status(500).json({ message: "user not registered " })
  })
  }
  catch(err){
    console.log(err);
  }
})



app.post('/loginuser', async(req, res) => {
    try{
      const { uname, password } = req.body;
    if (!uname || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    const data=await User.findOne({ uname: uname })
    if(!data){
        return res.status(404).json({ message: "User not found." })
    }
    const isMatch=await bcrypt.compare(password,data.password)
    if(isMatch){
      return res.status(200).json({ message: "User logged in successfully." })
    }else {
              res.status(401).json({ message: "Incorrect password." });
          }
    }
    catch(err){
      console.log(err);
    }
});


app.post('/loginadmin',async(req,res)=>{
  const{AdminName,AdminPassword}=req.body;
  const adminName="Nikhilraj";
  const adminPassword="$2b$10$6nnk0yg073O15OkxvwXHEOhOdskWUt88MihlmE2dASd77sutpI4c6"
  if(!AdminName || !AdminPassword){
    res.status(401).json({message:"all fields are reqquired"})
  }
  if(AdminName===adminName){
    const passwordMatch = await bcrypt.compare(AdminPassword,adminPassword);
    if(passwordMatch){
     return res.status(200).json({message:"passsword verified"})
    }else{
     return res.status(300).json({message:"password wrong"})
    }
  }else{
   return res.status(401).json({message:"admin not found"});
  }
})

app.get('/allmovies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies); // Use status 200 for a successful response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
});

app.get('/movie/:id',async(req,res)=>{
    id=req.params.id;
    try{
        const moviedata=await Movie.findOne({id:id});
        console.log("single movie data sended");
        return res.status(200).json(moviedata);
    }
    catch(err){
        console.log(err);
    }
})

app.delete('/deletemovie/:id',async (req,res)=>{
    id=Number(req.params.id);
    try {
        const movie=await Movie.deleteOne({id:id})
        res.status(200).json({message:"deleted succefully"});
        console.log('ID to delete:', id)    
    }
    catch(err){
        console.log(err);
    }
})

app.put('/editmovie/:id',upload.single('file'), async (req, res) => {
  try {
    const id = req.params.id;
    const { name, genre, subtitle, language } = req.body;
    const updatedFields = { name, genre, subtitle, language };
    updatedFields.id=req.params.id;
    if (req.file) {
      updatedFields.photoId = req.file.id;
    }

    const updatedMovie = await Movie.findOneAndUpdate({ id:req.params.id }, updatedFields, { new: true }); // Include new: true
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.status(200).json({ message: 'Movie updated successfully.', updatedFields });
    console.log("movie edited successfully")
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(500).json({ message: 'Failed to update movie.', error: err.message });
  }
});
app.listen(port, () => console.log("server started on 2000"))







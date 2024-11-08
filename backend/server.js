const express = require("express");
const cors = require("cors");
const multer = require('multer');
const crypto = require('crypto');//////////it is for giving filename unique 16 bytes hax or 32 bytes
const path = require('path');//////////////it is used for giving path name to files
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb'); 

const app = express();
const mongoose = require('mongoose');
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://127.0.0.1:27017/sathuratch")
    .then(() => console.log("mongo connected"))
    .catch((err) => console.log("some error", err))

const userschema = new mongoose.Schema({
    uname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
})

const User = mongoose.model('User', userschema);

const movieschema = new mongoose.Schema({
    id: { type: Number },
    //   poster: {type:String},
    name: { type: String },
    genre: { type: String },
    subtitle: { type: Boolean },
    language: { type: String },
  photoId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }  // Reference to GridFS file

})

const Movie = mongoose.model("Movie", movieschema);


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


// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.send('File uploaded successfully.');
// });

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
    // Generate a unique application ID
    while (exists) {
        id = Math.round(Math.random() * 10000);
        exists = await Movie.exists({ id: id });
    }

    try {
      const { name, genre, subtitle, language  } = req.body;
  
      if (!name || !id || !genre || !subtitle || !language || !req.file) {
        return res.status(400).send("All fields are required, including the file.");
      }
  
      // Create a new subadmin entry
      const newMovie = new Movie({
        id,
        name,
        genre,
        subtitle,
        language,
        photoId: new mongoose.Types.ObjectId(req.file.id) 
      });
  
      // Save Movie to the database
      await newMovie.save();
      res.status(200).json({ message: 'Movie saved successfully', Movie: newMovie });
      console.log("movie added succefully");
    } catch (err) {
      console.error('Error creating movie:', err);
      res.status(500).send("Server error. Could not create movie.");
    }
  });

app.post('/registeruser', (req, res) => {
    const { uname, password, email } = req.body;
    if (!uname || !password || !email) {
        return res.status(404).json({ message: "data not coming" })
    }

    const newuser = new User({ uname, password, email })

    newuser.save()
        .then(() => {
            console.log("user registered succefully")
            res.status(201).json({ message: "user registered succefully" })
        })
        .catch((err) => {
            console.log("error in registeruser", err)
            res.status(500).json({ message: "user not registered " })
        })
})

app.post('/loginuser', (req, res) => {
    const { uname, password } = req.body;
    if (!uname || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    User.findOne({ uname: uname })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Username not found." });
            }
            if (user.password === password) {
                res.status(200).json({ message: "Username and password are correct." });
            } else {
                res.status(401).json({ message: "Incorrect password." });
            }
        })
        .catch(err => {
            console.log("Error in loginuser", err);
            res.status(500).json({ message: "An error occurred while logging in." });
        });
});

// app.post('/moviedetails', async (req, res) => {
//     let id; 
//     let exists = true;
//     // Generate a unique application ID
//     while (exists) {
//         id = Math.round(Math.random() * 10000);
//         exists = await Movie.exists({ id: id });
//     }
//     const { name, genre, subtitle, language } = req.body;
//     if (!name || !id || !genre || !subtitle || !language) {
//         return res.status(400).json({ message: "all fields are required" });
//     }
//     try {
//         const newmovie = new Movie({ name, genre, language, id, subtitle })
//         newmovie.save()
//             .then(() => {
//                 console.log("movie saved succefully")
//                 res.status(201).json({ message: "movie saved  succefully" })
//             })
//             .catch((err) => {
//                 console.log("error in saving movie", err)
//                 res.status(500).json({ message: "movie not saved" })
//             })

//     }
//     catch (err) {
//         console.log(err);
//     }
// })

app.get('/allmovies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies); // Use status 200 for a successful response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
});

app.get('/movie/:id',async(req,res)=>{
    id=Number(req.params.id);
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


app.put('/editmovie/:id', upload.single('poster'), async (req, res) => {
    const { name, genre, subtitle, language } = req.body;
    const updatedFields = { name, genre, subtitle, language };
    console.log(req.file);

    if (req.file) {
        updatedFields.photoId = req.file.id;
    }
   
    try {
        console.log("Updating movie with ID:", req.params.id);
        console.log("Updated fields:", updatedFields);
        
        await Movie.findOneAndUpdate({ id: Number(req.params.id) }, updatedFields);

        res.status(200).json({ message: 'Movie updated successfully.' });
    } catch (err) {
        console.error('Error updating movie:', err);
        res.status(500).json({ message: 'Failed to update movie.', error: err.message });

    }
});


app.listen(2000, () => console.log("server started on 2000"))







const mongoose=require("mongoose");
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

module.exports = {
    Movie
}
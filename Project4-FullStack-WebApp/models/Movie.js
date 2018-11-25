const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Schema. Denne må endres
const MovieSchema = new Schema({
  //_id: Schema.ObjectId,
  _id: {
    type: Number
  },
  genres: {
    type: Array
  },
  original_title: {
    type: String
  },
  title: {
    type: String
  },
  overview: {
    type: String
  },
  release_date: {
    type: String
  },
  spoken_languages: {
    type: Array
  },
  tagline: {
    type: String
  },
  production_countries: {
    type: Array
  },
  poster_path: {
    type: String
  },
  credits: {
    type: Object
  }
});


module.exports = Movie = mongoose.model('movies', MovieSchema);

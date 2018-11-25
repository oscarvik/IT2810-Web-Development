const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Schema. Denne må endres
const GenreSchema = new Schema({
  _id: {
    type: Number
  },
  name: {
    type: String
  }
});


module.exports = Genre = mongoose.model('genres', GenreSchema);

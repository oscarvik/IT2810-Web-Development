const express = require('express');
const router = express.Router();

// Movie Model
const Movie = require('../../models/Movie');

/*
@route   GET api/movies/search
@desc    Search for movies
@access  Public
@query   ? movieTitle=String & genreName=String & sortOn=String & id=String & desc=True & page=Int & limit=Int

Example:
I want all action movies sorted on popularity in descending order
../api/movies/search?genreName=action&sortOn=popularity&desc=True
 */
router.get("/search", (req, res) => {
    // Collect variables from query
    let { movieTitle, genreName, sortOn, desc, id, page, limit } = req.query;
    // Generalize
    let searchVariable = movieTitle ? "title" : "genres.name";
    let searchTerm = typeof movieTitle !== 'undefined' ? movieTitle : genreName;
    desc = desc === "true" ? -1 : 1; // If you want descending give True, else ascending

    // Query MongoDB
    if (id){
        Movie.findOne({ _id: id})
            .then((movie) => {
                return res.status(200).json({
                    success: true,
                    movie: movie
                })
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            });
    }
    else if ((typeof searchTerm  !== 'undefined') && sortOn && page && limit){
        searchTerm = searchTerm === '""'? '': searchTerm;
        limit = parseInt(limit);
        let skip = (parseInt(page) - 1) * limit;
        Movie
            .find({ [searchVariable]: { "$regex": "^"+ searchTerm, "$options": "mi" } })
            .sort({ [sortOn]: desc })
            .skip(skip)
            .limit(limit)
            .then((movies) => {
                return res.status(200).json({
                    success: true,
                    movies: movies
                })
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            });
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Bad Request: Missing values"
        })
    }
});


module.exports = router;

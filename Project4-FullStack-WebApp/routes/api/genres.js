const express = require('express');
const router = express.Router();

// Item Model
const Genre = require('../../models/Genre');


// @route   GET api/genres/search
// @desc    Get all genres
// @access  Public
// @query   ? genreName=String & id=String
router.get('/search', (req, res) => {
    let { genreName, id } = req.query;
    if(id){
        Genre.findById(id)
            .then((genre) => {
                return res.status(200).json({
                    success: true,
                    genre: genre
                })
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            });
    }
    else if(genreName || genreName === ""){
        Genre.find({ name: { "$regex": "^"+ genreName, "$options": "mi" } })
            .sort({ name: 1 })
            .then(genres => {
                return res.status(200).json({
                    success: true,
                    genres: genres
                })
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            })
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Bad Request: Missing values"
        })
    }
});


module.exports = router;

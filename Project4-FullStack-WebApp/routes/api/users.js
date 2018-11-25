const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Movie = require("../../models/Movie");

const TOKEN_LIFETIME = "2h";
const router = express.Router();

/*
@route   GET api/users/
@desc    Get all users or by username
@access  Public
@query   ?email=String & deleteUser=True
 */
router.get("/", (req, res) => {
    const {email, deleteUser} = req.query;
    if (email && deleteUser){
        User.deleteOne({email: email})
          .then((err) => {
              return res.status(200).json({
                success: true,
                message: "User deleted"
              })
          })
          .catch(err => {
              return res.status(500).json({
                success: false,
                message: "Interal Server Error"
              })
          })
    }
    else if (email) {
        // Return user with this email
        User.findOne({email: email})
            .then(user => {
                if (!user){
                  return res.status(400).json({
                    success: false,
                    message: "Bad Request: No user with that email"
                  })
                }
                return res.json({
                    success: true,
                    user: user
                })
            })
            .catch(err => {
                res.status(500);
                return res.json({
                    success: false,
                    message: "Internal Server Error"
                })
            });
    } else {
        User.find()
            .then(users => {
                res.status(200);
                return res.json({
                    success: true,
                    users: users
                })
            })
            .catch(err => {
                res.status(500);
                return res.json({
                    success: false,
                    message: "Internal Server Error"
                })
            })
    }
});



/*
@route   POST api/users/signup
@desc    Make new User
@access  Public
@body    {email: String, password: String}
 */
router.post("/signup", (req, res) => {
    let {email, password} = req.body;

    if (!email || !password) {
        res.status(400);
        return res.json({
            success: false,
            message: "Bad Request"
        })
    }

    email = email.toLowerCase().trim();

    // Verify email does not exists
    User.find({email: email})
        .then(users => {
            if (users.length > 0) {
                res.status(409);
                return res.json({
                    success: false,
                    message: "Email already exists"
                });
            }
            // Make the new User
            const newUser = new User({
                email: email,
                favorites: []
            });

            // Hash the password and save
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    })
                }
                return res.status(201).json({
                    success: true,
                    user: user
                })
            })
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        });
});

/*
@route   POST api/users/signin
@desc    Sign in user and start session
@access  Public
 */
router.post("/signin", (req, res) => {
    let {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        return res.json({
            success: false,
            message: "Bad Request: Missing values"
        })
    }
    email = email.toLowerCase().trim();

    User.find({email: email})
        .then(users => {
            // If there are several users with this email, something wrong has happened
            if (users.length === 0) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "There are no user with that email"
                })
            }
            // There are only one user, check password
            const user = users[0];
            if (!user.validPassword(password)) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "Wrong password"
                })
            }
            // Now we have the correct email and password
            // Make the JWT and return the userobject with the token
            jwt.sign({user: user}, user.password, {expiresIn: TOKEN_LIFETIME}, (err, token) => {
                if (err) {
                    res.status(500);
                    return res.json({
                        success: false,
                        message: "Internal Server Error"
                    })
                }
                res.status(200);
                return res.json({
                    success: true,
                    user: user["_doc"],
                    token: token
                })
            })
        })
        .catch(err => {
            res.status(500);
            return res.json({
                success: false,
                message: "Internal Server Error"
            })
        });
});


/*
@route   GET api/users/:userId/favorites
@desc    Get all favorites movies of user with id (could easily change this with username)
@access  Public
@query   ? page=Int & limit=Int
 */
router.get("/:userId/favorites", (req, res) => {
    const {userId} = req.params;
    let {page, limit} = req.query;

    // Variables for paging
    let start = (parseInt(page) - 1) * parseInt(limit);
    let end = start + parseInt(limit);

    if (!userId || !page || !limit) {
        res.status(400);
        return res.json({
            success: false,
            message: "Bad Request: Missing values"
        })
    }
    User.findById(userId)
        .then(user => {
            // Slice for so we can do paging
            let movieIds = user["favorites"].slice(start, end);

            // Promise all so that we wait for it to finish the mapping
            return Promise.all(movieIds.map(movieId => {
                return Movie.findById(movieId)
                    .then(movie => movie)
                    .catch(err => {
                        return res.status(500).json({
                            success: false,
                            message: "Internal Server Error"
                        })
                    })
            }))
            // All movies are mapped, can now return the movies
                .then((movies) => {
                    return res.status(200).json({
                        success: true,
                        movies: movies
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        });
});

/*
@route   POST api/users/:userId/favorites
@desc    Add/delete movieId to/from favorites if it does/does not exist already
@access  Public
@body    {movieId: Number, isDelete: boolean
 */
router.post("/:userId/favorites", (req, res) => {
    const {userId} = req.params;
    const {movieId, isDelete} = req.body;
    if (!userId || !movieId || typeof isDelete !== "boolean") {
        res.status(400);
        return res.json({
            success: false,
            message: "Bad Request: Missing values"
        })
    }
    User.findById(userId)
        .then(user => {
            // movieId is not in favorites and it is an add request
            if (!user.favorites.includes(movieId) && !isDelete) {
                user.favorites = [...user.favorites, movieId];
            }
            // movieId is in favorites and it is an delete request
            else if (user.favorites.includes(movieId) && isDelete) {
                user.favorites = user.favorites.filter(id => id !== movieId);
            }
            user.save()
                .then(() => {
                    res.status(200);
                    return res.json({
                        success: true,
                        user: user
                    })
                })
                .catch(err => {
                    res.status(500);
                    return res.json({
                        success: false,
                        message: "Internal Server Error"
                    })
                });
        })
        .catch(err => {
            res.status(500);
            return res.json({
                success: false,
                message: "Internal Server Error"
            })
        });
});

module.exports = router;
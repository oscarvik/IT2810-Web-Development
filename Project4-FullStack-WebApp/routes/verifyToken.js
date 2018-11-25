// FORMAT OF TOKEN
// Athorization: Bearer <access_token>
module.exports.verifyToken = function (req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined"){
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array and set the token
        req.token = bearer[1];
        // Next middleware
        next();
    }
    else{
        // Forbidden
        res.sendStatus(403);
    }
};

/*

EXAMPLE OF HOW TO PROTECT ROUTES

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: "Post created",
                authData: authData
            });
        }
    });
});

 */

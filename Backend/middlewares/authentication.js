const jwt = require('jsonwebtoken');

const authentication = (req, res, next)=> {
    if(!req.headers.authorization){
        return res.send('Please login again');
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "hello", (err, decoded)=>{
         if(err){
            res.send("Please Login")
         }else{
            req.body.userId = decoded.userId;
            next();
         }
    })
}

module.exports = authentication
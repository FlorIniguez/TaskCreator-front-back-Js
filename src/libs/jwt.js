const jwt = require('jsonwebtoken');
require('dotenv').config();

    //creo token

    const createAccesToken = (payload) => {
        return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            process.env.TOKEN_SECRET,
             {expiresIn:"1d"},
        (err,token)=> {
          if (err) reject(err);
          resolve(token)
         
        })
    })
}
    module.exports = {createAccesToken}
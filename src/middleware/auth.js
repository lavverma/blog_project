const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const jwt = require("jsonwebtoken");

let authentication=async function(req,res,next){
    try{
        let token=req.headers["x-auth-token"];
    if(!token)token=req.headers["x-auth-token"]
    if(!token)
       return res.status(401).send({status:false,msg:"not authorized"});
    
        
    
    let decodeToken=jwt.verify(token,"Project-1 Blog-Site")
    if(!decodeToken){
        res.status(404).send({status:false,msg:"Not Found"});
    }
    next();
    }catch(error){
        res.status(500).send({status:false,msg:error.message});
    }
}   

module.exports.authentication=authentication;

/////////////////////////////////////////////////////////////////////////////////////////////
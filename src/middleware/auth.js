const {isValidId} = require("../validation/validation")
const blogModel = require("../models/blogModel");
const jwt = require("jsonwebtoken");

let authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token){
      return res
      .status(401)
      .send({ status: false, message: "token must be present" });
    }
   

      jwt.verify(token, process.env.JWT_SECRET_KEY,function (error, decoded){
        if (error) {
          return res
            .status(401)
            .send({ status: false, message: error.message });
        } else {
          // creating an attribute in "req" to access the token outside the middleware
          req.token = decoded;
          next();
        }
      })
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////

const authorization = async function (req, res, next) {
  try {
    let blogId = req.params.blogId;
    let userLoggedIn = req.token.userId;

    if(!isValidId(blogId)){
      return res
          .status(400)
          .send({status: false, message:"Enter valid format of blogId"})
  }
  
  const blog = await blogModel.findOne({_id: blogId , isDeleted : false})
  if(!blog){
      return res
          .status(404)
          .send({status: false, message:"No such blog found"})
  }

const authorId = blog.authorId
  if(userLoggedIn != authorId){
    return res
        .status(403)
        .send({status: false, message:"You are not authorized to perform this task"})
}
    next();
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = {authentication, authorization};

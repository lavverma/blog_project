const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const jwt = require("jsonwebtoken");

let authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) token = req.headers["x-Api-Key"];
    if (!token)
      return res.status(401).send({ status: false, msg: "Unauthenticate" });

    let decodeToken = jwt.verify(token, "Project-1 Blog-Site");
    if (!decodeToken) {
      res.status(404).send({ status: false, msg: "Not Found" });
    }
    next();
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.authentication = authentication;

/////////////////////////////////////////////////////////////////////////////////////////////

const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) token = req.headers["x-Api-Key"];
    let decodedToken = jwt.verify(token, "Project-1 Blog-Site");

    let userToBeModified = req.params.blogId;
    let userVerify = await blogModel.findOne({ _id: userToBeModified });
console.log(userVerify)
if(userVerify==null){
  res.status(404).send({status:false,msg:"blogId not present"})
}
    let autherverify = userVerify.authorId;

    let userLoggedIn = decodedToken.userId;

    if (autherverify != userLoggedIn)
      return res.status(401).send({ status: false, msg: "Unaturorized" });

    next();
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.authorization = authorization;

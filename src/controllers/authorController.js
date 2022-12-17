const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");
const {  isValidRequest,
  isValidString,
  isValidName,
  isValidMail,
  isValidPassword,
  isValidTitle,
  } = require("../validation/validation")

const createAuthor = async function (req, res) {
  try {
    const data = req.body
    if (!isValidRequest(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid Input" });
    }
    let {fname,lname, title, email, password} = req.body;

    if (!fname) {
      return res
        .status(400)
        .send({ status: false, message: "First Name is required" });
    }

    if (!isValidString(fname) || !isValidName(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter first name in proper format" });
    }

    if (!lname) {
      return res
        .status(400)
        .send({ status: false, message: "Last Name is required" });
    }
    if (!isValidString(lname) || !isValidName(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter Last name in proper format" });
    }

    if(!title){
      return res
        .status(400)
        .send({ status: false, message: "Title is required" });
    }
    if(!isValidString(title) || !isValidTitle(title)){
      return res
        .status(400)
        .send({ status: false, message: "Title is only Mr / Mrs / Miss " })
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "Email is required" });
    }
    email = email.trim();
    if (!isValidString(email) || !isValidMail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter email in proper format" });
    }

    const isDuplicateEmail = await authorModel.findOne({ email });
    if (isDuplicateEmail) {
      return res
        .status(409)
        .send({ status: false, message: `${email} emailId already in use` });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }
    if (!isValidString(password) || !isValidPassword(password)) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Password should contain min 8 and max 15 character with a number and a special character",
        });
    }

    let authorCreated = await authorModel.create(data);

    res.status(201).send({status: true, data: authorCreated });
  } catch (err) {
    res.status(500).send({status: false, msg: err.message });
  }
};


///////////////////////////////////////////////////////////////////////////

const login = async function (req, res) {
  try {
    if (!isValidRequest(req.body)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide login details" });
    }
    let { email, password } = req.body;

    // validating the email
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }
    if (!isValidMail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Entered mail ID is not valid" });
    }

    // validating the password
    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }
    if (!isValidPassword(password))
      return res
        .status(400)
        .send({ status: false, message: "Entered Password is not valid" });

    let user = await authorModel.findOne({
      email: email,
    });

    if (!user)
      return res.status(404).send({
        status: false,
        message: "User Not Found",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        project: "Blog-Site",
      },
      process.env.JWT_SECRET_KEY
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: {token:token} });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


module.exports = {createAuthor, login}
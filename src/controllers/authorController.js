const AuthorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    let author = req.body;
    let authorCreated = await AuthorModel.create(author);

    res.status(201).send({ data: authorCreated });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports.createAuthor = createAuthor;


///////////////////////////////////////////////////////////////////

const login = async function (req, res) {
  try {
    let userName = req.body.email;
    let password = req.body.password;

    if (!userName)
      return res.status(400).send({
        status: false,
        msg: "Email is mandatory",
      });
    if (!password)
      return res.status(400).send({
        status: false,
        msg: "password is mandatory",
      });

    let validUser = await AuthorModel.findOne({ email: userName });
    if (!validUser) {
      return res.status(400).send({ status: false, msg: "Invalid Email" });
    }
    let validPass = await AuthorModel.findOne({ password: password });
    if (!validPass) {
      return res.status(400).send({ status: false, msg: "Invalid Password" });
    }

    let user = await AuthorModel.findOne({
      email: userName,
      password: password,
    });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        project: "Blog-Site",
      },
      "Project-1 Blog-Site"
    );
    res.setHeader("x-api-key", token);
    res.status(201).send({ status: true, data: {token:token} });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.login = login;

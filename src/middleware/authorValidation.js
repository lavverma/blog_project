const authorModel = require("../models/authorModel")


const authorValidation = async function (req, res, next) {
    try{
    let data = req.body
    if (data.fname) {
        if (typeof (data.fname) === "string") {
            if (data.lname) {
                if (typeof (data.lname) === "string") {
                    if (data.title) {
                        if (typeof (data.title) === "string") {
                            if (data.title == "Mr" || data.title == "Mrs" || data.title == "Miss") {
                                if (data.email) {
                                    if (typeof (data.email) === "string") {
                                        function validateEmail(email) {
                                            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                            return re.test(email)
                                        }
                                        if (validateEmail(data.email) == true) {
                                            if (data.password) {
                                                if (typeof (data.password) === "string") {
                                                    next()
                                                } else {
                                                    res.status(400).send({ error: "please give password in string" })
                                                }
                                            } else {
                                                res.status(400).send({ error: "passsword is mandatory" })
                                            }
                                        } else {
                                            res.status(400).send({ error: "please give valide  email" })
                                        }
                                    } else {
                                        res.status(400).send({ error: "please give email in string" })
                                    }
                                } else {
                                    res.status(400).send({ error: "email is mandatory" })
                                }
                            } else {
                                res.status(400).send({ error: "please give correct enumerator" })
                            }
                        } else {
                            res.status(400).send({ error: "please give title in string" })
                        }
                    } else {
                        res.status(400).send({ error: "title is mandatory" })
                    }
                } else {
                    res.status(400).send({ error: "please give lname in string" })
                }
            } else {
                res.status(400).send({ error: "lname is mandatory" })
            }
        } else {
            res.status(400).send({ error: "please give fname in string" })
        }
    } else {
        res.status(400).send({ error: "fname is mandatory" })
    }
}
catch(err){
    res.status(500).send({error: err.message})
}
}
module.exports.authorValidation = authorValidation
const authorModel = require("../models/authorModel")
var validator = require('validator')


const authorValidation = async function (req, res, next) {
    try {
        let data = req.body
        if (data.fname) {
            if (typeof (data.fname) === "string") {
                let fname = data.fname
                if (validator.isAlpha(fname) == true) {
                    if (data.lname) {
                        if (typeof (data.lname) === "string") {
                            let lname = data.lname
                            if (validator.isAlpha(lname) == true) {
                                if (data.title) {
                                    if (typeof (data.title) === "string") {
                                        if (data.title == "Mr" || data.title == "Mrs" || data.title == "Miss") {
                                            if (data.email) {
                                                if (typeof (data.email) === "string") {
                                                    let email = data.email
                                                    if (validator.isEmail(email) == true) {
                                                        let emailPresent=await authorModel.find({email:email})
                                                        if(emailPresent.length==0){
                                                        if (data.password) {
                                                            if (typeof (data.password) === "string") {
                                                                next()
                                                            } else {
                                                                res.status(400).send({
                                                                    status: false,
                                                                    msg: "please give password in string"
                                                                })
                                                            }
                                                        } else {
                                                            res.status(400).send({
                                                                status: false,
                                                                msg: "passsword is mandatory"
                                                            })
                                                        }
                                                    } else {
                                                        res.status(400).send({
                                                            status: false,
                                                            msg: "email already used"
                                                        })
                                                    }
                                                    } else {
                                                        res.status(400).send({
                                                            status: false,
                                                            msg: "please give valid  email"
                                                        })
                                                    }
                                                } else {
                                                    res.status(400).send({
                                                        status: false,
                                                        msg: "please give email in string"
                                                    })
                                                }
                                            } else {
                                                res.status(400).send({
                                                    status: false,
                                                    msg: "email is mandatory"
                                                })
                                            }
                                        } else {
                                            res.status(400).send({
                                                status: false,
                                                msg: "please give correct enumerator"
                                            })
                                        }
                                    } else {
                                        res.status(400).send({
                                            status: false,
                                            msg: "please give title in string"
                                        })
                                    }
                                } else {
                                    res.status(400).send({
                                        status: false,
                                        msg: "title is mandatory"
                                    })
                                }
                            } else {
                                res.status(400).send({
                                    status: false,
                                    msg: "please give valid lname"
                                })
                            }
                        } else {
                            res.status(400).send({
                                status: false,
                                msg: "please give lname in string"
                            })
                        }
                    } else {
                        res.status(400).send({
                            status: false,
                            msg: "lname is mandatory"
                        })
                    }
                } else {
                    res.status(400).send({
                        status: false,
                        msg: "please give valid fname"
                    })
                }
            } else {
                res.status(400).send({
                    status: false,
                    msg: "please give fname in string"
                })
            }
        } else {
            res.status(400).send({
                status: false,
                msg: "fname is mandatory"
            })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
module.exports.authorValidation = authorValidation
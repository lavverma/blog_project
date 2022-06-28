const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
// var validator = require('validator')

let bolgSchemaValidation = async function (req, res, next) {
    try {
        let data = req.body
        if (data.title) {
            if (typeof (data.title) === "string") {
                if (data.body) {
                    if (typeof (data.body) === "string") {
                        if (data.authorId) {
                            let check = await authorModel.findById(data.authorId)
                            if (check != null) {
                                if (typeof (data.tags) === "string" || !(data.tags)) {
                                    if (data.category) {
                                        if (typeof (data.category) === "string") {
                                            if (typeof (data.subcategory) === "string" || !(data.subcategory)) {
                                                if ((/^(true|false|True|False|TRUE|FALSE)$/).test(data.isPublished) && typeof (data.isPublished) != "string"
                                                ) {
                                                    next()
                                                } else {
                                                    res.status(400).send({
                                                        status: false,
                                                        msg: "please give publisher true or false"
                                                    })
                                                }
                                            } else {
                                                res.status(400).send({
                                                    status: false,
                                                    msg: "please give subcategory in string"
                                                })
                                            }
                                        } else {
                                            res.status(400).send({
                                                status: false,
                                                msg: "please give category in string"
                                            })
                                        }
                                    } else {
                                        res.status(400).send({
                                            status: false,
                                            msg: "category is mandatory"
                                        })
                                    }
                                } else {
                                    res.status(400).send({
                                        status: false,
                                        msg: "please give tags in string"
                                    })
                                }
                            } else {
                                res.status(400).send({
                                    status: false,
                                    msg: "author not valid"
                                })
                            }
                        } else {
                            res.status(400).send({
                                status: false,
                                msg: "authorId is mandatory"
                            })
                        }
                    } else {
                        res.status(400).send({
                            status: false,
                            msg: "please give body in string"
                        })
                    }
                } else {
                    res.status(400).send({
                        status: false,
                        msg: "body is mandatory"
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
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

module.exports.bolgSchemaValidation = bolgSchemaValidation

//////////////////////////////////////////////////////////////////////

let blogIdValidate = async function (req, res, next) {
    try {
        let blogId = req.params.blogId
        let check = await blogModel.findById(blogId)
        if (!check) {
            return res.status(404).send({ status: false, msg: "blog not present" })
        }

        next()
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
module.exports.blogIdValidate = blogIdValidate


//////////////////////////////////////////////////////////////////////////////////

const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

let bolgSchemaValidation=async function(req,res,next){
    let data=req.body
    if(data.title){
        if(typeof (data.title)=== "string"){
            if(data.body){
                if(typeof (data.body)==="string"){
                    if(data.authorId){
                        let check=await authorModel.findById(data.authorId)
                        if(check!=null){
                            // res.status(400).send()
                        // }else{
                        // if(typeof (data.authorId)==="objectid"){
                            if(typeof(data.tags)==="string"){
                                if(data.category){
                                    if(typeof (data.category)==="string"){
                                        if(typeof(data.subcategory)==="string"){
                                            next()
                                        }else{
                                            res.status(400).send({error:"please give subcategory in string" })
                                        }
                                    }else{
                                        res.status(400).send({error:"please give category in string"})
                                    }
                                }else{
                                    res.status(400).send({error:"category is mandatory"})
                                }
                            }else{
                                res.status(400).send({error: "please give tags in string" })
                            }
                        // }else{
                        //     res.status(404).send({error: "please give authorId in objectid" })
                        }else{
                            res.status(400).send({error:"author not valid"})
                        }
                    }else{
                        res.status(400).send({error: "authorId is mandatory"})
                    }
                }else{
                    res.status(400).send({error:"please give body in string"})
                }
            }else{
                res.status(400).send({error: "body is mandatory"})
            }
        }else{
            res.status(400).send({error:"please give title in string"})
        }
    }else{
        res.status(400).send({error:"title is mandatory"})
    }
}
module.exports.bolgSchemaValidation=bolgSchemaValidation
//////////////////////////////////////////////////////////////////////

let blogIdValidate=async function(req,res,next){
    try{
let blogId=req.params.blogId
let check=await blogModel.findById(blogId)
    if(!check){
        return res.status(404).send({status:false, msg: ""})
    }
    
    next()
}
catch(err){
  res.status(500).send({error: err.message})
}
}
 module.exports.blogIdValidate=blogIdValidate


//////////////////////////////////////////////////////////////////////////////////

// let checkValidate=async function(req,res,next){
//     try{
// let blogId=req.query._id
// let check=await blogModel.findById(blogId)
//     if(!check){
//         res.status(404).send({status:false, msg: ""})
//     }
//     next()
// }
// catch(err){
//     res.status(500).send({error: err.message})
// }
// }
// module.exports.checkValidate=checkValidate
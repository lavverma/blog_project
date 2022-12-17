const blogModel = require("../models/blogModel");
const {  isValidRequest,
  isValidString,
  isValidId,
  isValidPublish
  } = require("../validation/validation")

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    const userId = req.token.userId
    if (!isValidRequest(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid Input" });
    }

    let {title,body, authorId, tags, category, subcategory, isPublished , isDeleted} = data

    if(!title){
      return res
        .status(400)
        .send({ status: false, message: "please provide title" });
    }

    if(!isValidString(title)){
      return res
        .status(400)
        .send({ status: false, message: "Enter valid Title" });
    }
   
    if(!body){
      return res
        .status(400)
        .send({ status: false, message: "please provide body" });
    }

    if(!isValidString(body)){
      return res
        .status(400)
        .send({ status: false, message: "Enter valid body" });
    }
  
    if(!authorId){
      return res
        .status(400)
        .send({ status: false, message: "please provide authorId" });
    }

    if(!isValidId(authorId)){
      return res
        .status(400)
        .send({ status: false, message: "Enter valid authorID" });
    }

   
    if(authorId != userId){
      return res
      .status(409)
      .send({ status: false, message: `give your authorId ` });
    }

    if(!category){
      return res
        .status(400)
        .send({ status: false, message: "please provide category" });
    }

    if(!isValidString(category)){
      return res
        .status(400)
        .send({ status: false, message: "Enter valid category" });
    }

    if(tags){
       if(!isValidString(tags)){
        return res
        .status(400)
        .send({ status: false, message: "Enter valid tags" });
       }
    }

    if(subcategory){
      if(!isValidString(subcategory)){
        return res
        .status(400)
        .send({ status: false, message: "Enter valid subcategory" });
       }
    }

   if(isPublished){
    if(!isValidPublish(isPublished)){
      return res
        .status(400)
        .send({ status: false, message: "Published only true / false" });
    }
   }

    if(isDeleted){
      if(!isValidPublish(isDeleted)){
        return res
          .status(400)
          .send({ status: false, message: "Deleted only true / false" });
      }
    }
  

    let saveData = await blogModel.create(data);
    res.status(201).send({
      status: true,
      data: saveData
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


//////////////////////////////////////////////////////////////////////////////////

const blogs = async function (req, res) {
  try {
    let query  = req.query;
    if(!query){
      const getAllBlogs = await blogModel.find({
        $and: [
          {
            isPublished: true,
            isDeleted: false,
          }
        ]
      });
      if(getAllBlogs.length == 0){
        return res.status(404).send({ status: false, msg: "Not Found" });
      }
      return res.status(200).send({ status: true, data: getAllBlogs });
    }else{

      let getData = await blogModel.find({
        $and: [
          {
            isPublished: true,
            isDeleted: false,
          },
          query,
        ]
      });
      if (getData.length == 0) {
        res.status(404).send({ status: false, msg: "Not Found" });
      } 
      return res.status(200).send({ status: true, data: getData  });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    let {title, body , tags, category, subcategory} = req.body

      if(title){
        if(!isValidString(title)){
          return res
            .status(400)
            .send({ status: false, message: "Enter valid Title" });
        }
      }

     if(body){
      if(!isValidString(body)){
        return res
          .status(400)
          .send({ status: false, message: "Enter valid body" });
      }
    }
      
      if(tags){
        if(!isValidString(tags)){
         return res
         .status(400)
         .send({ status: false, message: "Enter valid tags" });
        }
     }

      if(category){
        if(!isValidString(tags)){
         return res
         .status(400)
         .send({ status: false, message: "Enter valid category" });
        }
     }

      if(subcategory){
        if(!isValidString(subcategory)){
         return res
         .status(400)
         .send({ status: false, message: "Enter valid subcategory" });
        }
     }
      const updateBlog = await blogModel.findOneAndUpdate(
        { _id: blogId, isDeleted: false },
        
           {$push:{ tags: tags,subcategory:subcategory},
            title: title,
            body: body,
            isPublished: true,
            publishedAt: new Date()
          },
        
        { new: true }
      );
      return res.status(200).send({ status: true, data: updateBlog }) 
}catch (err) {
  return res.status(500).send({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////////

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
      let deletedData = await blogModel.findByIdAndUpdate(
        blogId,
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );
      res.status(200).send({ status: true, data: deletedData });
    
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////

const deleteQuery = async function (req, res) {
  try {
    let blogId = req.query;
    if(Object.keys(blogId)!=0){
    let deleteData = await blogModel.updateMany(blogId, { isDeleted: true, deletedAt: new Date() }, { new: true });
    let final = await blogModel.find(blogId)
    if (final.length != 0) {
      res.status(200).send({ status: true, data: final });
    } else {
      res.status(400).send({ status: false, msg: "no such blog is found" })
    }
  }else{
    res.status(400).send({status:false, msg: "please give any query"})
  }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

    module.exports = {createBlog , blogs, updateBlog,deleteBlog , deleteQuery};
const blogModel = require("../models/blogModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let saveData = await blogModel.create(data);
    res.status(201).send({ msg: saveData });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports.createBlog = createBlog;

//////////////////////////////////////////////////////////////////////////////////

const getBlog = async function (req, res) {
  try {
    let getData = await blogModel.find();
    res.status(200).send({ data: getData });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports.getBlog = getBlog;

//////////////////////////////////////////////////////////////////////////////////

const blogs = async function (req, res) {
  try {
    let a = req.query;
    if (Object.keys(a) != 0) {
      let getData = await blogModel.find({
        $and: [
          {
            isPublished: true,
            isDeleted: false,
          },
          a,
        ],
      });
      // console.log(getData)
      if (getData.length == 0) {
        res.status(404).send({ status: false, msg: "Not Found" });
      } else {
        res.status(200).send({ status: true, data: getData });
      }
    } else {
      res.status(400).send({ status: false, msg: "Please give Input!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports.blogs = blogs;

//////////////////////////////////////////////////////////////////////////////////

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let findBlog = await blogModel.findById(blogId);

    let updatedTitle = req.body.title;

    let updatedBody = req.body.body;

    let addedTags = req.body.tags;

    let tagArr = findBlog.tags;
    if (addedTags) {
      tagArr.push(addedTags);
    } else {
      tagArr.push();
    }

    let addedCategory = req.body.category;
    let categoryArr = findBlog.category;
    if (addedCategory) {
      categoryArr.push(addedCategory);
    } else {
      categoryArr.push();
    }

    let addedSubCategory = req.body.subcategory;
    let subCategoryArr = findBlog.subcategory;
    if (addedSubCategory) {
      subCategoryArr.push(addedSubCategory);
    } else {
      subCategoryArr.push();
    }

    let updatedData = await blogModel.findByIdAndUpdate(
      blogId,
      {
        title: updatedTitle,
        body: updatedBody,
        tags: tagArr,
        category: categoryArr,
        subcategory: subCategoryArr,
      },
      { new: true }
    );
    return res.status(200).send({ status: true, data: updatedData });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
module.exports.updateBlog = updateBlog;

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
module.exports.deleteBlog = deleteBlog;

//////////////////////////////////////////////////////////////////////////////////

const deleteQuery = async function (req, res) {
  try {
    let blogId = req.query;
    let deleteData = await blogModel.updateMany(blogId,{ isDeleted: true, deletedAt: new Date() }, { new: true });
    let final =await blogModel.find(blogId)
    if(final.length!=0){
    res.status(200).send({ status: true, data: final });
    }else{
      res.status(400).send({status:false, msg:"no such blog is found"})
    }

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports.deleteQuery = deleteQuery;

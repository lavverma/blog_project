const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const blogValidation=require("../middleware/blogValidation")
const authorValidation=require("../middleware/authorValidation")



router.post("/authors", authorValidation.authorValidation,authorController.createAuthor)

router.post("/blogs",blogValidation.bolgSchemaValidation,blogController.createBlog)

router.get("/getBlog",blogController.getBlog)

router.get("/blogs",blogValidation.checkValidate,blogController.blogs)

router.put("/blogs/:blogId",blogValidation.blogIdValidate, blogController.updateBlog)

router.delete("/blogs/:blogId",blogValidation.blogIdValidate,blogController.deleteBlog)

router.delete("/blogs", blogValidation.checkValidate,blogController.deleteQuery)



module.exports = router;
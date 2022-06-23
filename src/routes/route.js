const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const blogValidation=require("../middleware/blogValidation")
const authorValidation=require("../middleware/authorValidation")
const authVerify=require("../middleware/auth")



router.post("/authors", authorValidation.authorValidation,authorController.createAuthor)

router.post("/blogs",authVerify.authentication,blogValidation.bolgSchemaValidation,blogController.createBlog)

// router.get("/getBlog",blogController.getBlog)
router.post("/login",authorController.login)

router.get("/blogs",authVerify.authentication,authVerify.authentication,blogController.blogs)

router.put("/blogs/:blogId",authVerify.authentication,blogValidation.blogIdValidate, blogController.updateBlog)

router.delete("/blogs/:blogId",authVerify.authentication,blogValidation.blogIdValidate,blogController.deleteBlog)

router.delete("/blogs",authVerify.authentication, blogValidation.checkValidate,blogController.deleteQuery)


module.exports = router;
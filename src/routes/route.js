const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const blogValidation=require("../middleware/blogValidation")
const authorValidation=require("../middleware/authorValidation")
const authVerify=require("../middleware/auth")



router.post("/authors", authorValidation.authorValidation,authorController.createAuthor)

router.post("/blogs",authVerify.authentication,blogValidation.bolgSchemaValidation,blogController.createBlog)


router.get("/getBlog",blogController.getBlog)
router.get("/blogs",authVerify.authentication,blogController.blogs)

router.put("/blogs/:blogId",authVerify.authentication,authVerify.authorization,blogValidation.blogIdValidate, blogController.updateBlog)

router.delete("/blogs/:blogId",authVerify.authentication,authVerify.authorization,blogValidation.blogIdValidate,blogController.deleteBlog)

router.delete("/blogs",authVerify.authentication,blogController.deleteQuery)

router.post("/login",authorController.login)

module.exports = router;
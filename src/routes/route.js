const express = require('express');
const router = express.Router();

const {createAuthor, login}= require("../controllers/authorController")
const {createBlog , blogs, updateBlog,deleteBlog ,  deleteQuery}= require("../controllers/blogController")
const {authentication, authorization}=require("../middleware/auth")



router.post("/authors",createAuthor)
router.post("/login",login)


router.post("/blogs",authentication,createBlog)
router.get("/blogs",authentication,blogs)

router.put("/blogs/:blogId",authentication,authorization, updateBlog)

router.delete("/blogs/:blogId",authentication,authorization,deleteBlog)

router.delete("/blogs",authentication,authorization,deleteQuery)


module.exports = router;
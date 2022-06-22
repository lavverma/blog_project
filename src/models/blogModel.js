const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, require: true },
    authorId: { type: ObjectId, required: true, ref: "author" },
    tags: [{ type: String }],
    category: [{ type: String, required: true }],
    subcategory: [ String ],
    isDeleted: { type: Boolean, default: false},
    isPublished: { type: Boolean, default: false},
    deletedAt:{type:String,default:""},
    publishedAt:{type:String,default:Date}
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);

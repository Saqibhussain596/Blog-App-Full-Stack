const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating schema of DB (schema means structure)
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// creating model of our DB (the acutal interface)
const Blog = mongoose.model("Blog", blogSchema); // here the name 'Blog' inside .model() is important because mongoose will make it plural (i.e 'Blogs') and search for a collection with same name on our Mongo Atlas (we name our collection 'blogs' in Monog Atlas).
module.exports = Blog;

const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const blogController = require("../controllers/blogControllers");

router.get("/", blogController.blog_index);
// Post request
router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

// // redirects
// router.get("/about-me", (req, res) => {
//   res.redirect("/about");
// });

module.exports = router;

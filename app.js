require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); // morgan is a third party middleware to log the details of request
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();
// connect to Mongo DB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000)) // we listened for req here because we dont want to handle any req until we connnect to the DB.
  .catch((err) => console.log(err));

// // mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const newBlog = new Blog({
//     title: "Saqib's Second Mongo DB",
//     snippet: "This is the snippet",
//     body: "Saqib will be the best full stack developer in the whole universe",
//   });
//   newBlog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("63d68f54897c0764847da380")
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });
// register view engine

app.set("view engine", "ejs");

// app.set("views", "your_folderName"); // default folder for ejs is views so if we want to set the another folder for ejs files we can do

// listen for requests
// app.listen(3000);

// Middleware (any code that runs on server between request and response)
app.use(express.static("public")); // static is an inbuilt middleware in express to give the user direct access to given folders (e.g 'public' folder here)
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log("New request made:");
//   console.log("host : ", req.hostname);
//   console.log("path : ", req.path);
//   console.log("methods : ", req.method);
//   next(); // this method tells the app that it can execute next code after this
// });

// routes
app.get("/", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.redirect("/blogs");
  // // using ejs
  // const blogs = [
  //   {
  //     title: "Bowser Kidnaps Princess",
  //     snippet: "Bowser the evil turtle kidnapped our lovely princess",
  //   },
  //   {
  //     title: "Mario saves Princess",
  //     snippet:
  //       "Mario is a brave hero who saved princess from Bowser the evil turtle",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes); // We wrote "/blogs" so that we dont have to write /blogs before every get/post/delete req in the blogRoutes file i.e to make the code reusable

// 404 page
// the use method fires for any kind of req
app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "Error" });
});

// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// NEED TO HAVE THIS TO ACCESS STATIC RESOURCE FOLDERS
app.use("/lab1/js", express.static("./COMP4537/labs/1/js"));
app.use("/lab1/css", express.static("./COMP4537/labs/1/css"));
app.use("/lab1/images", express.static("./COMP4537/labs/1/images"));

// HOMEPAGE (redirects to index)
app.get("/", function (req, res) {
    //console.log(process.env);
    res.redirect("/COMP4537/labs/1/index");
});

// index
app.get("/COMP4537/labs/1/index", function (req, res) {
    let doc = fs.readFileSync("./COMP4537/labs/1/index.html", "utf8");
    res.send(doc);
});

app.get("/COMP4537/labs/1/reader", function (req, res) {
    let doc = fs.readFileSync("./COMP4537/labs/1/reader.html", "utf8");
    res.send(doc);
});

app.get("/COMP4537/labs/1/writer", function (req, res) {
    let doc = fs.readFileSync("./COMP4537/labs/1/writer.html", "utf8");
    res.send(doc);
});

// for page not found (i.e., 404)
app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("App listening on port " + port + "!");
});

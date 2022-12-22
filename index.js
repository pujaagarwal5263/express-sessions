const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

const oneday = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "this is my secret key",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: oneday },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(express.static(__dirname));
// app.use(bodyParser());

var myusername = "Puja Agarwal";
var myemail = "puja@geekyants.com";
var session;
//serving public file
app.use(express.static("public"));

app.post("/user", (req, res) => {
  if (req.body.name == myusername && req.body.email == myemail) {
    session = req.session;
    console.log(req.session);
    res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  } else {
    res.send("Invalid username or email");
  }
  console.log("Post is working");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
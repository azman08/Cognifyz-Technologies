const express = require("express");

const path = require("path");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Data Received :", req.body);
  console.log(
    `Form Data Received: Name - ${name}, Email - ${email}, Message - ${message}`
  );
  res.send("Form Submitted Successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

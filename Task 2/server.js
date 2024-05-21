const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { name, email, message, phone, dob, gender, agree } = req.body;

  if (!name || !email || !message || !phone || !dob || !gender || !agree) {
    return res
      .status(400)
      .send("Please fill in all fields and agree to the terms.");
  }

  res.send("Form submitted successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

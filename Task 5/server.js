const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

let submissions = [];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { submissions });
});

app.post("/submit", (req, res) => {
  const { name, email, message, phone, dob, gender, agree } = req.body;

  if (!name || !email || !message || !phone || !dob || !gender || !agree) {
    return res
      .status(400)
      .send("Please fill in all fields and agree to the terms.");
  }

  const newSubmission = {
    id: Date.now(),
    name,
    email,
    message,
    phone,
    dob,
    gender,
  };
  submissions.push(newSubmission);

  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const submission = submissions.find(
    (sub) => sub.id === parseInt(req.params.id)
  );
  res.render("edit", { submission });
});

app.post("/update/:id", (req, res) => {
  const { name, email, message, phone, dob, gender, agree } = req.body;
  const submissionIndex = submissions.findIndex(
    (sub) => sub.id === parseInt(req.params.id)
  );

  if (submissionIndex !== -1) {
    submissions[submissionIndex] = {
      id: parseInt(req.params.id),
      name,
      email,
      message,
      phone,
      dob,
      gender,
    };
    res.redirect("/");
  } else {
    res.status(404).send("Submission not found");
  }
});

app.get("/delete/:id", (req, res) => {
  submissions = submissions.filter((sub) => sub.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

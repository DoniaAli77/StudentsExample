const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const studentModel = require("./Models/studentModel"); // * Importing the student model

app.use(express.json());// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));



// * Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await studentModel.find();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Get a student by id
app.get("/students/:id", async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Create a student

app.post("/students", async (req, res) => {
  try {
    const newStudent = new studentModel({
      name: req.body.name,
      age: req.body.age,
    });
    const student = await newStudent.save();
    return res.status(201).json({student,msg:"created"});
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Update a student

app.put("/students/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
      },
      { new: true }
    );
    return res.status(200).json({student,msg:"updated"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});

// * Delete a student

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({student,msg:"deleted"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});


const db_name = "students";
// * Cloud Connection
// const db_url = `mongodb+srv://TestUser:TestPassword@cluster0.lfqod.mongodb.net/${db_name}?retryWrites=true&w=majority`;
// * Local connection
const db_url = `mongodb://localhost:27017/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1

// ! Mongoose Driver Connection
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(3000, () => console.log("server started"));

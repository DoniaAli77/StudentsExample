const express = require("express");
const studentModel = require("../Models/studentModel"); // * Importing the student model
const router = express.Router();

// * Get all students
router.get("/", async (req, res) => {
  try {
    const students = await studentModel.find();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Get a student by id
router.get("/:id", async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Create a student

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({student,msg:"deleted"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});
//---------useing router.routr()----------------
/*router
  .route("/")
  .get(async (req, res) => {
    try {
      const students = await studentModel.find();
      return res.status(200).json(students);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  })
  .post(async (req, res) => {
    try {
      const newStudent = new studentModel({
        name: req.body.name,
        age: req.body.age,
      });
      const student = await newStudent.save();
      return res.status(201).json(student);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const student = await studentModel.findById(req.params.id);
      return res.status(200).json(student);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    try {
      const student = await studentModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({student,msg:"deleted"});
    } catch (error) {
      return res.status(500).json({ error: err });
    }
  });
*/
module.exports = router;

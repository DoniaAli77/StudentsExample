const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: true,
};
const courseSchema= new mongoose.Schema(

 {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
    },
    id: {
      type: Number,
      min: 1,
      required: true,
    },
  },
);
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    courses:[courseSchema]
  },
  // schemaOptions
  {
    strict: false,
    timestamps: true,
  }
);


module.exports = mongoose.model('StudentModel', studentSchema);

// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});
import mongoose from "mongoose";
import Student from "../../models/Student";

mongoose.connect(process.env.MONGO_URI);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const students = await Student.find();
    return res.status(200).json(students);
  }
  if (req.method === "POST") {
    const student = new Student(req.body);
    await student.save();
    return res.status(201).json(student);
  }
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
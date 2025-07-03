const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  city: String,
  state: String,
  startDate: Date,
  endDate: Date,
  currentlyWorking: Boolean,
  workSummary: String,
});

const EducationSchema = new mongoose.Schema({
  degree: String,
  description: String,
  startDate: Date,
  endDate: Date,
  major: String,
  universityName: String,
});

const SkillSchema = new mongoose.Schema({
  name: String,
  rating: String,
});

const ResumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: String,
  lastName: String,
  jobTitle: String,
  address: String,
  email: String,
  phone: String,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
  resumeId: { type: String, required: true }, // UUID
  userEmail: { type: String, required: true },
  userName: String,
  themeColor: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema); 
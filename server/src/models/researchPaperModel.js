import mongoose from "mongoose";

// Define Author schema
const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affiliation: { type: String, required: true },
  email: { type: String, required: true }
});

// Define Contact Info schema
const ContactInfoSchema = new mongoose.Schema({
  primary_contact: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

// Define Research Paper schema
const ResearchPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [AuthorSchema], required: true },
  abstract: { type: String, required: true },
  keywords: { type: [String], required: true },
  publication_date: { type: Date, required: true },
  journal: { type: String, required: true },
  volume: { type: Number, required: true },
  issue: { type: Number, required: true },
  pages: { type: String, required: true },
  doi: { type: String, required: true },
  methodology: { type: String, required: true },
  findings: { type: String, required: true },
  conclusion: { type: String, required: true },
  funding: { type: String, required: true },
  contact_info: { type: ContactInfoSchema, required: true }
});

const ResearchPaperModel = mongoose.model('researchPaper', ResearchPaperSchema);
export default ResearchPaperModel
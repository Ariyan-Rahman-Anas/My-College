import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  details: { type: String, required: true },
  admissionDates: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  events: [String],
  researchHistory: { type: String, required: true },
    sports: [String],
  rating:{type: String, required: true}
},{timestamps:true, versionKey:false});

const CollegeModel = mongoose.model("college", collegeSchema);
export default CollegeModel;
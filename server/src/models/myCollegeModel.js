import mongoose from "mongoose"

const myCollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: [true, "Please provide the public ID for the image"],
    },
    url: {
      type: String,
      required: [true, "Please provide the URL for the image"],
    },
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
}, { timestamps: true, versionKey: false });

const MyCollegeModel = mongoose.model("myCollege", myCollegeSchema)
export default MyCollegeModel
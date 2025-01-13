import mongoose from 'mongoose';

const clgReviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
        required: true
    }
}, {timestamps:true, versionKey:false} )

const CollegeReviewModel = mongoose.model('collegeReview', clgReviewSchema)
export default CollegeReviewModel;
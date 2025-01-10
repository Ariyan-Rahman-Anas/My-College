import CollegeModel from "../models/collegeModel.js"

export const collegeList = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const startIndex = (page - 1) * limit;

      const colleges = await CollegeModel.find({})
        .skip(startIndex)
        .limit(limit);

      // Count the total number of documents
      const totalColleges = await CollegeModel.countDocuments();

      if (colleges.length < 1) {
        res.status(404).json({
          success: false,
          message: "No colleges found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Colleges fetched successfully",
        totalColleges: colleges.length,
        totalPages: Math.ceil(totalColleges / limit),
        currentPage: page,
        colleges,
      });
    } catch (error) {
     next(error)   
    }
}


export const getSingleCollege = async (req, res, next) => {
    try {
        const college = await CollegeModel.findById(req.params.id)
        if (!college) {
            res.status(404).json({
                success: false,
                message: "College not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "College fetched successfully",
            college,
        })
    } catch (error) {
        next(error)
    }
}
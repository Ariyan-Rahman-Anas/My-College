import { useGetCollegeReviewsQuery } from "@/redux/features/collegeReviewApi";
import IsRTKLoadingLoader from "../IsRTKLoadingLoader";
import { Card } from "../ui/card";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetCollegesQuery } from "@/redux/features/collegeApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";

const CollegeReviews = () => {
  const [clgId, setClgId] = useState("");

  // Fetch colleges
  const { data: collegesData } = useGetCollegesQuery();

  // Fetch reviews
  const { data, isLoading, error } = useGetCollegeReviewsQuery(
    { clgId },
    { skip: !clgId }
  );

  // Set the first college as default when collegesData is fetched
  useEffect(() => {
    if (collegesData?.colleges?.length > 0 && !clgId) {
      setClgId(collegesData.colleges[0]._id);
    }
  }, [collegesData, clgId]);

  // Handle errors
  if (error) {
    toast.error(error?.data?.message);
  }

  // Show loading state
  if (isLoading) {
    return <IsRTKLoadingLoader />;
  }

  return (
    <div className="w-full md:w-[85%] mx-auto space-y-4">
      <h1 className="heading">College Reviews</h1>

      {/* College Selection */}
      <div className="grid gap-1 w-fit">
        <Label>Choose College</Label>
      <select
        value={clgId} // Controlled select
        onChange={(e) => setClgId(e.target.value)}
        className="p-3 rounded-lg border-2 focus:outline-none focus:border-black"
      >
        {collegesData?.colleges?.map(({ _id, name }, idx) => (
          <option value={_id} key={idx}>
            {name}
          </option>
        ))}
        </select>
      </div>

      {/* College Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.reviews?.map(({ reviewer, rate, comment }, idx) => (
          <Card key={idx}>
            <Quote size={17} color="black" fill="black" />
            <div className="flex flex-col items-center justify-center font-semibold">
              <p className="text-2xl">{rate}</p>
              <div className="flex items-center">
                {[...Array(rate)].map((_, index) => (
                  <Star key={index} color="gold" fill="gold" size={17} />
                ))}
              </div>
            </div>

            <p className="text-sm my-2">{comment}</p>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold" >{reviewer?.name}</h1>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CollegeReviews;
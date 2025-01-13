import CollegeCard from "@/components/CollegeCard";
import IsRTKLoadingLoader from "@/components/IsRTKLoadingLoader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetCollegesWithPaginationQuery } from "@/redux/features/collegeApi";

const CollegesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useGetCollegesWithPaginationQuery({page:currentPage});

    // Handler for changing the page
    const handlePageChange = (page) => {
        if (page >= 1 && page <= data?.totalPages) {
            setCurrentPage(page);
        }
    };

    if (error) {
        return <div className="text-red-500">Something went wrong!</div>;
    }

     if (isLoading) {
        return <IsRTKLoadingLoader />;
    }

    return (
        <div className="p-2">
            {/* College cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.colleges?.map((clg) => (
                    <CollegeCard key={clg._id} clg={clg} />
                ))}
            </div>

            {/* Pagination buttons */}
            <div className="flex justify-center mt-4 space-x-2">
                {/* Previous Button */}
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>

                {/* Page Number Buttons */}
                {Array.from({ length: data?.totalPages || 1 }, (_, idx) => idx + 1).map((page) => (
                    <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        variant={currentPage === page ? "solid" : "outline"} // Highlight current page
                    >
                        {page}
                    </Button>
                ))}

                {/* Next Button */}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data?.totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CollegesPage;
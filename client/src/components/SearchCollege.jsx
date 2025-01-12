import { useSearchCollegesQuery } from "@/redux/features/collegeApi"
import { Button } from "./ui/button"
import { useState } from "react";
import IsRTKLoadingLoader from "./IsRTKLoadingLoader";
import CollegeCard from "./CollegeCard";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SearchCollege = () => {

    const [searchKey, setSearchKey] = useState(null);
    const { data, isLoading, error } = useSearchCollegesQuery(searchKey, {
        skip: !searchKey
    })

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKey(event.target.search.value);
    };

    if (error) {
        toast.error(error?.data?.message)
    }

    if (isLoading) {
        return <IsRTKLoadingLoader />
    }


    return (
        <div className="mt5">
            <div className="md:w-[80%] mx-auto ">
                <form action="" onSubmit={handleSearch} className="flex items-center w-full" >
                    <input
                        type="text"
                        name="search"
                        required
                        defaultValue={searchKey}
                        placeholder="Search College"
                        className="w-full rounded-r-none rounded-l-md p-3 focus:outline-none border-[0.09rem] border-gray-200 focus:border-black border-r-0 "
                    />
                    <button className="rounded-l-none bg-black hover:bg-gray-800 text-white rounded-r-md px-6 py-3 border-[0.09rem] font-semibold border-black" >Search</button>
                </form>
            </div>

            {data && (
                <div>
                    <p className="text-center font-semibold my-4" >{data?.queryData?.length} college found </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                        {data?.queryData?.map(clg => (
                            <CollegeCard key={clg._id} clg={clg} />
                        )).slice(0, 3)}
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            data?.queryData?.length > 3 && <Link to={"/colleges"} >
                                <Button>See more</Button>
                            </Link>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
export default SearchCollege
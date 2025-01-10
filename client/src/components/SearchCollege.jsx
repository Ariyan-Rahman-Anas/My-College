import { Button } from "./ui/button"
import { Input } from "./ui/input"

const SearchCollege = () => {
    return (
        <div className="mt-5">
            <div className="flex items-center w-full md:w-[80%] mx-auto ">
                <input
                    type="text"
                    placeholder="Search your College"
                    className="w-full rounded-r-none rounded-l-md py-3 px-2 focus:outline-none border-[0.09rem] border-gray-200 focus:border-black border-r-0 "
                />
                <button className="rounded-l-none bg-black hover:bg-gray-800 text-white rounded-r-md px-6 py-3 border-[0.09rem] font-semibold border-black" >Search</button>
            </div>
        </div>
    )
}

export default SearchCollege
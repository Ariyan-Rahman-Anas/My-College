import { Loader2 } from "lucide-react"

const IsRTKLoadingLoader = ({ h = "full" }) => {
    return (
        <div className={`min-h-[${h}] w-full flex items-center justify-center`}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
    )
}
export default IsRTKLoadingLoader
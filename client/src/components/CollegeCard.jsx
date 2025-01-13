import { Loader2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const CollegeCard = ({ clg }) => {

    console.log("clg",clg)

    const { _id, name, image, rating, admissionDates, researchHistory,sports, events } = clg || {};
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loadedImage, setLoadedImage] = useState(null);
    const numberOfResearch = researchHistory.split(",").map(item => item.trim())

    useEffect(() => {
        // Fetch the image and track progress
        const loadImage = async () => {
            try {
                const response = await fetch(image);
                const reader = response.body.getReader();
                const contentLength = +response.headers.get("Content-Length");

                const chunks = [];
                let loaded = 0;

                reader.read().then(function processResult(result) {
                    if (result.done) {
                        // Convert the image to a data URL
                        const blob = new Blob(chunks);
                        const objectURL = URL.createObjectURL(blob);
                        setLoadedImage(objectURL);  // Set the image once fully loaded
                        setLoading(false);  // Image is fully loaded
                        return;
                    }

                    chunks.push(result.value);
                    loaded += result.value.length;
                    setProgress(Math.round((loaded / contentLength) * 100));  // Update progress percentage
                    reader.read().then(processResult);
                });
            } catch (error) {
                console.error("Failed to load image", error);
                setLoading(false);  // Stop the loader in case of error
            }
        };

        loadImage();
    }, [image]);

    return (
        <Card className="relative">
            <div>
                {/* Loader for image */}
                {loading && (
                    <div className="flex flex-col items-center justify-center bg-gray-400 h-[270px] rounded-t-md animate-pulse ">
                        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                        <p>{progress}%</p>
                    </div>
                )}

                {/* Display the image once it's fully loaded */}
                {loadedImage && <img src={loadedImage} alt={name} className="w-full h-full rounded-t-md " />}
            </div>
            <div className="p-2 pb-14">
                <div className="flex items-end justify-between">
                    <h1 className="font-semibold" >{name}</h1>
                    <div className="flex items-center gap-1">
                        <p className="font-semibold" >{rating}</p>
                        <Star size={15} color="black" fill="black" />
                    </div>
                </div>
                <p className="mt-3">Admission start on: {admissionDates?.start.slice(0, 10)} </p>
                <p>Research paper: {numberOfResearch?.length}</p>
                <p>Running Events: {events?.length}</p>
                <p>Running Sports: {sports?.length}</p>
            </div>
            <Link to={`/colleges/${_id}`} className="absolute bottom-2 right-2 " >
                    <Button>
                        Details
                    </Button>
                </Link>
        </Card>
    );
};

export default CollegeCard;
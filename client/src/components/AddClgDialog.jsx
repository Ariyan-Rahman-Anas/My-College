import { X } from "lucide-react"
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePostMyCollegeMutation } from "@/redux/features/myCollegeApi";
import { useEffect } from "react";
import { toast } from "sonner";
import IsRTKLoadingLoader from "./IsRTKLoadingLoader";

const AddClgDialog = ({ openModal, setOpenModal }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [postMyCollege, {data, isLoading, isSuccess, error}] = usePostMyCollegeMutation()


    // // Form submission handler
    // const handleOnSubmit = (formData) => {
    //     postMyCollege(formData)
    //     console.log("Submitted Form Data:", formData);
    //     reset();
    //     setOpenModal(false); // Close the modal
    // };


    // Handle Form Submission
    const handleOnSubmit = (formData) => {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
        });

        postMyCollege(formDataObj); // Send data to the backend
        reset();
        setOpenModal(false); // Close modal
    };




    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess) {
            toast.success(data?.message)
        }
    },[data?.message,error,isSuccess])


    if (isLoading) {
        return <IsRTKLoadingLoader />
    }

    return (
        <div className="mx-auto w-fit">
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/70 duration-100 dark:bg-transparent`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-wmd rounded-lg bg-white w-full md:w-[70%] p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'}`}>
                    <X onClick={() => setOpenModal(false)} className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white" />
                    <h1 className="mb-2 text-2xl font-semibold">Add Your College!</h1>
                    <p className="mb-5 text-sm opacity-80">Fill out the details below and click submit to add your college.</p>

                    {/* ... */}
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="">
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                {/* Name Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="name">
                                        Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("name", { required: "Name is required" })}
                                        id="name"
                                        type="text"
                                        placeholder="College Name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("email", { required: "Email is required" })}
                                        id="email"
                                        type="email"
                                        placeholder="example@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="phone">
                                        Phone <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("phone", { required: "Phone number is required" })}
                                        id="phone"
                                        type="text"
                                        placeholder="+880 1611-223344"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                    )}
                                </div>

                                {/* Address Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="address">
                                        Address <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("address", { required: "Address is required" })}
                                        id="address"
                                        type="text"
                                        placeholder="Khulshi, CTG, BD"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm">{errors.address.message}</p>
                                    )}
                                </div>

                                {/* Date of Birth Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="dob">
                                        Date of Birth <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("dob", { required: "Date of Birth is required" })}
                                        id="dob"
                                        type="date"
                                    />
                                    {errors.dob && (
                                        <p className="text-red-500 text-sm">{errors.dob.message}</p>
                                    )}
                                </div>

                                {/* Image Upload Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="image">
                                        Image <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("image", { required: "Image is required" })}
                                        id="image"
                                        type="file"
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div className="grid gap-1">
                                    <Label htmlFor="subject">
                                        Subject <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        {...register("subject", { required: "Subject is required" })}
                                        id="subject"
                                        type="text"
                                        placeholder="CSE"
                                    />
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm">{errors.subject.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Footer with Submit Button */}
                            <div className="flex items-center justify-end">
                                <Button type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddClgDialog
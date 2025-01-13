import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCreateReviewMutation } from "@/redux/features/collegeReviewApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const ReviewModal = ({ clgId }) => {
    console.log({clgId})
    const [openModal, setOpenModal] = useState(false);
    const {_id} = useSelector(state=>state?.auth?.user)

        const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
    } = useForm();

    const [createReview, {data, isSuccess, error}] = useCreateReviewMutation()
    

    const handleOnSubmit = (formData) => {
        console.log({ formData })
        const reviewData = {
            reviewer: _id,
            rate : formData?.rate,
            comment: formData?.comment,
            college: clgId
        }
        createReview(reviewData)
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess) {
            toast.success(data?.message)
            setOpenModal(false)
            reset()
        }
    },[data?.message,error, isSuccess, reset])

    return (
        <div className="mx-auto flex items-center justify-center">
            <Button onClick={() => setOpenModal(true)}>
                Feedback
            </Button>
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/50 duration-100`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-80 rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <form
                            onSubmit={handleSubmit(handleOnSubmit)}
                            className="w-full"
                        >
                            <div className="space-y-4">
                                {/* Form Fields */}
                                <div className="grid grid-cols-1 gap-3">
                                    {/* Name Field */}
                                    <div className="grid gap-1 text-left">
                                        <Label htmlFor="rate">
                                            Rate <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            {...register("rate", { required: "Rate is required" })}
                                            id="rate"
                                            type="number"
                                            placeholder="Rating us (1-5)"
                                        />
                                        {errors.rate && (
                                            <p className="text-red-500 text-sm">{errors.rate.message}</p>
                                        )}
                                    </div>

                                    {/* comment Field */}
                                    <div className="grid gap-1 text-left">
                                        <Label htmlFor="comment">
                                            Comment <span className="text-red-500">*</span>
                                        </Label>
                                        <textarea {...register("comment", { required: "Comment is required" })} id="comment" name="comment"
                                            placeholder="Write your comment..." className="border-2 rounded-lg p-2 focus:outline-none focus:border-black "></textarea>
                                        {errors.comment && (
                                            <p className="text-red-500 text-sm">{errors.comment.message}</p>
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
        </div>
    )
}
export default ReviewModal
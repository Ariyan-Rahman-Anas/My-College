import { useEffect, useState } from "react";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForgotPasswordMutation, useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const ResetPassword = () => {
    const [openModal, setOpenModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm()

    const [forgotPassword, { data, isLoading, isSuccess: sessionActivated, error }] = 
    useForgotPasswordMutation()

    const [resetPassword, {data:isResetData, isLoading:isResetting, isSuccess:isReset, error:isResetError }] = useResetPasswordMutation()

    const handleForgotPasswordSession = (formData) => {
        forgotPassword(formData)
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
        if (sessionActivated) {
            toast.success(data?.message)
            // setOpenModal(false)
        }
    }, [data?.message, error, sessionActivated])


    const handleResetPassword = (formData) => {
        resetPassword(formData)
    }

    useEffect(() => {
        if (isResetError) {
            toast.error(isResetError?.data?.message)
        }
        if (isReset) {
            toast.success(isResetData?.message)
            setOpenModal(false)
        }
    }, [isReset, isResetData?.message, isResetError])


    return (
        <div className="mx-auto flex w-72 items-center justify-center">
            <button onClick={() => setOpenModal(true)} className="hover:underline" >
                Forgotten password?
            </button>
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/50 duration-100`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-[95%] md:w-[50%] lg:w-[40%] rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {
                            !sessionActivated && <form
                                onSubmit={handleSubmit(handleForgotPasswordSession)}
                                className="w-full space-y-4 flex flex-col " >
                                <div className="flex text-left">
                                    <div className="w-full">
                                        <Label htmlFor="email">Email
                                            <span className="text-red-500 text-lg">*</span>
                                        </Label>
                                        <Input
                                            {...register("email", { required: true })}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>
                                <Button
                                    disabled={isLoading}
                                >
                                    {
                                        isLoading ? (
                                            <>
                                                Please wait
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            </>
                                        ) : "Continue"
                                    }
                                </Button>
                            </form>
                        }


                        {
                            sessionActivated && <form
                                onSubmit={handleSubmit(handleResetPassword)}
                                className="w-full space-y-4 flex flex-col "
                            >
                                <div className="flex text-left">
                                    <div className="w-full">
                                        <Label htmlFor="password">Password
                                            <span className="text-red-500 text-lg">*</span>
                                        </Label>
                                        <Input
                                            {...register("password", { required: true })}
                                            id="email"
                                            name="password"
                                            type="password"
                                            placeholder="********"
                                        />
                                    </div>
                                </div>
                                <Button
                                    disabled={isResetting}
                                >
                                    {
                                        isResetting ? (
                                            <>
                                                Please wait
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            </>
                                        ) : "Reset Password"
                                    }
                                </Button>
                            </form>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword






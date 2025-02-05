import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const ProfileEditModal = () => {
  const {_id} = useSelector(state=>state?.auth?.user)
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
     reset
  } = useForm()

  const [updateProfile, { data, isLoading, error, isSuccess }] = useUpdateProfileMutation({userId:_id})

  const handleUpdate = (formData) => {
  const data = {
    userId: _id,
    name: formData?.name,
    email: formData?.email,
    password: formData?.password,
  };
  updateProfile(data);
};

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
    if (isSuccess) {
      toast.success(data?.message)
      setOpenModal(false)
      reset()
    }
  },[data?.message, error, isSuccess, reset])

  return (
    <div className="mx-auto flex items-center justify-center">
      <Button onClick={() => setOpenModal(true)}  >Edit Profile</Button>
      <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/50 duration-100`}>
        <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-[95%] md:w-[50%] lg:w-[40%] rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
          <div className="flex flex-col items-center justify-center space-y-4">
            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="w-full"
            >
              <div className="flex flex-col gap-3">
                <div className="text-left w-fit">
                  <h1 className="font-semibold" >Edit your profile</h1>
                  <p className="text-sm text-gray-500">You can change your name, email or password</p>
                  <p></p>
                </div>
                <div className="grid gap-1">
                  <div className="flex">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <Input
                    {...register("name", { required: false })}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid gap-1">
                  <div className="flex">
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <Input
                    {...register("email", { required: false })}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="grid gap-1">
                  <div className="flex">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    {...register("password", {
                      required: false,
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                  />
                </div>

                <Button
                disabled={isLoading}
                >
                  {
                      isLoading ? (
                      <>
                          Updating...
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                      ) : "Update"
                    } 
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditModal
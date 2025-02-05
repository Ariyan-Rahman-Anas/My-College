import GoogleAuth from "@/components/googleAuth/GoogleAuth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegistrationPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError, reset
  } = useForm()

  const [registration, { data, isLoading, error, isSuccess }] = useRegistrationMutation()
  const handleRegistration = (formData) => {
    registration(formData)
  } 
  useEffect(() => {
    if (error?.data) {
      setError("root.random", {
        type: "random",
        message: error.data?.message,
      });
      toast.error(error.data?.message);
    }
    if (isSuccess) {
      reset,
      toast.success(data?.message);
      navigate("/login");
    }
  }, [data, error, navigate, isSuccess, reset, setError]);

  return (
    <div className="flex items-center justify-center my10 px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto p- ">
        <CardHeader>
          <CardTitle className="text-2xl">
            Registration
          </CardTitle>
          <CardDescription>
            Enter proper info below to create an account
          </CardDescription>
        </CardHeader>
        <form
        onSubmit={handleSubmit(handleRegistration)}
        >
          <CardContent>
            <div className="grid gap-2">
              <div className="grid gap-.5">
                  <Label htmlFor="name">Name
                    <span className="text-red-500 text-lg">*</span>
                  </Label>
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid gap-.5">
                <div className="flex items-center">
                  <Label htmlFor="email">Email
                    <span className="text-red-500 text-lg">*</span>
                  </Label>
                </div>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid gap-.5">
                  <Label htmlFor="password">Password
                    <span className="text-red-500 text-lg">*</span>
                  </Label>
                <Input
                  {...register("password", {
                    required: true,
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
                      Please wait
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : "Registration"
                }
              </Button>
              <GoogleAuth />
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline font-medium ">
                Login
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
export default RegistrationPage
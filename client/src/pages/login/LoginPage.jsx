import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "@/components/googleAuth/GoogleAuth";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import ResetPassword from "./ResetPassword";

const LoginPage = () => {
  const navigate =  useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation()
  const handleLogin = (formData) => {
    login(formData)
  }

  useEffect(() => {
    if (error?.data) {
      setError("root.random", {
        type: "random",
        message: error.data?.message,
      });
      toast.error(error.data?.message);
    }
    if (isSuccess && data?.token) {
      dispatch(setUser({
        user: data.user,
        token:data.token
      }))
      toast.success(data?.message);
      navigate("/");
    }
  }, [data, error, navigate, isSuccess, login, dispatch, setError]);

  return (
    <div className="flex items-center justify-center px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">
            Login
          </CardTitle>
          <CardDescription>
            Enter your credentials below to login your account
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(handleLogin)}
        >
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-0.5">
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

              <div className="grid gap-0.5">
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : "Login"
                }
              </Button>
              <GoogleAuth />
            </div>
          </CardContent>
        </form>

        <ResetPassword />

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/registration" className="underline font-medium ">
            Registration
          </Link>
        </div>

      </Card>
    </div>
  )
}
export default LoginPage
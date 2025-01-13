import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { app } from "@/firebase/firebase.init";
import { useGoogleAuthMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { setUser } from "@/redux/features/auth/authSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleAuth, {data, isSuccess, error}] = useGoogleAuthMutation()

  // Google auth handler--
  const googleAuthHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      console.log({ result })
      
      const credentials = {
        name: result.user.displayName,
        email:result.user.email
      }
      await googleAuth(credentials).unwrap()

    } catch (err) {
        console.log("ok", err.message)
    }
  };
  console.log("Data",data)
  
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
    if (isSuccess) {
      toast.success(data?.message)
            dispatch(setUser({
        user: data?.user,
        token:data?.token
            }))
      navigate("/");
    }
  },[data?.message, error, isSuccess,data?.token,data?.user,navigate,dispatch])
    
  return (
    <Button
       className="w-fit mx-auto"
      onClick={googleAuthHandler}
    >
      Continue with google
    </Button>
  );
};
export default GoogleAuth;
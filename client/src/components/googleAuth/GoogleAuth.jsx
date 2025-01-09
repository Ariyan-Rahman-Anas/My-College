import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { app } from "@/firebase/firebase.init";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Google auth handler--
  const googleAuthHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await fetch(`${backendUrl}/api/v1/auth/google`, {
        method: "POST",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data.user));
        dispatch(successMessage(data.message));
        navigate("/");
      } else {
        dispatch(loginFail());
      }
    } catch (err) {
      dispatch(loginFail());
      dispatch(errorMessage(err?.message));
    }
    };
    
    
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
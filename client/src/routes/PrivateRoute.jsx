import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';


const PrivateRoute = ({ children, redirectTo = "/login", isAdmin, isPublic = false }) => {

    const navigate = useNavigate();
    const user = useSelector((state) => state?.auth?.user);
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
    
    useEffect(() => {
        if (!isPublic && !isAuthenticated) {
            toast.error("Login required: Please log in to view this content.", { duration: 3000 });
            navigate(redirectTo);
        } else if (isPublic && isAuthenticated) {
            navigate("/");
        } else if (isAuthenticated && isAdmin && user?.isAdmin !== true) {
            toast.error("Sorry, you are not authorized to access this section.", { duration: 3000 });
            navigate(redirectTo);
        }
    }, [isAuthenticated, isAdmin, user, navigate, redirectTo, isPublic]);
    if ((isAuthenticated && (!isAdmin || user.isAdmin === true)) || isPublic) {
        return children;
    }
    return null;
};
export default PrivateRoute;
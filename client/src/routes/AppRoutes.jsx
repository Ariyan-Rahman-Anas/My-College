import Loader from "@/components/Loader"
import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "@/pages/NotFoundPage";

const App = lazy(() => import("./../App"));
const HomePage = lazy(() => import("./../pages/home/HomePage"));
const LoginPage = lazy(() => import("./../pages/login/LoginPage"));
const RegistrationPage = lazy(() => import("./../pages/registration/RegistrationPage"));
const CollegesPage = lazy(() => import("./../pages/colleges/CollegesPage"));
const CollegeDetailsPage = lazy(() => import("./../pages/college-details/CollegeDetailsPage"));
const AdmissionPage = lazy(() => import("./../pages/admission/AdmissionPage"));
const MyCollegesPage = lazy(() => import("../pages/myColleges/MyCollegesPage"));
const UserProfile = lazy(() => import("../pages/userProfile/UserProfile"));
const ResearchPaperDetailsPage = lazy(() => import("../pages/researchPaperDetails/ResearchPaperDetailsPage"));

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loader />} >
            <App />
        </Suspense>,
        errorElement:<NotFoundPage />,  
        children: [
            { path: "/", element: <HomePage /> },
            {
                path: "/login",
                element: <PrivateRoute isPublic={true}>
                    <LoginPage />
                </PrivateRoute>
            },
            {
                path: "/registration",
                element: <PrivateRoute isPublic={true}>
                    <RegistrationPage />
                </PrivateRoute>
            },
            {
                path: "/colleges",
                element:<CollegesPage/>
            },
            {
                path: "/colleges/:id",
                element: <PrivateRoute>
                    <CollegeDetailsPage />
                </PrivateRoute>
                
            },
            {
                path: "/admission",
                element: <PrivateRoute>
                    <AdmissionPage />
                </PrivateRoute> 
            },
            {
                path: "/my-college",
                element: <PrivateRoute>
                    <MyCollegesPage />
                </PrivateRoute>
            },
            {
                path: "/user-profile",
                element: <PrivateRoute>
                    <UserProfile />
                </PrivateRoute>
            },
            {
                path: "/research-details/:id",
                element: <PrivateRoute>
                    <ResearchPaperDetailsPage />
                </PrivateRoute>
            },
        ]
    }
])
export default AppRoutes
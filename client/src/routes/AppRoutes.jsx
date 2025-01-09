import Loader from "@/components/Loader"
import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";

const App = lazy(() => import("./../App"));
const HomePage = lazy(() => import("./../pages/home/HomePage"));
const LoginPage = lazy(() => import("./../pages/login/LoginPage"));
const RegistrationPage = lazy(() => import("./../pages/registration/RegistrationPage"));



const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loader />} >
            <App />
        </Suspense>,
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
        ]
    }
])
export default AppRoutes
import { useDispatch } from "react-redux"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "@/redux/features/auth/authApi"
import { useEffect } from "react"
import { toast } from "sonner"
import { removeUser } from "@/redux/features/auth/authSlice"

const UserDropdown = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logout, { data, isLoading, isSuccess, error }] = useLogoutMutation()

    const handleLogout = () => {
        logout()
    }
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess) {
            toast.success(data?.message)
            navigate("/login")
            dispatch(removeUser())
        }
    }, [data?.message, dispatch, error, isSuccess, navigate])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to={"/user-profile"} >
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                >
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserDropdown
import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useSelector } from "react-redux"
import UserDropdown from "./UserDropdown"

const Header = () => {

    const navItems = [
        {title:"Home", link:"/"},
        {title:"Colleges", link:"/colleges"},
        {title:"Admission", link:"/admission"},
        {title:"My College", link:"/my-college"}
    ]

    const user = useSelector(state => state?.auth?.user)

    return (
        <nav className="flex items-center justify-between p-2">
            <div id="nav-left">
                <Link to={"/"} className="text-2xl font-bold" >MyCollege</Link>
            </div>
            <div id="nav-middle">
                <ul className="flex items-center">
                    {
                        navItems.map(({title, link},idx)=> <li key={idx} className="relative">
                            <NavLink
                                to={link}
                                className={({ isActive }) =>
                                    isActive && location.pathname === link
                                        ? "bg-gray-200 px-4 py-1.5 font-semibold border-b-black rounded-md dark:text-white duration-500"
                                        : "hover:bg-gray-200 px-4 py-1.5 rounded-md duration-500"
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
  )
                    }
                </ul>
            </div>
            <div id="nav-right">
                {
                    user
                        ?
                        <UserDropdown />
                        : <Button>
                            <Link to={"/login"}>Login</Link>
                        </Button>
                }
            </div>
        </nav>
    )
}
export default Header
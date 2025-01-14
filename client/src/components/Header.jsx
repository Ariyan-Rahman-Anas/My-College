import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useSelector } from "react-redux"
import UserDropdown from "./UserDropdown"
import { AlignJustify, X } from "lucide-react"
import { useState } from "react"

const Header = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const [hideMenu, setHideMen] = useState(false)

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu)
        setHideMen(!hideMenu)
    }

    const navItems = [
        { title: "Home", link: "/" },
        { title: "Colleges", link: "/colleges" },
        { title: "Admission", link: "/admission" },
        { title: "My College", link: "/my-college" }
    ]

    const user = useSelector(state => state?.auth?.user)

    return (
        <nav className="flex items-center justify-between p-2">
            <div id="nav-left" className="flex items-center gap-2">
                <AlignJustify className="md:hidden" onClick={() => setOpenMenu(!openMenu)} />
                <Link to={"/"} className="text-2xl font-bold" >MyCollege</Link>
            </div>
            <div id="nav-middle" className="hidden md:block " >
                <ul className="flex items-center">
                    {
                        navItems.map(({ title, link }, idx) => <li key={idx} className="relative">
                            <NavLink
                                to={link}
                                className={({ isActive }) =>
                                    isActive && location.pathname === link
                                        ? "bg-gray-200 px-4 py-1.5 font-semibold rounded-md dark:text-white duration-500"
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


            {/* menu for small devices */}
            {
                openMenu &&
                <div className="fixed top-0 left-0 w-full h-screen bg-black z-50">
                    <div id="nav-left" className="bg-gray-800 p-3 flex items-center justify-between gap-2 text-white ">
                        <Link to={"/"} className="text-2xl font-bold" >MyCollege</Link>
                        <X size={26} className="md:hidden" onClick={() => setOpenMenu(!openMenu)} />
                    </div>
                    <ul className="flex flex-col items-start justify-start ml-4 mt-8 h-full gap-4">
                        {
                            navItems.map(({ title, link }, idx) => <li key={idx} onClick={handleMenuToggle} className="w-full ">
                                <NavLink
                                    to={link}
                                    className={({ isActive }) =>
                                        isActive && location.pathname === link
                                            ? "bg-gray-600 text-white w-full px-4 py-1.5 font-semibold rounded-md duration-500"
                                            : "hover:bg-gray-200 text-white px-4 py-1.5 rounded-md duration-500"
                                    }
                                >
                                    {title}
                                </NavLink>
                            </li>
                            )
                        }
                    </ul>
                </div>
            }

        </nav>
    )
}
export default Header
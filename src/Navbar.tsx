import { Link } from "react-router-dom"

export const Navbar: React.FC = () => {
    return (
        <nav id="navbar" className="absolute w-full bg-neutral-200 shadow-md text-lg py-2 pl-6" >
            <ul className="flex justify-between w-1/5">
                <li> <Link to={"/"} className="text-xl opacity-60 font-semibold hover:opacity-100">HOME</Link> </li>
                <li> <Link to={"/*"} className="text-xl opacity-60 font-semibold hover:opacity-100">ARCHIVE</Link> </li>
                <li> <Link to={"/about"} className="text-xl opacity-60 font-semibold hover:opacity-100">ABOUT</Link> </li>
            </ul>
        </nav>
    )
}
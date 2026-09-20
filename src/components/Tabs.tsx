import { NavLink } from "react-router-dom"
import "./Tabs.css"

function Tabs () {
    return (
/*         <nav className="tabs">
            <button onClick={() => onTabChange("products")}
                className={activeTab === "products" ? "tab active" : "tab"}>
                Products
            </button> */
        <nav className="tabs">
            <NavLink to="/products">
                Products
            </NavLink>
            <NavLink to="/polls">
                Polls
            </NavLink>
            <NavLink to="/events">
                Events
            </NavLink>
        </nav>


    )
}
export default Tabs
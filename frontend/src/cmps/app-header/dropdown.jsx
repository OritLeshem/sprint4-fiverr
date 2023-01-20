import { Link } from "react-router-dom";

export function Dropdown({ onLogout, setIsDropdown }) {

    return <aside className="dropdown">
        <ul>
            <li><Link to="/user" onClick={() => setIsDropdown(false)}>Profile</Link></li>
            <li onClick={() => onLogout()}>Logout</li>
        </ul>
    </aside>
}
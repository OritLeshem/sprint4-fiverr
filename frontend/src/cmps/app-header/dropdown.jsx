import { Link } from "react-router-dom";

export function Dropdown({ onLogout, setIsDropdown, user }) {

    return <aside className="dropdown">
        <ul>
            <li><Link to={`/user/${user._id}`} onClick={() => setIsDropdown(false)}>Profile</Link></li>
            <li onClick={() => onLogout()}>Logout</li>
        </ul>
    </aside>
}
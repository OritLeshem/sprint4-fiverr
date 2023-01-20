
export function Dropdown({ onLogout }) {

    return <aside className="dropdown">
        <ul>
            <li>Profile</li>
            <li onClick={() => onLogout()}>Logout</li>
        </ul>
    </aside>
}
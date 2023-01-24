import { Link } from "react-router-dom"

export function AppHeaderMobile({ onToggleMenu, user, onLogout }) {

    return <div className="main-screen" onClick={() => onToggleMenu()}>
        <div className="mobile-menu">
            {user && <div className="user">
                <img src={user.imgUrl} />
                <span>{user.fullname}</span>
            </div>}
            <ul>
                <li><Link to="/gig">Explore</Link></li>
                <li><Link to={`/user/${user._id}`}>Profile</Link></li>
                <li><button className="user-link">Orders</button></li>
                <li onClick={() => onLogout()}>Logout</li>
            </ul>
        </div>
    </div>
}
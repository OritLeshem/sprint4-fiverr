import { Link, NavLink } from 'react-router-dom'
import routes from '../routes'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { Search } from './gig-search'
import { SET_FILTER } from '../store/gig.reducer'
import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'
import { CategoryMenu } from './category-menu'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()



    function onSetFilter(filterBy) {
        console.log('filter index1', filterBy)
        dispatch({ type: SET_FILTER, filterBy })

    }
    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <nav className='app-header-nav'>
                <h3>Fiverr</h3>
                <Search onSetFilter={onSetFilter} />

                {/* <NavLink to="/">fiverr</NavLink> */}
                <Link className='gig-header-link' to="gig">Explore</Link>
                <Link className='gig-header-link' to="gig">Become a seller</Link>
                <Link className="gig-header-link sign-in-btn">Sign in</Link>
                <button className="join-btn">Join</button>
                {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}
            </nav>
            <CategoryMenu onSetFilter={onSetFilter} />
        </header>
    )
}
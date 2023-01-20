import { Link, NavLink, useNavigate } from 'react-router-dom'
import routes from '../routes'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { Search } from './gig-search'
import { SET_FILTER } from '../store/gig.reducer'
import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'
import { CategoryMenu } from './category-menu'
import { gigService } from '../services/gig.service'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        if (!filterBy.tags && !filterBy.title) {
            navigate('/gig')
            return
        }

        let queryStringParams
        if (filterBy.tags) queryStringParams = `?category=${filterBy.tags[0]}`
        if (filterBy.title) queryStringParams = `?title=${filterBy.title}`
        // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        // window.history.pushState({ path: newUrl }, '', newUrl)
        navigate(`/gig${queryStringParams}`)
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
            <nav className="app-header-nav">
                <Link to="/"><h3>Fiverr</h3></Link>
                <Search onSetFilter={onSetFilter} />
                <Link className='gig-header-link' to="gig" onClick={() => onSetFilter(gigService.getDefaultFilter())}>Explore</Link>
                <Link className='gig-header-link' to="gig">Become a seller</Link>
                <Link className="gig-header-link sign-in-btn">Sign in</Link>
                <button className="join-btn">Join</button>
            </nav>
            <CategoryMenu onSetFilter={onSetFilter} />
        </header >
    )
}
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { login, logout, signup } from '../../store/user/user.actions'
import { LoginSignup } from '../user/login-signup.jsx'
import { Search } from './header-search'
import { SET_FILTER } from '../../store/gig/gig.reducer'
import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../../store/gig/gig.actions.js'
import { CategoryMenu } from './header-category-menu'
import { gigService } from '../../services/gig.service'
import { useEffect, useRef, useState } from 'react'
import { Modal } from './modal'
import { Dropdown } from './dropdown'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)

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
            setIsDropdown(false)
            showSuccessMsg(`Bye now`)
            navigate('/gig')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onOpenModal() {
        setIsModal(true)
    }

    function onCloseModal() {
        setIsModal(false)
    }

    return <>
        <section className="app-header">
            <nav className="app-header-nav">
                <div>
                    <Link to="/"><h3 className="logo">finderr<span>.</span></h3></Link>
                    <Search onSetFilter={onSetFilter} />
                </div>
                <div>
                    <Link to="gig"
                        onClick={() => onSetFilter(gigService.getDefaultFilter())}>Explore</Link>
                    <Link to="gig">Become a seller</Link>
                    {user &&
                        <>
                            <button className="fa-regular bell"></button>
                            <button className="fa-regular envelope"></button>
                            <Link className="fa-regular heart"></Link>
                            <button>Orders</button>
                            {user.imgUrl && <img src={user.imgUrl}
                                onClick={() => setIsDropdown(!isDropdown)} />}
                            {isDropdown && <Dropdown onLogout={onLogout} setIsDropdown={setIsDropdown} />}
                        </>
                    }
                    {!user &&
                        <>
                            {isModal && <Modal onLogin={onLogin} onSignup={onSignup}
                                onCloseModal={onCloseModal} />}
                            <Link onClick={() => onOpenModal()}>Sign in</Link>
                            <button className="join-btn" onClick={() => onOpenModal()}>Join</button>
                        </>
                    }
                </div>
            </nav>
        </section>
        <div className="main-app-header full"></div>
        <section className="app-header">
            <CategoryMenu onSetFilter={onSetFilter} />
        </section>
        <div className="main-app-header full"></div>
    </>
}
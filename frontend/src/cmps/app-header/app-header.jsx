import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
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
import UserBuyTable from '../user/user-buy-table'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    const { pathname } = window.location

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
        if (!filterBy.tags.length === 0 && !filterBy.title) {
            navigate('/gig')
            return
        }

        let queryStringParams
        if (filterBy.tags.length !== 0) {
            queryStringParams = `?category=${filterBy.tags[0]}`
            navigate(`/gig${queryStringParams}`)
        }
        if (filterBy.title) {
            queryStringParams = `?title=${filterBy.title}`
            navigate(`/gig${queryStringParams}`)
        }
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
    function handleOrder() {
        setIsOrder(prev => !prev)
    }
    return <>
        <section className={`app-header ${pathname === '/' && 'header-home-page main-layout'}`} >

            <nav className="app-header-nav">
                <div className="app-header-aside">
                    <Link to="/"><h3 className={`logo ${pathname === '/' && 'home-page-link'}`}>finderr<span>.</span></h3></Link>
                    {pathname !== '/' && <Search onSetFilter={onSetFilter} />}
                </div>
                <div className="app-header-main">
                    <Link to="/gig"
                        onClick={() => onSetFilter(gigService.getDefaultFilter())}>Explore</Link>
                    <Link to="gig">Become a seller</Link>
                    {user &&
                        <>
                            <button className="user-link fa-regular bell" title="Notifications"></button>
                            <button className="user-link fa-regular envelope" title="Messages"></button>
                            <Link className="user-link fa-regular heart" title="Lists"></Link>
                            <button onClick={handleOrder} className="user-link">Orders</button>
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
                            <button className={`join-btn ${pathname === '/' && 'home-page-btn'}`} onClick={() => onOpenModal()}>Join</button>
                        </>
                    }
                </div>
            </nav>
            {isOrder && <UserBuyTable />}
        </section>
        {pathname !== '/' && <>
            <div className="main-app-header full"></div>
            <CategoryMenu onSetFilter={onSetFilter} />
            <div className="main-app-header full"></div>
        </>
        }
    </>
}
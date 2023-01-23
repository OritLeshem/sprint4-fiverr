import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { login, logout, signup } from '../../store/user/user.actions'
import { Search } from './header-search'
import { SET_FILTER } from '../../store/gig/gig.reducer'
import { CategoryMenu } from './header-category-menu'
import { gigService } from '../../services/gig.service'
import { useEffect, useState } from 'react'
import { ModalLogin } from './modal-login'
import { Dropdown } from './dropdown'
import UserBuyTable from '../user/user-buy-table'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const { pathname } = window.location

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            if (isModal && e.target.className) {
                setIsModal(false)
            }
            if (isDropdown && e.target.className) {
                setIsDropdown(false)
            }
            if (isOrder && e.target.className) {
                setIsOrder(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isModal, isDropdown, isOrder])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        let categoryParams
        let queryStringParams

        if (!filterBy.title == '') {
            queryStringParams = `?title=${filterBy.title}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }

        else {
            if (filterBy.tags.length) { categoryParams = filterBy.tags[0] }
            else { categoryParams = '' }
            queryStringParams = `?category=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
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
                <div className="main-screen"
                    onClick={() => document.body.classList.remove('menu-open')}>
                    <button className="fa-solid fa-bars menu-toggle-btn"
                        onClick={() => document.body.classList.add('menu-open')}></button>
                </div>

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
                            {isDropdown && <Dropdown onLogout={onLogout} setIsDropdown={setIsDropdown} user={user} />}
                        </>
                    }
                    {!user &&
                        <>
                            {isModal && <ModalLogin onLogin={onLogin} onSignup={onSignup}
                                onCloseModal={onCloseModal} setIsSignup={setIsSignup} isSignup={isSignup} />}
                            <Link onClick={() => { onOpenModal(); setIsSignup(false) }}>Sign in</Link>
                            <button className={`join-btn ${pathname === '/' && 'home-page-btn'}`}
                                onClick={() => { onOpenModal(); setIsSignup(true) }}>Join</button>
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
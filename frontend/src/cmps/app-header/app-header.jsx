import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { login, logout, signup } from '../../store/user/user.actions'
import { Search } from './header-search'
import { SET_FILTER } from '../../store/gig/gig.reducer'
import { CategoryMenu } from './header-category-menu'
import { gigService } from '../../services/gig.service'
import { useEffect, useRef, useState } from 'react'
import { ModalLogin } from './modal-login'
import { Dropdown } from './dropdown'
import UserBuyTable from '../user/user-buy-table'
import { AppHeaderMobile } from './app-header-mobile'
import { userService } from '../../services/user.service'

export function AppHeader() {
    const loginUser = userService.getLoggedinUser()

    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { pathname } = window.location
    const [windowSize, setWindowSize] = useState(null)
    const headerRef = useRef(null)

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize);
        handleResize()
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isModal && e.target.className) {
                setIsModal(false)
            }
            if (isDropdown && e.target.className) {
                setIsDropdown(false)
            }
            if (isOrder && e.target.className !== "user-link") {
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
            if (filterBy.tags[0] !== undefined) categoryParams = filterBy.tags[0]
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

    function onToggleMenu() {
        setIsOpenMenu(!isOpenMenu)
    }

    function handleOrder() {
        setIsOrder(prev => !prev)
    }

    return <>
        <section className={`app-header ${pathname === '/' && 'header-home-page main-layout'}`} >

            <nav className="app-header-nav" ref={headerRef}>
                <button className={`fa-solid fa-bars menu-toggle-btn ${pathname === '/' && 'home-page-link'}`}
                    onClick={() => onToggleMenu()}></button>
                {(windowSize < 900) && isOpenMenu &&
                    <AppHeaderMobile onToggleMenu={onToggleMenu} user={user} onLogout={onLogout} onOpenModal={onOpenModal} setIsSignup={setIsSignup} />}

                <div className="app-header-aside">
                    <Link to="/"><h3 className={`logo ${pathname === '/' && 'home-page-link'}`}>finderr<span>.</span></h3></Link>
                    {pathname !== '/' && <Search onSetFilter={onSetFilter} />}
                </div>
                <div className="app-header-main">
                    {(windowSize > 900) && <Link to="/gig"
                        onClick={() => {
                            console.log('ITS ME');
                            onSetFilter(gigService.getDefaultFilter())
                        }}>Explore</Link>}
                    {/* <Link to="gig">Become a seller</Link> */}
                    {user &&
                        <>
                            {/* <button className="user-link fa-regular bell" title="Notifications"></button> */}
                            {/* <button className="user-link fa-regular envelope" title="Messages"></button> */}
                            {/* <Link className="user-link fa-regular heart" title="Lists"></Link> */}
                            {(windowSize > 900) && <div className="user-orders">
                                <button onClick={handleOrder} className="user-link">Orders</button>
                                {isOrder && <UserBuyTable />}
                            </div>}
                            {(windowSize > 900) && <div className="user-header-img">
                                <img src={user.imgUrl}
                                    onClick={() => {
                                        setIsOrder(false)
                                        setIsDropdown(!isDropdown)
                                    }} />
                                {isDropdown && <Dropdown loginUser={loginUser} onLogout={onLogout} setIsDropdown={setIsDropdown} user={user} />}
                            </div>}
                        </>
                    }
                    {!user &&
                        <>
                            {isModal && <ModalLogin onLogin={onLogin} onSignup={onSignup}
                                onCloseModal={onCloseModal} setIsSignup={setIsSignup} isSignup={isSignup} />}
                            {(windowSize > 900) && <Link onClick={() => { onOpenModal(); setIsSignup(false) }}>Sign in</Link>}
                            {(windowSize > 900) && <button className={`join-btn ${pathname === '/' && 'home-page-btn'}`}
                                onClick={() => { onOpenModal(); setIsSignup(true) }}>Join</button>}
                        </>
                    }
                </div>
            </nav>
        </section>
        {pathname !== '/' && <>
            <div className="main-app-header full"></div>
            <CategoryMenu onSetFilter={onSetFilter} />
            <div className="main-app-header full"></div>
        </>
        }
    </>
}
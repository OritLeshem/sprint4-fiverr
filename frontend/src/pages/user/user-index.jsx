import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../../store/gig/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { gigService } from '../../services/gig.service.js'
import { UserList } from '../../cmps/user/user-list.jsx'
import { SET_FILTER } from '../../store/gig/gig.reducer'
import { SET_WATCHED_USER } from '../../store/user/user.reducer'
import { Search } from '../../cmps/app-header/header-search.jsx'
import { TopFilterBar } from '../../cmps/gig/top-filter-bar.jsx'
import { UserProfile } from '../../cmps/user/user-dashboard/user-profile'
import { userService } from '../../services/user.service.js'
import { UserSales } from '../../cmps/user/user-dashboard/user-sales.jsx'
import { loadUser } from '../../store/user/user.actions.js'

export function UserIndex() {
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const { userId } = useParams()
    const dispatch = useDispatch()
    // const [searchParams, setSearchParams] = useSearchParams()
    const loginUser = userService.getLoggedinUser()
    console.log('user index', user)

    useEffect(() => {
        // if (searchParams.get('category') || searchParams.get('title')) renderUiByQueryStringParams()
        loadUser(userId)
        loadGigs(filterBy, sortBy, userId)
        console.log(gigs)
    }, [filterBy, userId])






    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.vendor = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    async function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    // function onAddToCart(gig){
    //     console.log(`Adding ${gig.title} to Cart`)
    //     addToCart(gig)
    //     showSuccessMsg('Added to Cart')
    // }

    function onAddGigMsg(gig) {
        console.log(`TODO Adding msg to gig`)
    }

    return (
        <section className="user-index">

            <div className="user-index-info">  <UserProfile /></div>
            <main className="user-index-main-container">
                <UserSales />
                <Link className="user-index-add-link" to="/gig/edit">Add Gig +</Link>
                <div className="user-index-gig-list">
                    <UserList gigs={gigs} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} />
                </div>
            </main>



        </section>
    )
}
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { loadGigs, removeGig } from '../../store/gig/gig.actions.js'
import { loadOrders } from '../../store/order/order.actions.js'
import {SET_GIGS } from '../../store/gig/gig.reducer'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { UserList } from '../../cmps/user/user-list.jsx'
import { UserProfile } from '../../cmps/user/user-dashboard/user-profile'
import { userService } from '../../services/user.service.js'
import { loadUser } from '../../store/user/user.actions.js'
import { ReviewList } from '../../cmps/review/review-list.jsx'
import { ReviewBar } from '../../cmps/review/review-bar.jsx'
import UserSellerTable from '../../cmps/user/user-dashboard/user-seller-table.jsx'

export function UserIndex() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const { userId } = useParams()
    const loginUser = userService.getLoggedinUser()
    console.log(gigs);
    const dispatch = useDispatch()

    useEffect(() => {
        return (() => {
            dispatch({ type: SET_GIGS, gigs: [] })
        })
    }, [])

    useEffect(() => {
        userId && loadUser(userId)
        loadOrders()
        loadGigs(filterBy, sortBy, userId)
    }, [filterBy, userId])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }
    console.log("User from index", user, loginUser)
    if (!user) return <div className="loader-contauner">
    <div className="loader"></div>
</div>
    return (
        <section className="user-index">
            <aside className="user-info">
                <UserProfile user={user} />
                <div className="user-review-bar">{user && loginUser && user.reviews && <ReviewBar userReviews={user.reviews} />}</div>
                {loginUser && user.reviews && <ReviewList userReviews={user.reviews} />}
            </aside>
            <main className="user-main">
                {orders.filter(order => order.seller._id === user._id).length !== 0 && loginUser && (loginUser._id === user._id) && <UserSellerTable
                    orders={orders.filter(order => order.seller._id === user._id)} length={120} />}
                {user && gigs && <UserList gigs={gigs.filter(gig => gig.owner._id === userId)} onRemoveGig={onRemoveGig} user={user} />}
            </main>
        </section>
    )
}
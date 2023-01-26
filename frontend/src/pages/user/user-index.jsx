import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { loadGigs, removeGig } from '../../store/gig/gig.actions.js'
import { loadOrders } from '../../store/order/order.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { UserList } from '../../cmps/user/user-list.jsx'
import { UserProfile } from '../../cmps/user/user-dashboard/user-profile'
import { userService } from '../../services/user.service.js'
import { UserSales } from '../../cmps/user/user-dashboard/user-sales.jsx'
import { loadUser } from '../../store/user/user.actions.js'
import { ReviewList } from '../../cmps/review/review-list.jsx'
import { ReviewBar } from '../../cmps/review/review-bar.jsx'

export function UserIndex() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const { userId } = useParams()
    const loginUser = userService.getLoggedinUser()

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

    return (
        <section className="user-index">
            <div className="user-index-info">
                <UserProfile user={user} />
                {/* <div className="user-index-info-review-bar">{user && loginUser && <ReviewBar userReviews={user.reviews} />}</div> */}
                {/* {user && loginUser && <ReviewList userReviews={user.reviews} />} */}
            </div>
            <main className="user-index-main-container">
                {orders.length !== 0 && user && loginUser && (loginUser._id === user._id) && <UserSales orders={orders} />}
                {user && loginUser && (loginUser._id === user._id) && <Link className="user-index-add-link" to="/gig/edit">Add Gig +</Link>}
                <div className="user-index-gig-list">
                    <UserList gigs={gigs} onRemoveGig={onRemoveGig} user={user} />
                </div>
            </main>
        </section>
    )
}
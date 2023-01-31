import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadGigs, removeGig } from '../../store/gig/gig.actions'
import { loadOrders } from '../../store/order/order.actions'
import { SET_GIGS } from '../../store/gig/gig.reducer'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'
import { UserList } from '../../cmps/user/user-list'
import { UserProfile } from '../../cmps/user/user-dashboard/user-profile'
import { userService } from '../../services/user.service'
import { loadWatchedUser } from '../../store/user/user.actions'
import { ReviewList } from '../../cmps/review/review-list'
import { ReviewBar } from '../../cmps/review/review-bar'
import UserSellerTable from '../../cmps/user/user-dashboard/user-seller-table'

export function UserIndex() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const watchedUser = useSelector(storeState => storeState.userModule.watchedUser)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const { userId } = useParams()
    const loginUser = userService.getLoggedinUser()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     return (() => {
    //         dispatch({ type: SET_GIGS, gigs: [] })
    //     })
    // }, [])

    useEffect(() => {
        userId && loadWatchedUser(userId)
        console.log(userId)
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

    if (!userId) return <div className="loader-container">
        <div className="loader"></div>
    </div>
    return (
        <section className="user-index">
            <aside className="user-info">
                <UserProfile watchedUser={watchedUser} />
                <div className="user-review-bar">{watchedUser && watchedUser.reviews && <ReviewBar userReviews={watchedUser.reviews} />}</div>
                {watchedUser && watchedUser.reviews && <ReviewList userReviews={watchedUser.reviews} />}
            </aside>
            <main className="user-main">
                {loginUser?._id === userId && orders.filter(order => order.seller._id === loginUser._id).length !== 0 && loginUser && <UserSellerTable
                    orders={orders.filter(order => order.seller._id === loginUser._id)} length={120} />}
                {watchedUser && gigs && <UserList gigs={gigs.filter(gig => gig.owner._id === userId)} onRemoveGig={onRemoveGig} user={watchedUser} />}
            </main>
        </section>
    )
}
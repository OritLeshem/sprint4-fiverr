import { gigService } from "../../services/gig.service.js";
import { userService } from "../../services/user.service.js";
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_ORDER, SET_ORDERS } from "./order.reducer.js";
import { orderService } from "../../services/order.service.js";
// import { ADD_GIG, ADD_TO_CART, CLEAR_CART, REMOVE_GIG, REMOVE_FROM_CART, SET_GIGS, UNDO_REMOVE_GIG, UPDATE_GIG } from "./gig.reducer.js";
// import { SET_SCORE } from "../user/user.reducer.js";

// Action Creators:
// export function getActionRemoveGig(gigId) {
//     return {
//         type: REMOVE_GIG,
//         gigId
//     }
// }
export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
// export function getActionUpdateGig(gig) {
//     return {
//         type: UPDATE_GIG,
//         gig
//     }
// }

export async function loadOrders(userId) {
    try {
        const orders = await orderService.query(userId)
        // console.log('Gigs from DB:', gigs)
        // console.log('filterby action gig:', filterBy)

        store.dispatch({
            type: SET_ORDERS,
            orders
        })

    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }

}

// export async function removeGig(gigId) {
//     try {
//         await gigService.remove(gigId)
//         store.dispatch(getActionRemoveGig(gigId))
//     } catch (err) {
//         console.log('Cannot remove gig', err)
//         throw err
//     }
// }

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        console.log('Added order', savedOrder)
        store.dispatch(getActionAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

// export function updateGig(gig) {
//     return gigService.save(gig)
//         .then(savedGig => {
//             console.log('Updated Gig:', savedGig)
//             store.dispatch(getActionUpdateGig(savedGig))
//             return savedGig
//         })
//         .catch(err => {
//             console.log('Cannot save gig', err)
//             throw err
//         })
// }

// export function addToCart(gig) {
//     store.dispatch({
//         type: ADD_TO_CART,
//         gig
//     })
// }

// export function removeFromCart(gigId) {
//     store.dispatch({
//         type: REMOVE_FROM_CART,
//         gigId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_CART })
//         return score
//     } catch (err) {
//         console.log('GigActions: err in checkout', err)
//         throw err
//     }
// }


// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveGigOptimistic(gigId) {
//     store.dispatch({
//         type: REMOVE_GIG,
//         gigId
//     })
//     showSuccessMsg('Gig removed')

//     gigService.remove(gigId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove gig')
//             console.log('Cannot load gigs', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_GIG,
//             })
//         })
// }

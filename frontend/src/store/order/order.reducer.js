import { gigService } from "../../services/gig.service"

export const SET_ORDERS = 'SET_ORDERS'
// export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
// export const ADD_TO_CART = 'ADD_TO_CART'
// export const CLEAR_CART = 'CLEAR_CART'
// export const UNDO_REMOVE_GIG = 'UNDO_REMOVE_GIG'
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// export const SET_FILTER = 'SET_FILTER'


const initialState = {
    // gigs: [],
    // cart: [],
    // lastRemovedGig: null,
    // filterBy: gigService.getDefaultFilter(),
    orders: []

}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    // var gigs
    // var cart
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        // case REMOVE_GIG:
        //     const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
        //     gigs = state.gigs.filter(gig => gig._id !== action.gigId)
        //     newState = { ...state, gigs, lastRemovedGig }
        //     break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        // case ADD_TO_CART:
        //     newState = { ...state, cart: [...state.cart, action.gig] }
        //     break
        // case REMOVE_FROM_CART:
        //     cart = state.cart.filter(gig => gig._id !== action.gigId)
        //     newState = { ...state, cart }
        //     break
        // case CLEAR_CART:
        //     newState = { ...state, cart: [] }
        //     break
        // case UNDO_REMOVE_GIG:
        //     if (state.lastRemovedGig) {
        //         newState = { ...state, gigs: [...state.gigs, state.lastRemovedGig], lastRemovedGig: null }
        //     }
        //     break
        // case SET_FILTER:
        //     return { ...state, filterBy: action.filterBy }
        default:
    }
    return newState
}

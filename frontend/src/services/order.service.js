import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    // getById,
    save,
    // remove,
    // getEmptyOrder,
    // getOrderFirstSlides,
    // getOrderLastSlides,
    // getOrderSelling
}

async function query(userId) {
    // var orders = await storageService.query(STORAGE_KEY)
    // if (userId) orders = orders.filter(order => order.seller._id === userId || order.buyer._id === userId)
    return httpService.get('order', { params: userId })

    // return orders
}

// function getById(orderId) {
//     // return storageService.get(STORAGE_KEY, orderId)
//     return httpService.get(`order/${orderId}`)
// }

// async function remove(orderId) {
//     // throw new Error('Nope')
//     await storageService.remove(STORAGE_KEY, orderId)
// }

// async function save(order) {
//     var savedOrder
//     if (order._id) {
//         savedOrder = await storageService.put(STORAGE_KEY, order)
//     } else {
//         // Later, owner is set by the backend
//         // order.seller = userService.getLoggedinUser()
//         savedOrder = await storageService.post(STORAGE_KEY, order)
//     }
//     return savedOrder
// }
async function save(order) {
    var savedOrder
    if (order._id) {
        // savedGig = await storageService.put(STORAGE_KEY, gig)
        savedOrder = await httpService.put(`order/${order._id}`, order)

    } else {
        // Later, owner is set by the backend
        // gig.owner = userService.getLoggedinUser()
        // savedGig = await storageService.post(STORAGE_KEY, gig)
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}




// function getEmptyOrder(title = '', description = '', price = 0, tags = [], daysToMake = '', imgUrl = []) {
//     return {
//         _id: '',
//         title,
//         description,
//         price,
//         tags,
//         daysToMake,
//         imgUrl,
//     }
// }

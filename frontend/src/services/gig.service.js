
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gig'
_createGigs()

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    getDefaultFilter
    // addGigMsg
}

window.cs = gigService
function getDefaultFilter() {
    return { title: '' }
}

async function query(filterBy = { title: '' }) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    // if (filterBy.price) {
    //     gigs = gigs.filter(gig => gig.price <= filterBy.price)
    // }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

// async function addGigMsg(gigId, txt) {
//     // Later, this is all done by the backend
//     const gig = await getById(gigId)
//     if (!gig.msgs) gig.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     gig.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, gig)

//     return msg
// }

function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs = []
        gigs.unshift(_createGig('I wiil design an outstanding logo', 53))
        gigs.unshift(_createGig('I will do 3 modern minimalist logo design', 67))
        gigs.unshift(_createGig('I will do 3 modern minimalist logo design', 94))
        gigs.unshift(_createGig('I will provide automated travel affiliate websites for passive income', 53))
        utilService.saveToStorage(STORAGE_KEY, gigs)
    }
}

function _createGig(title, price, imgUrl) {
    const gig = getEmptyGig(title, price, imgUrl)
    gig._id = utilService.makeId()
    return gig
}

function getEmptyGig(title = '', price = 0, imgUrl = '../assets/img/demo.jpg') {
    return {
        _id: '',
        title,
        price,
        imgUrl,
    }
}









// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





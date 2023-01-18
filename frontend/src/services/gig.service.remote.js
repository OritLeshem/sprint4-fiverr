
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(gigId) {
    // return storageService.get(STORAGE_KEY, gigId)
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    // await storageService.remove(STORAGE_KEY, gigId)
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        // savedGig = await storageService.put(STORAGE_KEY, gig)
        savedGig = await httpService.put(`gig/${gig._id}`, gig)

    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        // savedGig = await storageService.post(STORAGE_KEY, gig)
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, {txt})
    return savedMsg
}


function getEmptyGig() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}






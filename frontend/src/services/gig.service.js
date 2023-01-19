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
    return { title: '', tags: [], daysToMake: '', minPrice:'', maxPrice:'' }
}

async function query(filterBy = { title: '', tags: [], daysToMake: '' }) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    // if (filterBy.price) {
    //     gigs = gigs.filter(gig => gig.price <= filterBy.price)
    // }
    if (filterBy.tags?.length) {
        gigs = gigs.filter(gig => gig.tags.some(tag => filterBy.tags.includes(tag)))
    }
    if (filterBy.daysToMake) {
        gigs = gigs.filter(gig => gig.daysToMake <= filterBy.daysToMake)
    }
    if (filterBy.minPrice) {
        gigs = gigs.filter(gig => gig.price >= filterBy.minPrice)
    }
    if (filterBy.maxPrice) {
        gigs = gigs.filter(gig => gig.price <= filterBy.maxPrice)
    }
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
        gigs = [

            {
                _id: 'i102',
                title: "I will provide automated social websites for passive income",

                price: 12,
                owner: {
                    _id: "u102",
                    fullname: "Dudu Sa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123020_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/01/30/18/28/lines-6981892_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123019_960_720.jpg"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i103',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u103",
                    fullname: "Ssudu Dda",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2023/01/10/10/33/path-7709452_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/08/01/18/35/ocean-7358753_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2023/01/05/08/17/bird-7698384_960_720.jpg"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i104',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u104",
                    fullname: "Puki Dfa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/11/15/04/54/automotive-7593064_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/12/17/19/04/house-7662218_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/05/30/08/57/flowers-7230812_960_720.jpg"
                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i105',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u105",
                    fullname: "Jo Bara",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758313_960_720.png",
                    "https://cdn.pixabay.com/photo/2015/08/04/19/21/happy-birthday-875122_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758314_960_720.png"
                ],
                tags: [
                    "writing-translation",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i106',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u106",
                    fullname: "Bobo Basa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2020/02/08/00/32/icon-4828765_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/12/05/05/20/cat-7635983_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/12/03/15/14/christmas-7632906_960_720.jpg"
                ],
                tags: [
                    "music-audio",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i107',
                title: "I will provide automated social websites for passive income",

                price: 12,
                owner: {
                    _id: "u107",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385224_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/09/10/18/23/print-7445476_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385225_960_720.jpg"
                ],
                tags: [
                    "lifestyle",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i108',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u108",
                    fullname: "Mumu Asa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2019/12/18/18/03/angel-4704518_960_720.png",
                    "https://cdn.pixabay.com/photo/2021/11/18/21/57/christmas-6807486_960_720.jpg"
                ],
                tags: [
                    "lifestyle",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },

            {
                _id: 'i109',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u109",
                    fullname: "Quti Vvfa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2016/04/01/09/24/automobile-1299344_960_720.png",
                    "https://cdn.pixabay.com/photo/2013/07/12/19/31/cadillac-154920_960_720.png",
                    "https://cdn.pixabay.com/photo/2012/04/11/18/28/car-29281_960_720.png"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i110',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u110",
                    fullname: "Nura Kersa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2021/02/08/12/48/camera-5994642_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/09/14/22/12/camera-7455311_960_720.png",
                    "https://cdn.pixabay.com/photo/2019/03/30/20/27/camera-4091991_960_720.png"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i111',
                title: "I will provide automated social websites for passive income",
                price: 12,
                owner: {
                    _id: "u111",
                    fullname: "Bobo Basa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/06/18/16/55/cute-7270285_960_720.png",
                    "https://cdn.pixabay.com/photo/2021/01/19/02/37/cat-5929889_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/05/13/12/44/room-7193628_960_720.png"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            }
        ]
        // gigs.unshift(_createGig('I wiil design an outstanding logo', 53, ["design", "graphic-design"]))
        // gigs.unshift(_createGig('I will do 3 modern minimalist logo design', 67, ["design"]))
        // gigs.unshift(_createGig('I will do 3 modern minimalist logo design', 94, ["digital-marketing"]))
        utilService.saveToStorage(STORAGE_KEY, gigs)
    }
}

function _createGig(title, price, tags, imgUrl) {
    const gig = getEmptyGig(title, price, tags, imgUrl)
    gig._id = utilService.makeId()
    return gig
}

function getEmptyGig(title = '', price = 0, tags = [], imgUrl = '../assets/img/demo.jpg') {
    return {
        _id: '',
        title,
        price,
        tags,
        imgUrl,
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





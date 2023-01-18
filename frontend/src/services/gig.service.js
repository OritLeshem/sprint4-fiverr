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
    return { title: '', tags: [], daysToMake: '' }
}

async function query(filterBy = { title: '', tags:[], daysToMake:'' }) {
    console.log(filterBy);
    var gigs = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    // if (filterBy.price) {
    //     gigs = gigs.filter(gig => gig.price <= filterBy.price)
    // }
    if (filterBy.tags.length) {
        gigs = gigs.filter(gig => gig.tags.some(tag => filterBy.tags.includes(tag)))
    }
    if (filterBy.daysToMake) {
        gigs = gigs.filter(gig => gig.daysToMake <= filterBy.daysToMake)
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
                _id: "i101",
                title: "I will design your logo",
                price: 12,
                owner: {
                    _id: "u101",
                    fullname: "Dudu Da",
                    imgUrl: '',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Make unique logo...",
                imgUrl: ['../assets/img/demo.jpg',
                    '../assets/img/1.jpg',
                    '../assets/img/2.jpg',
                    '../assets/img/3.jpg'],
                tags: [
                    "logo-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i102',
                title: "I will provide automated social websites for passive income",

                price: 12,
                owner: {
                    _id: "u102",
                    fullname: "Dudu Sa",
                    imgUrl: '',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2015/06/01/09/05/pinterest-793051_960_720.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/1094285/original/0149d53275d914f681e8685b9e6c263dcc4309ab/design-2-outstanding-logo.png",
                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20211214/logo-04_nxxckf.jpg"
                ],
                tags: [
                    "logo-design",
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
                    imgUrl: '',
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
                    "logo-design",
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
                    imgUrl: '',
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
                    "logo-design",
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
                    fullname: "Mumu Asa",
                    imgUrl: '',
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
                    "logo-design",
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
                    imgUrl: '',
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
                    "logo-design",
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





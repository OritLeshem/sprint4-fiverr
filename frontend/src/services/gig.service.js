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
    getDefaultFilter,
    getGigFirstSlides,
    getGigLastSlides
    // addGigMsg
}

window.cs = gigService
function getDefaultFilter() {
    return { title: '', tags: [], daysToMake: '', minPrice: '', maxPrice: '' }
}

async function query(filterBy = { title: '', tags: [], daysToMake: '' }, userId) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (userId) gigs = gigs.filter(gig => gig.owner._id === userId)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (filterBy.tags?.length) {
        gigs = gigs.filter(gig => gig.tags.some(tag => filterBy.tags.includes(tag)))
    }
    if (filterBy.daysToMake) {
        console.log(filterBy.daysToMake);
        gigs = gigs.filter(gig => +gig.daysToMake <= +filterBy.daysToMake)
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

function getGigFirstSlides() {
    return [
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
            desc: 'Build your brand',
            category: 'Logo Design'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png',
            desc: 'Customize your site',
            category: 'WordPress'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png',
            desc: 'hare your message',
            category: 'Voice Over'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png',
            desc: 'Engage your audience',
            category: 'Video Explainer'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png',
            desc: 'Reach more customers',
            category: 'Social Media'
        }
    ]
}

function getGigLastSlides() {
    return [
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png',
            desc: 'Unlock growth online',
            category: 'SEO'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png',
            desc: 'Color your dreams',
            category: 'Illustration'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png',
            desc: 'Go global',
            category: 'Translation'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png',
            desc: 'Learn your business',
            category: 'Data Entry'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png',
            desc: 'Showcase your story',
            category: 'Book Covers'
        }
    ]

}

function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs = [

            {
                _id: 'i102',
                title: "I will provide a great logo for you",

                price: 15,
                owner: {
                    _id: "u102",
                    fullname: "Dudu Sa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 5
                },
                daysToMake: 2,
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
                title: "I will do elegant professional business logo design services",
                price: 12,
                owner: {
                    _id: "u102",
                    fullname: "Dudu Sa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 5
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
                title: "I will do 3 modern minimalist logo design",
                price: 18,
                owner: {
                    _id: "u102",
                    fullname: "Dudu Sa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 5
                },
                daysToMake: 1,
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
                title: "I will make 6 figure shopify dropshipping store or shopify website",
                price: 10,
                owner: {
                    _id: "u105",
                    fullname: "Jo Bara",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 5
                },
                daysToMake: 4,
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
                title: "I will mix and master your music, experienced professional engineer",
                price: 20,
                owner: {
                    _id: "u106",
                    fullname: "Bobo Basa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 1
                },
                daysToMake: 5,
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
                title: "I will create an animated marketing video for business and sales",

                price: 8,
                owner: {
                    _id: "u107",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 2
                },
                daysToMake: 2,
                description: "I will be your female singer songwriter in english and in french.",
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
                title: "I will design your printed circuit board pcb, ready for manufacturing",
                price: 5,
                owner: {
                    _id: "u108",
                    fullname: "Mumu Asa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 3
                },
                daysToMake: 2,
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
                title: "I will create a stunning commercial brand video",
                price: 25,
                owner: {
                    _id: "u109",
                    fullname: "Quti Vvfa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 7,
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
                _id: 'i130',
                title: "I will translate english to german or translate german to english professionally",
                price: 30,
                owner: {
                    _id: "u130",
                    fullname: "Nura Kersa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 1
                },
                daysToMake: 6,
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
                title: "I will write SEO health, nutrition and fitness articles blog posts",
                price: 17,
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
            }, {
                _id: 'i112',
                title: "I will provide automated social websites for passive income",

                price: 15,
                owner: {
                    _id: "u112",
                    fullname: "Dudu Sa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 5
                },
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/01/30/18/28/lines-6981892_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123020_960_720.jpg",
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
                _id: 'i113',
                title: "I will do elegant professional business logo design services",
                price: 12,
                owner: {
                    _id: "u113",
                    fullname: "Ssudu Dda",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2022/08/01/18/35/ocean-7358753_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2023/01/05/08/17/bird-7698384_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2023/01/10/10/33/path-7709452_960_720.png",
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
                _id: 'i114',
                title: "I will do 3 modern minimalist logo design",
                price: 18,
                owner: {
                    _id: "u114",
                    fullname: "Puki Dfa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 2
                },
                daysToMake: 1,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2022/12/17/19/04/house-7662218_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/05/30/08/57/flowers-7230812_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/11/15/04/54/automotive-7593064_960_720.jpg"
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
                _id: 'i115',
                title: "I will make 6 figure shopify dropshipping store or shopify website",
                price: 10,
                owner: {
                    _id: "u115",
                    fullname: "Jo Bara",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 5
                },
                daysToMake: 4,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2015/08/04/19/21/happy-birthday-875122_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758314_960_720.png",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758313_960_720.png",
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
                _id: 'i116',
                title: "I will mix and master your music, experienced professional engineer",
                price: 20,
                owner: {
                    _id: "u116",
                    fullname: "Bobo Basa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 1
                },
                daysToMake: 5,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2022/12/05/05/20/cat-7635983_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/12/03/15/14/christmas-7632906_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2020/02/08/00/32/icon-4828765_960_720.jpg",
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
                _id: 'i117',
                title: "I will create an animated marketing video for business and sales",

                price: 8,
                owner: {
                    _id: "u117",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 2
                },
                daysToMake: 2,
                description: "I will be your female singer songwriter in english and in french.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385225_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/09/10/18/23/print-7445476_960_720.png",

                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385224_960_720.jpg"
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
                _id: 'i118',
                title: "I will design your printed circuit board pcb, ready for manufacturing",
                price: 5,
                owner: {
                    _id: "u118",
                    fullname: "Mumu Asa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 3
                },
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2019/12/18/18/03/angel-4704518_960_720.png",
                    "https://cdn.pixabay.com/photo/2021/11/18/21/57/christmas-6807486_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_960_720.jpg"
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
                _id: 'i119',
                title: "I will create a stunning commercial brand video",
                price: 25,
                owner: {
                    _id: "u119",
                    fullname: "Quti Vvfa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 7,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2013/07/12/19/31/cadillac-154920_960_720.png",
                    "https://cdn.pixabay.com/photo/2012/04/11/18/28/car-29281_960_720.png",
                    "https://cdn.pixabay.com/photo/2016/04/01/09/24/automobile-1299344_960_720.png"
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
                _id: 'i120',
                title: "I will translate english to german or translate german to english professionally",
                price: 30,
                owner: {
                    _id: "u120",
                    fullname: "Nura Kersa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 1
                },
                daysToMake: 6,
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
                _id: 'i121',
                title: "I will write SEO health, nutrition and fitness articles blog posts",
                price: 17,
                owner: {
                    _id: "u121",
                    fullname: "Bobo Basa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png',
                    level: "basic/premium",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2021/01/19/02/37/cat-5929889_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/06/18/16/55/cute-7270285_960_720.png",

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

function getEmptyGig(title = '',description='', price = 0, tags = [],daysToMake='', imgUrl = ['https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png']) {
    return {
        _id: '',
        title,
        description,
        price,
        tags,
        daysToMake,
        imgUrl,
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





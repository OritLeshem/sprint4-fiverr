
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
    // addGigMsg,
    getDefaultFilter,
    getDefaultSort,
    getGigSelling,
    getGigSlides

}
window.cs = gigService
function getDefaultFilter() {
    return { title: '', tags: [], daysToMake: '', minPrice: '', maxPrice: '' }
}
function getDefaultSort() {
    return { category: 'recommended' }
}

async function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    console.log("filterby service front", filterBy)
    // return httpService.get(STORAGE_KEY, filterBy)
    return httpService.get('gig', { params: { filterBy, sortBy } })
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
    console.log(gig);
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

// async function addGigMsg(gigId, txt) {
//     const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
//     return savedMsg
// }





function getGigSlides() {
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
        },
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

function getGigSelling() {
    return [
        {
            title: 'The best for every budget',
            desc: 'Find high-quality services at every price point. No hourly rates, just project-based pricing.'
        },
        {
            title: 'Quality work done quickly',
            desc: 'Find the right freelancer to begin working on your project within minutes.'
        },
        {
            title: 'Protected payments, every time',
            desc: 'Always know what you\'ll pay upfront. Your payment isn\'t released until you approve the work.'
        },
        {
            title: '24/7 support',
            desc: 'Questions? Our round-the-clock support team is available to help anytime, anywhere.'
        }
    ]
}
function getEmptyGig(
    title = '',
    description = '',
    price = 5,
    tags = [],
    daysToMake = 1,
    imgUrl = [],
    about = "I have many hobbies :) I love creativity and enjoy helping others.",
) {
    return {

        title,
        description,
        price,
        tags,
        daysToMake,
        imgUrl,
        about,
    }
}


// {
//     "title": "I will design and create a full tech pack for bags, handbags, purses, and backpacks",
//     "about": "I have many hobbies :) I love creativity and enjoy helping others.",
//     "price": 30,
//     "owner": {
//         "_id": {"$oid":"63d24094783371eb434731d7"},
//         "fullname": "ras567",
//         "country": "United Kingdom",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/profile/photos/2799071/original/1444726053447_Profile.png",
//         "level": "Level 2 seller",
//         "rate": 4.9
//     },
//     "daysToMake": 2,
//     "description": "If you have a design, you'll need to send your supplier a full technical spec to get the sample made. Every supplier requires a Tech Pack before they'll work with you. We can take your sketch or concept and turn it into a full spec with different CAD angles of your design, all the dimensions your supplier will need.",
//     "imgUrl": [
//         "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/287605807/original/9817211fc24da51ad82c0347e675ada6843c6770/design-and-create-a-full-tech-pack-for-bags-purses-and-backpacks.jpg",
//         "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/287605807/original/c3f0e44ed31d35b13357e4a8ca889aa3a21b3751/design-and-create-a-full-tech-pack-for-bags-purses-and-backpacks.jpg",
//         "https://fiverr-res.cloudinary.com/images/t_smartwm/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/attachments/delivery/asset/b00c965e83c6033f312dd156e9ca0b33-1673892676/CE_01/design-and-create-a-full-tech-pack-for-bags-purses-and-backpacks.pdf"
//     ],
//     "tags": [
//         "lifestyle"
//     ]
// }Ï


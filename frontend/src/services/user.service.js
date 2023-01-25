import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user'
_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    getUserReviews
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

async function getUserReviews(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user.reviews
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // console.log(_id, imgUrl)
    // const user = await storageService.get('user', _id)
    // user.imgUrl = user.imgUrl
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()




function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [
            {
                _id: "o101", // need to ce change
                fullname: "loftydesignshop",
                username: "loftydesignshop",
                password: "secret",
                country: "India",
                imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d93001bdcba7f9235745299f61850b71-1657200241990/24f7d64e-5d25-41b3-8175-c79ea47e35d1.jpg",
                level: "basic/premium",
                rate: 4.8,
                reviews: [
                    {
                        id: utilService.makeId(),
                        txt: "Overall we were able to get what we wanted. We did have small revisions that took a very long time from the norm, 24-48 hours although the seller was online. I would say the communication feels like a scripted template and could use improvement and long wait times but overall she did as we asked and got it done.",
                        rate: 3.3,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u200", // need to ce change
                            country: "United States",
                            flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                            fullname: "codyjulia",
                            imgUrl: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/e0c2663b90e40a8db952c0668455974a-35406431646969293.8527179/3B47096A-1066-4BB6-905B-32CD8C2E3C31",
                        }
                    },
                    {
                        id: utilService.makeId(),
                        txt: "This girl provided me with clean, neat and fast work, in addition to being polite and friendly. She took into account my personal requirements without producing anything generic, and adapting to the situation. it served me a lot directly after ordering, and now I hope it will help me in the long run. I recommend these services to anyone who wants to get a beautiful logo, fast and safe ! Thank you, Arthur.",
                        rate: 5,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u201", // need to ce change
                            country: "France",
                            flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png",
                            fullname: "arthurphm",
                            imgUrl: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/8e78f51d4c356ca71706f0e0de28273f-1668442053267/be129694-eaad-4906-9c45-4659094b088a.jpg",
                        }
                    },
                    {
                        id: utilService.makeId(),
                        txt: "Seller did an excellent job with understanding what I wanted as far as the style and design. There were things I wanted fixed or changed after the first delivery, and she executed it exactly to how I wanted it. Response times were quick, and received everything faster than I expected. I have had issues with other designers not listening to specific details I have written — not the case here. I really felt like she cared to deliver the exact design I wanted, and asked further questions to make sure she understood exactly what I was saying. I'm so happy with the outcome! ",
                        rate: 5,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u202", // need to ce change
                            country: "United Kingdom",
                            flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                            fullname: "frankriver54",
                            imgUrl: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/cf4ee9d83cd1c245af2ab2d4c1c11868-707365051637688052421/JPEG_20211123_092048_1475981208079376864.jpg",
                        }
                    },
                    {
                        id: utilService.makeId(),
                        txt: "Fine! Very pleased with the work. I ordered a logo for a charitable foundation in Ukraine. I really like the result, I recommend this designer, she is really a master of her craft.",
                        rate: 4,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u203", // need to ce change
                            country: "Ukraine",
                            flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1e6.png",
                            fullname: "eduardkoshilko",
                            imgUrl: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b8655eea9a4abe7c1e5e9a02e9dd4600-1666967537633/aed03d25-9936-4bec-8fe1-13310365b831.jpg",
                        }
                    }
                ]
            },
            {
                _id: "u102",
                fullname: "Dudu Sa",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                username: "user2",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 4,
                        by: {
                            _id: "u103",
                            fullname: "user3",
                            imgUrl: "https://cdn.pixabay.com/photo/2021/07/01/02/01/avatar-6377965_960_720.png"
                        }
                    }
                ],
            },
            {
                _id: "u105",
                fullname: "Jo Bara",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_960_720.jpg',
                username: "user5",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 4,
                        by: {
                            _id: "u104",
                            fullname: "elensky",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u106",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg',
                username: "user6",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 4,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u107",
                fullname: "Zozo Ta",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                username: "user7",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: utilService.makeId(),
                        gig: "{optional-mini-gig}",
                        txt: "I like that the seller was very responsive. However, I was expecting more of a creative/artistic experience, whereas, I feel that stock images were used and slightly modified to create a logo. However, due to the price point, I also understand there can only be so much time put into this.",
                        rate: 3.3,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u145",
                            country: "United States",
                            flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                            fullname: "lauraschirer",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    },
                    {
                        id: utilService.makeId(),
                        gig: "{optional-mini-gig}",
                        txt: 'For the most part, I\'m satisfied. The logo turned out well, but the social media kit was pretty useless. I think I chose a seller that was a little "too busy" for my taste. I\'ll pay more next time, so I can get a little more devotion to the job.',
                        rate: 3.7,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u146",
                            country: "Denmark",
                            fullname: "jespergenopfind",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg',
                        }
                    },
                    {
                        id: utilService.makeId(),
                        gig: "{optional-mini-gig}",
                        txt: 'Amazing work! The logoflow did everything I asked, and worked with me and my detail oriented-indecisive self through every step of the way. This is a high-touch service, and a high-touch seller. I feel like I\'ve been taken care of beyond what I could have thought, and I am so very happy with what I got. So many thanks, and honestly I look forward to working with logoflow again! Highly recommend!',
                        rate: 5,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u147",
                            country: "Thailand",
                            fullname: "zedisindeeddead",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092_960_720.jpg',
                        }
                    },
                ],
            },
            {
                _id: "u108",
                fullname: "Mumu Asa",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg',
                username: "user8",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 4,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u109",
                fullname: "Quti Vvfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/03/12/20/57/woman-3220835_960_720.jpg',
                username: "user8",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 4,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u130",
                fullname: "Nura Kersa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/03/12/20/57/woman-3220835_960_720.jpg',
                username: "user130",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 1,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u111",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092_960_720.jpg',
                username: "user130",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 2,
                        by: {
                            _id: "u130",
                            fullname: "Nura Kersa",

                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u112",
                fullname: "Dudu Sa",
                imgUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg',
                username: "user112",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 5,
                        by: {
                            _id: "u130",
                            fullname: "Nura Kersa",

                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u113",
                fullname: "Ssudu Dda",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                username: "user113",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 5,
                        by: {
                            _id: "u130",
                            fullname: "Nura Kersa",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u114",
                fullname: "Puki Dfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
                username: "user114",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 2,
                        by: {
                            _id: "u113",
                            fullname: "Ssudu Dda",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u114",
                fullname: "Puki Dfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
                username: "user114",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 2,
                        by: {
                            _id: "u113",
                            fullname: "Ssudu Dda",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u115",
                fullname: "Jo Bara",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                username: "user115",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 5,
                        by: {
                            _id: "u113",
                            fullname: "Ssudu Dda",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u116",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
                username: "user116",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 5,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u117",
                fullname: "Zozo Ta",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
                username: "user117",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 2,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u118",
                fullname: "Mumu Asa",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg',
                username: "user117",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 3,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u119",
                fullname: "Quti Vvfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_960_720.jpg',
                username: "user119",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 4,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u120",
                fullname: "Nura Kersa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg',
                username: "user120",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 1,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u121",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg',
                username: "user121",
                password: "secret",
                level: "basic/premium",
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: "Very kind and works fast",
                        rate: 1,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, users)
    }

}

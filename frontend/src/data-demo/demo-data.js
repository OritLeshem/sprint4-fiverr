const gigs = [
    {
        "title": "I will do modern minimalist logo design",
        "about": "Hey, I'm Alpa. I am a graphics designer as well as business woman. My hobby is drawing. Because it's brings a lot of benefits besides simply boosting my creativity. It\'s make me feel relaxed. Another hobby is cycling. It's makes me healthy and fit.",
        "price": 61,
        "owner": {
            "_id": "o101",
            "fullname": "loftydesignshop",
            "country": "India",
            "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d93001bdcba7f9235745299f61850b71-1657200241990/24f7d64e-5d25-41b3-8175-c79ea47e35d1.jpg",
            "level": "basic/premium",
            "rate": 4.8,
        },
        "daysToMake": 2,
        "description": "I'm Alpa. I am running loftydesignshop studio on the Fiverr platform with more than 4 years of experience. We are a creative team. We help buyers to provide their business identity through their logo.",
        "imgUrl": [
            "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/115533372/original/67ec94a37b1b51862162ffd326912ebd1616e725/do-modern-minimalist-logo-design-for-your-business.jpg",
            "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d563f1245ae0132d4c1ca21f533b62e5-1673262633/27428_Vadken%20medical_JK_M-01/do-modern-minimalist-logo-design-for-your-business.jpg",
            "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/ae80a50afc70ce3f177a22c9362ee394-1673346768/27447_Chaussures_RD_KC_M-01/do-modern-minimalist-logo-design-for-your-business.jpg"
        ],
        "tags": [
            "graphic-design",
            "design",
            "logo-design"
        ]
    },
]

const users = [
    {
        "fullname": "loftydesignshop",
        "username": "loftydesignshop",
        "password": "secret",
        "country": "India",
        "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d93001bdcba7f9235745299f61850b71-1657200241990/24f7d64e-5d25-41b3-8175-c79ea47e35d1.jpg",
        "level": "basic/premium",
        "rate": 4.8,
        "reviews": [
            {
                "id": utilService.makeId(),
                "txt": "Overall we were able to get what we wanted. We did have small revisions that took a very long time from the norm, 24-48 hours although the seller was online. I would say the communication feels like a scripted template and could use improvement and long wait times but overall she did as we asked and got it done.",
                "rate": 3.3,
                "createdAt": utilService.randomPastTime(),
                "by": {
                    "country": "United States",
                    "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                    "fullname": "codyjulia",
                    "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/e0c2663b90e40a8db952c0668455974a-35406431646969293.8527179/3B47096A-1066-4BB6-905B-32CD8C2E3C31",
                }
            },
            {
                "id": utilService.makeId(),
                "txt": "This girl provided me with clean, neat and fast work, in addition to being polite and friendly. She took into account my personal requirements without producing anything generic, and adapting to the situation. it served me a lot directly after ordering, and now I hope it will help me in the long run. I recommend these services to anyone who wants to get a beautiful logo, fast and safe ! Thank you, Arthur.",
                "rate": 5,
                "createdAt": utilService.randomPastTime(),
                "by": {
                    "country": "France",
                    "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png",
                    "fullname": "arthurphm",
                    "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/8e78f51d4c356ca71706f0e0de28273f-1668442053267/be129694-eaad-4906-9c45-4659094b088a.jpg",
                }
            },
            {
                "id": utilService.makeId(),
                "txt": "Seller did an excellent job with understanding what I wanted as far as the style and design. There were things I wanted fixed or changed after the first delivery, and she executed it exactly to how I wanted it. Response times were quick, and received everything faster than I expected. I have had issues with other designers not listening to specific details I have written — not the case here. I really felt like she cared to deliver the exact design I wanted, and asked further questions to make sure she understood exactly what I was saying. I'm so happy with the outcome! ",
                "rate": 5,
                "createdAt": utilService.randomPastTime(),
                "by": {
                    "country": "United Kingdom",
                    "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                    "fullname": "frankriver54",
                    "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/cf4ee9d83cd1c245af2ab2d4c1c11868-707365051637688052421/JPEG_20211123_092048_1475981208079376864.jpg",
                }
            },
            {
                "id": utilService.makeId(),
                "txt": "Fine! Very pleased with the work. I ordered a logo for a charitable foundation in Ukraine. I really like the result, I recommend this designer, she is really a master of her craft.",
                "rate": 4,
                "createdAt": utilService.randomPastTime(),
                "by": {
                    "country": "Ukraine",
                    "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1e6.png",
                    "fullname": "eduardkoshilko",
                    "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b8655eea9a4abe7c1e5e9a02e9dd4600-1666967537633/aed03d25-9936-4bec-8fe1-13310365b831.jpg",
                }
            }
        ]
    },
]


const emptyReview = {
    id: utilService.makeId(),
    txt: "",
    rate: 3,
    createdAt: utilService.randomPastTime(),
    by: {
        _id: "", // need to ce change
        country: "",
        flag: "",
        fullname: "",
        imgUrl: "",
    }
}

const emptyGig = {
    _id: "g101",
    title: "",
    about: "",
    price: 61,
    owner: {
        _id: "",
        fullname: "",
        country: "",
        imgUrl: "",
        level: "basic/premium",
        rate: 4.8,
    },
    daysToMake: 2,
    description: "",
    imgUrl: [
        "",
        "",
        ""
    ],
    tags: [
        "",
        "",
        ""
    ]
}

const something = {
    "_id": { "$oid": "63d11899d2234877c8cd4217" },
    "fullname": "loftydesignshop",
    "username": "loftydesignshop",
    "password": "secret",
    "country": "India",
    "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d93001bdcba7f9235745299f61850b71-1657200241990/24f7d64e-5d25-41b3-8175-c79ea47e35d1.jpg",
    "level": "basic/premium",
    "rate": 4.8,
    "reviews": [
        {
            "id": "1101",
            "txt": "Overall we were able to get what we wanted. We did have small revisions that took a very long time from the norm, 24-48 hours although the seller was online. I would say the communication feels like a scripted template and could use improvement and long wait times but overall she did as we asked and got it done.",
            "rate": 3.3,
            "createdAt": "",
            "by": {
                "country": "United States",
                "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                "fullname": "codyjulia",
                "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/e0c2663b90e40a8db952c0668455974a-35406431646969293.8527179/3B47096A-1066-4BB6-905B-32CD8C2E3C31",
            }
        },
        {
            "id": "1102",
            "txt": "This girl provided me with clean, neat and fast work, in addition to being polite and friendly. She took into account my personal requirements without producing anything generic, and adapting to the situation. it served me a lot directly after ordering, and now I hope it will help me in the long run. I recommend these services to anyone who wants to get a beautiful logo, fast and safe ! Thank you, Arthur.",
            "rate": 5,
            "createdAt": "",
            "by": {
                "country": "France",
                "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png",
                "fullname": "arthurphm",
                "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/8e78f51d4c356ca71706f0e0de28273f-1668442053267/be129694-eaad-4906-9c45-4659094b088a.jpg",
            }
        },
        {
            "id": "1103",
            "txt": "Seller did an excellent job with understanding what I wanted as far as the style and design. There were things I wanted fixed or changed after the first delivery, and she executed it exactly to how I wanted it. Response times were quick, and received everything faster than I expected. I have had issues with other designers not listening to specific details I have written — not the case here. I really felt like she cared to deliver the exact design I wanted, and asked further questions to make sure she understood exactly what I was saying. I'm so happy with the outcome! ",
            "rate": 5,
            "createdAt": "",
            "by": {
                "country": "United Kingdom",
                "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                "fullname": "frankriver54",
                "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/cf4ee9d83cd1c245af2ab2d4c1c11868-707365051637688052421/JPEG_20211123_092048_1475981208079376864.jpg",
            }
        },
        {
            "id": "1104",
            "txt": "Fine! Very pleased with the work. I ordered a logo for a charitable foundation in Ukraine. I really like the result, I recommend this designer, she is really a master of her craft.",
            "rate": 4,
            "createdAt": "",
            "by": {
                "country": "Ukraine",
                "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1e6.png",
                "fullname": "eduardkoshilko",
                "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b8655eea9a4abe7c1e5e9a02e9dd4600-1666967537633/aed03d25-9936-4bec-8fe1-13310365b831.jpg",
            }
        }
    ]
}
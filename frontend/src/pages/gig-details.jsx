export function GigDetails() {
    let gig = {
        _id: '',
        title: "I will provide automated travel affiliate websites for passive income",

        price: 12,
        owner: {
            _id: "u101",
            fullname: "Dudu Da",
            imgUrl: '',
            level: "basic/premium",
            rate: 4
        },
        daysToMake: 3,
        description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
        imgUrl: ["https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/133150062/original/51578d0fcd19725c97db9112910e1d264a333a79/create-totally-automated-travel-website-using-travelpayouts.png",
            "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/1094285/original/0149d53275d914f681e8685b9e6c263dcc4309ab/design-2-outstanding-logo.png",
            "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20211214/logo-04_nxxckf.jpg"],
        tags: [
            "logo-design",
            "artisitic",
            "proffesional",
            "accessible"
        ],
        likedByUsers: ['mini-user'] // for user-wishlist : use $in
    }

    return <section className="gig-details">
        gig details
        <h2>{gig.title}</h2>
        <h3>user details</h3>
        <img src={gig.imgUrl} alt="gig-img" />
        <h4>What people loved about this seller</h4>
        <h4>About This Gig</h4>
        <p>{gig.description}</p>
    </section>
}
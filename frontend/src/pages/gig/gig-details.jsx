import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../cmps/slide/image-slider"
import { gigService } from "../../services/gig.service"
import { showErrorMsg } from "../../services/event-bus.service"
import { GigProgram } from "../../cmps/gig/gig-program"
import { SlideDetails } from "../../cmps/slide/slide-details"


export function GigDetails() {
    const [gig, setGig] = useState()
    const navigate = useNavigate()
    const { gigId } = useParams()

    useEffect(() => {
        loadGig()
    }, [gigId])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        }
        catch (err) {
            console.log('had issue in gig details', err)
            showErrorMsg('cannot load gig')
            navigate('/gig')
        }
    }

    if (!gig) return <div>Loading...</div>
    return <section className="gig-details">
        <div className="gig-details-info">
            <div className="gig-details-overview">
                <span>Graphics & design &gt Logo Design</span>
                <h1>{gig.title}</h1>
                <div className="gig-details-user-details">
                    <img className="gig-details-user-img" src={gig.owner.imgUrl} alt="user-img" />
                    <p className="user-fullname">{gig.owner.fullname}</p>
                    <p>|</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                        <path fill="#ffb33e"
                            d="M 1728 647 q 0 22 -26 48 l -363 354 l 86 500 q 1 7 1 20 q 0 21 -10.5 35.5 t -30.5 14.5 q -19 0 -40 -12 l -449 -236 l -449 236 q -22 12 -40 12 q -21 0 -31.5 -14.5 t -10.5 -35.5 q 0 -6 2 -20 l 86 -500 l -364 -354 q -25 -27 -25 -48 q 0 -37 56 -46 l 502 -73 l 225 -455 q 19 -41 49 -41 t 49 41 l 225 455 l 502 73 q 56 9 56 46 Z">
                        </path>
                    </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                            <path fill="#ffb33e"
                                d="M 1728 647 q 0 22 -26 48 l -363 354 l 86 500 q 1 7 1 20 q 0 21 -10.5 35.5 t -30.5 14.5 q -19 0 -40 -12 l -449 -236 l -449 236 q -22 12 -40 12 q -21 0 -31.5 -14.5 t -10.5 -35.5 q 0 -6 2 -20 l 86 -500 l -364 -354 q -25 -27 -25 -48 q 0 -37 56 -46 l 502 -73 l 225 -455 q 19 -41 49 -41 t 49 41 l 225 455 l 502 73 q 56 9 56 46 Z">
                            </path>
                        </svg></p>
                    <p>(10) 1 Order in Queue</p>
                </div>
            </div>
            <SlideDetails gig={gig}/>
            <div className="gig-review-section">
                <h4>What people loved about this seller</h4>
            </div>
            <div className="gig-description">
                <h4>About This Gig</h4>
                <p>{gig.description}</p>
                <div className="gig-about-owner">
                    <h4>About The Seller</h4>
                    <div className="gig-about-owner-details">
                        <img className="gig-about-owner-img" src={gig.owner.imgUrl} alt="user-img" />
                        <div>
                            <div className="gig-details-user-details">
                                <p className="owner-fullname">{gig.owner.fullname}</p>
                                <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                    <path fill="#ffb33e"
                                        d="M 1728 647 q 0 22 -26 48 l -363 354 l 86 500 q 1 7 1 20 q 0 21 -10.5 35.5 t -30.5 14.5 q -19 0 -40 -12 l -449 -236 l -449 236 q -22 12 -40 12 q -21 0 -31.5 -14.5 t -10.5 -35.5 q 0 -6 2 -20 l 86 -500 l -364 -354 q -25 -27 -25 -48 q 0 -37 56 -46 l 502 -73 l 225 -455 q 19 -41 49 -41 t 49 41 l 225 455 l 502 73 q 56 9 56 46 Z">
                                    </path>
                                </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                        <path fill="#ffb33e"
                                            d="M 1728 647 q 0 22 -26 48 l -363 354 l 86 500 q 1 7 1 20 q 0 21 -10.5 35.5 t -30.5 14.5 q -19 0 -40 -12 l -449 -236 l -449 236 q -22 12 -40 12 q -21 0 -31.5 -14.5 t -10.5 -35.5 q 0 -6 2 -20 l 86 -500 l -364 -354 q -25 -27 -25 -48 q 0 -37 56 -46 l 502 -73 l 225 -455 q 19 -41 49 -41 t 49 41 l 225 455 l 502 73 q 56 9 56 46 Z">
                                        </path>
                                    </svg>  </p>
                                <p>(10) </p>

                            </div>
                            <button className="contact-me-btn">Contact Me</button>
                        </div>
                    </div>

                </div>
                <div className="gig-about-owner-container">
                    <div className="owner-container-header">
                        <div className="header-from-avg">
                            <div>
                                <p className="owner-title">From</p>
                                <p className="owner-answer">Pakistan</p>
                            </div>
                            <div>
                                <p className="owner-title">Avg. response time</p>
                                <p className="owner-answer">2 hours</p>
                            </div>
                        </div>
                        <div className="header-member-delivery">
                            <div>
                                <p className="owner-title">Member since</p>
                                <p className="owner-answer">Jun 2022</p>
                            </div>
                            <div>
                                <p className="owner-title">Last delivery</p>
                                <p className="owner-answer">3 days</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="owner-container-desc">
                        <p className="desc-first">I am a professional graphic designer with an experience of 10+ years. I am also expert in Website design/development as well as in UI/UX designs. </p>
                        <p>Let my field of expertise collaborate with your level of imagination, so together we can create an exceptional brand image. Something which creates an impact. Impact which screams for its acknowledgment without you needing to do so. Let us make wonders together in this field of designing. Keep exploring.</p>
                    </div>
                </div>
            </div>
        </div>
        <GigProgram gig={gig} />
    </section >
}
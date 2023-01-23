import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { gigService } from "../../services/gig.service"
import { showErrorMsg } from "../../services/event-bus.service"
import { GigProgram } from "../../cmps/gig/gig-program"
import { SlideDetails } from "../../cmps/slide/slide-details"
import { ReviewIndex } from "../../cmps/review-index"
import { StarRating } from "../../cmps/star-rating"


export function GigDetails() {
    const { gigId } = useParams()
    const navigate = useNavigate()
    const [gig, setGig] = useState()

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
    if(!gig.owner) return
    const { imgUrl, fullname, rate, level } = gig.owner
    return <section className="gig-details">
        <div className="gig-details-info">

            <div className="gig-details-preview">
                <nav>{`Graphics & design > Logo Design`}</nav>
                <h1>{gig.title}</h1>
                <div className="owner-details">
                    <img src={imgUrl} alt="user-img" />
                    <p>{fullname}</p>
                    <p>{level}</p>
                    <span className="divider"></span>

                    <div className="star-preview">
                        <StarRating value={rate} />
                        <span className="rate padding">{rate}</span>
                    </div>

                    <p>(10) 1 Order in Queue</p>
                </div>
            </div>

            <SlideDetails gig={gig} />

            <div className="gig-description">
                <div className="gig-about">
                    <h3>About This Gig</h3>
                    <p>{gig.description}</p>
                </div>

                <div className="gig-about-owner">
                    <h3>About The Seller</h3>
                    <div className="owner-details">
                        <img src={imgUrl} alt="user-img" />
                        <div className="owner-content">
                            <p className="owner-fullname">{fullname}</p>
                            <div className="star-preview">
                                <StarRating value={rate} />
                                <span className="rate padding">{rate}</span>
                                <p>(10)</p>
                            </div>
                            <button>Contact Me</button>
                        </div>
                    </div>

                </div>

                <div className="owner-description">
                    <ul>
                        <li><span>From</span><span>Indonesia</span></li>
                        <li><span>Member since</span><span>Oct 2012</span></li>
                        <li><span>Avg. response time</span><span>5 hours</span></li>
                        <li><span>Last delivery</span><span>about 1 hour</span></li>
                        <li><span>Languages</span><span>Indonesian, English</span></li>
                    </ul>

                    <article>
                        Experienced, passionate graphic design team specializing in logos, icons, stationery, prints, and branding. Completing thousands of projects on Fiverr for a wide variety of clients, we ensure nothing but the utmost professionalism and quality graphics you can find. Satisfaction is guaranteed! We look forward to working with you 🙂
                    </article>
                </div>
            </div>
            <ReviewIndex gig={gig} />
        </div>
        <GigProgram gig={gig} />
    </section >
}
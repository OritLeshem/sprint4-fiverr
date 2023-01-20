import React, { useRef, useState } from 'react'
import { HomePageSlider } from '../cmps/home-page-slider'
import { SlideList } from '../cmps/slide-cmps/slide-list'
import { gigService } from '../services/gig.service'

export function HomePage() {
    const firstSlides = gigService.getGigFirstSlides()
    const lastSlides = gigService.getGigLastSlides()
    const [currSlides, setCurrSlides] = useState(firstSlides)
    let diff = useRef(true)

    function onSetSlides() {
        if (diff.current) setCurrSlides(lastSlides)
        else setCurrSlides(firstSlides)
        diff.current = !diff.current
    }

    return <section className="home-page full main-layout">
        <div className="slides-container full main-layout">
            <HomePageSlider />
        </div>

        <div className="trusted-by"></div>

        <div className="main-content full main-layout">
            <h2>Popular professional services</h2>
            <SlideList slides={currSlides} onSetSlides={onSetSlides} />

            <div className="selling-proposition full">
                <div className="selling-text">
                    <h2>A whole world of freelance talent at your fingertips</h2>
                    <ul>
                        <li>
                            <h6>
                                <span className="fa-regular circle-check"></span>
                                <span>The best for every budget</span>
                            </h6>
                            <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
                        </li>
                        <li>
                            <h6>
                                <span className="fa-regular circle-check"></span>
                                <span>Quality work done quickly</span>
                            </h6>
                            <p>Find the right freelancer to begin working on your project within minutes.</p>
                        </li>
                        <li>
                            <h6>
                                <span className="fa-regular circle-check"></span>
                                <span>Protected payments, every time</span>
                            </h6>
                            <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
                        </li>
                        <li>
                            <h6>
                                <span className="fa-regular circle-check"></span>
                                <span>24/7 support</span>
                            </h6>
                            <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
                        </li>
                    </ul>
                </div>
                <div className="img-container">
                    <img src={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_600,dpr_2.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png'} alt="" />
                </div>
            </div>
        </div>
    </section >
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../cmps/image-slider"
import { gigService } from "../services/gig.service";
import { showErrorMsg } from "../services/event-bus.service.js"
import { GigProgarm } from "../cmps/gig-program";


export function GigDetails() {
    const [gig, setGig] = useState()
    const navigate = useNavigate()
    const { gigId } = useParams();

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
            showErrorMsg('cannot load toy')
            navigate('/gig')
        }
    }
    const containerStyles = {
        marginTop: '15px',
        width: '100%',
        height: '380px',
        margin: '0 auto',
    }

    if (!gig) return <div>Loading...</div>
    return <section className="gig-details">
        <div className="gig-details-info">
            <span> Graphics & design  >  Logo Design </span>
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
            {/* <img className="gig-details-user-img" src={require('../assets/img/avatar.png')} alt="user-img" /> */}
            {/* <img src={require('../assets/img/demo.jpg')} alt="" /> */}
            < div className="containerStyles" >
                <ImageSlider
                    //  slides={slides}
                    gig={gig} />
            </div>

            <h4>What people loved about this seller</h4>
            <h4>About This Gig</h4>
            <p>{gig.description}</p>
        </div>
        <GigProgarm gig={gig} />
    </section >
}
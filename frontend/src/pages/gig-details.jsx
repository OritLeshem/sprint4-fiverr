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
            <h2>{gig.title}</h2>
            <h3>user details</h3>
            {/* <img src={require('../assets/img/demo.jpg')} alt="" /> */}
            < div style={containerStyles}>
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
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { gigService } from "../services/gig.service"

export function GigPayment() {
    const [gig, setGig] = useState()
    const navigate = useNavigate()
    const { gigId } = useParams();
    console.log(gigId)

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

    function onSubmitPayment(ev) {
        ev.preventDefault()
        showSuccessMsg('Your order is send!')
        console.log(`${gig.title}`, `, within ${gig.daysToMake}`, ' working days. \n Speak to you soon,\n  ', `${gig.owner.fullname}`)
        console.log('send!')
    }

    return <section className="gig-payment">
        <div className="main-content">
            <header>Pament Options</header>
            <form id="payment-form" onSubmit={onSubmitPayment}>
                <div className="payment-option">
                    <label htmlFor="credit and debit">Credit & Debit Cards
                        <input name="credit and debit" type="checkbox" />
                    </label>
                </div>
                <div className="credit-card-details">
                    <div className="payment-input">
                        <label htmlFor="card">Card Numbuer</label>
                        <input type="text"
                            name="card"
                        // value={}
                        />
                    </div>
                    <div className="payment-input security-and-expire">
                        <label htmlFor="date">Expiration Date</label>
                        <input type="text"
                            name="date"
                            autoComplete="cc-exp"
                            placeholder="MM/YY"
                        // value={}
                        />
                    </div>

                    <div className="payment-input security-and-expire sec">
                        <label htmlFor="code" >Security Code</label>
                        <input type="number"
                            name="code"
                        // value={}
                        />
                    </div>
                </div>

                <div className="buyer-details">
                    <div className="payment-input">
                        <label htmlFor="firstname" >First Name</label>
                        <input type="text"
                            name="firstname"
                        // value={}
                        />
                    </div>
                    <div className="payment-input">
                        <label htmlFor="lastname" >Last Name</label>
                        <input type="text"
                            name="lastname"
                        // value={}
                        />
                    </div>
                </div>
            </form>
        </div>
        {gig && <aside className="side-content">
            <header>
                <img src={gig?.imgUrl[0]} alt="gig-img" />
                {/* <div>{gig.title}</div> */}
                <div>{gig.title}</div>
            </header>

            <section className="summary">

                <div className="basic-and-price"><span className='basic'>BASIC</span ><span className="price">$8.15</span></div>
                <ul>
                    <li ><span className="green-check fa-solid fa-check"></span> <span> 1 concept included </span></li>
                    <li> <span className="green-check fa-solid fa-check"></span> <span>Include source file</span></li>
                    <li><span className="green-check fa-solid fa-check"></span> <span>Include 3D mockup</span></li>
                </ul>
                <div><span>VAT</span><span>$4.39</span></div>

                <div>
                    <div><span>Total</span><span>$30.40</span></div>
                    <div><span>Total delivery time</span><span>1 day</span></div>
                </div>
                <button type="submit" form="payment-form">Confirm & Pay</button>
            </section>
        </aside>}
    </section>
}
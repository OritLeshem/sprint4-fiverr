import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { gigService } from '../../services/gig.service'
import { userService } from '../../services/user.service'
import { addOrder } from '../../store/order/order.actions'

import credit from '../../assets/img/credit.svg'
import paypal from '../../assets/img/paypal.svg'

export function GigPayment() {
    const user = userService.getLoggedinUser()
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

    async function onSubmitPayment(ev) {
        ev.preventDefault()
        if (!user) {
            showErrorMsg('Please login before continue ordering')
            return
        }

        const order = {
            buyer: {
                _id: user._id,
                fullname: user.fullname
            },
            seller: {
                _id: gig.owner._id,
                fullname: gig.owner.fullname,
            },
            gig: {
                _id: gig._id,
                title: gig.title,
                price: gig.price,
                imgUrl: gig.imgUrl
            },
            status: "pending"
        }
        try {
            await addOrder(order)
            showSuccessMsg('Your order has been sent')
            navigate('/gig')
        }
        catch (err) {
            showErrorMsg('Something went wrong')
            console.log("cant add order", err)
        }
    }

    if (!gig) return <div className="loader-container">
        <div className="loader"></div>
    </div>
    return <section className="gig-payment">
        <div className="main-content">

            <header>Payment Options</header>

            <form id="payment-form" onSubmit={onSubmitPayment}>
                <div className="payment-option">
                    <input name="credit" type="radio" defaultChecked />
                    <label htmlFor="credit">Credit & Debit Cards</label>
                    <img src={credit} alt="" />
                </div>

                <div className="payment-container">

                    <div className="card-details">
                        <label htmlFor="card" className="card">
                            <span>Card Number</span>
                            <input type="text"
                                name="card"
                                value='5326-1011-8754-8979'
                            />
                        </label>
                        <label htmlFor="date" className="date">
                            <span>Expiration Date</span>
                            <input type="text"
                                name="date"
                                autoComplete="cc-exp"
                                value="03/28"
                            />
                        </label>
                        <label htmlFor="code" className="code">
                            <span>Security Code</span>
                            <input type="number"
                                name="code"
                                value='345'
                            />
                        </label>
                    </div>

                    <div className="name-details">
                        <label htmlFor="firstname">
                            <span>First Name</span>
                            <input type="text"
                                name="firstname"
                                value='John'
                            />
                        </label>

                        <label htmlFor="lastname">
                            <span>Last Name</span>
                            <input type="text"
                                name="lastname"
                                value='Doe'
                            />
                        </label>
                    </div>

                </div>

                <div className="paypal">
                    <input name="credit" type="radio" />
                    <img src={paypal} alt="" />
                </div>
            </form>
        </div>

        <aside className="side-content">
            <div className="order-details">
                <header>
                    <img src={gig?.imgUrl[0]} alt="gig-img" />
                    <div>{gig.title}</div>
                </header>
                <div className="basic-and-price">
                    <span className='basic'>Basic</span >
                    <span className="price">${gig.price}</span>
                </div>
                <ul>
                    <li ><span className="green-check fa-solid fa-check"></span> <span>1 concept included</span></li>
                    <li> <span className="green-check fa-solid fa-check"></span> <span>Include source file</span></li>
                    <li><span className="green-check fa-solid fa-check"></span> <span>Logo transparency</span></li>
                </ul>
            </div>

            <div className="payment-summary">
                <div className="payment-taxes">
                    <div><span>Service</span><span>$8.39</span></div>
                    <div><span>VAT</span><span>$4.39</span></div>
                </div>
                <div className="payment-total">
                    <div><span>Total</span><span>${gig.price + 8.39 + 4.39}</span></div>
                    <div><span>Total delivery time</span><span>3 days</span></div>
                </div>
                <button className="payment-btn" type="submit" form="payment-form">Confirm & Pay</button>
            </div>
        </aside>
    </section>
}
import { showSuccessMsg } from "../services/event-bus.service"

export function GigPayment() {

    function onSubmitPayment(ev) {
        ev.preventDefault()
        showSuccessMsg('Your order is send!')
        console.log('send!')
    }

    return <section className="gig-payment">
        <div className="main-content">
            <header>Pament Options</header>
            <form id="payment-form" onSubmit={onSubmitPayment}>
                <label htmlFor="card" >Card Numbuer</label>
                <input type="text"
                    name="card"
                // value={}
                />
                <label htmlFor="date" >Expiration Date</label>
                <input type="text"
                    name="date"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                // value={}
                />
                <label htmlFor="code" >Security Code</label>
                <input type="number"
                    name="code"
                // value={}
                />
                <label htmlFor="firstname" >First Name</label>
                <input type="text"
                    name="firstname"
                // value={}
                />
                <label htmlFor="lastname" >Last Name</label>
                <input type="text"
                    name="lastname"
                // value={}
                />
            </form>
        </div>
        <aside className="side-content">
            <header>
                <img src="" alt="" />
                {/* <div>{gig.title}</div> */}
                <div>I will</div>
            </header>

            <section className="summary">
                <div>
                    <div><span>Service fee</span><span>$8.15</span></div>
                    <div><span>VAT</span><span>$4.39</span></div>
                </div>
                <div>
                    <div><span>Total</span><span>$30.40</span></div>
                    <div><span>Total delivery time</span><span>1 day</span></div>
                </div>
                <button type="submit" form="payment-form">Confirm & Pay</button>
            </section>
        </aside>
    </section>
}
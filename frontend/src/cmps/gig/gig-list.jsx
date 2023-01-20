import { GigPreview } from "./gig-preview"

export function GigList({ gigs, onRemoveGig, onUpdateGig }) {

    return <ul className="gig-list">
        {gigs.map(gig =>
            <li className="gig-preview" key={gig._id}>
                <GigPreview gig={gig} />
                {/* <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
                    <button onClick={() => { onUpdateGig(gig) }}>Edit</button> */}

                {/* <button onClick={() => { onAddGigMsg(gig) }}>Add gig msg</button> */}
                {/* <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to cart</button> */}
            </li>)
        }
    </ul>
}
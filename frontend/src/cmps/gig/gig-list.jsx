import { GigPreview } from "./gig-preview"

export function GigList({ gigs }) {

    return <ul className="gig-list">
        {gigs.map(gig =>
            <li className="gig-preview" key={gig._id}>
                <GigPreview gig={gig} />
            </li>)}
    </ul>
}
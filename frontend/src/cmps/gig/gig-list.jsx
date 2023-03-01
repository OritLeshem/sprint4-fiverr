import { useSelector } from "react-redux"
import { GigPreview } from "./gig-preview"
import { gigService } from '../../services/gig.service'
import { useState } from 'react'
import { updateGig } from '../../store/gig/gig.actions'


export function GigList({ gigs }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())
    const [heart, setHeart] = useState(false)





    return <ul className="gig-list">
        {gigs.map(gig =>
            <li className="gig-preview" key={gig._id}>
                <GigPreview gig={gig} />
            </li>)}
    </ul>
}
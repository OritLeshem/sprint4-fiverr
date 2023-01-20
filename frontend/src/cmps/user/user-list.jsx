import { UserPreview } from "./user-preview"
import { Link } from 'react-router-dom'


export function UserList({ gigs, onRemoveGig, onUpdateGig }) {

  return <ul className="gig-list">
    {gigs.map(gig =>
      <li className="gig-preview" key={gig._id}>
        <UserPreview gig={gig} />
        <div className="user-preview-btns">
          <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
          <Link to={`/gig/edit/${gig._id}`}>Edit</Link>
        </div>
        {/* <button onClick={() => { onAddGigMsg(gig) }}>Add gig msg</button> */}
        {/* <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to cart</button> */}
      </li>)
    }
  </ul>
}
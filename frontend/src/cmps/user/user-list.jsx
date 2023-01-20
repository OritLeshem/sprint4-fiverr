import { UserPreview } from "./user-preview"

export function UserList({ gigs, onRemoveGig, onUpdateGig }) {

  return <ul className="gig-list">
    {gigs.map(gig =>
      <li className="gig-preview" key={gig._id}>
        <UserPreview gig={gig} />
        <div className="user-preview-btns">
          <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
          <button onClick={() => { onUpdateGig(gig) }}>Edit</button>
        </div>
        {/* <button onClick={() => { onAddGigMsg(gig) }}>Add gig msg</button> */}
        {/* <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to cart</button> */}
      </li>)
    }
  </ul>
}
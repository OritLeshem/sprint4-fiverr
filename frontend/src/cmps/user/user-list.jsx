import { Link } from 'react-router-dom'

import { UserPreview } from "./user-preview"
import { userService } from "../../services/user.service"
import { GigPreview } from '../gig/gig-preview'

export function UserList({ gigs, onRemoveGig, user }) {
  const loginUser = userService.getLoggedinUser()

  return <ul className="gig-list user-gig-list">
    <li>{loginUser && (loginUser._id === user._id) && <Link className="user-add-link" to="/gig/edit">Add Gig +</Link>}</li>
    {gigs.map(gig =>
      <li className="gig-preview" key={gig._id}>
        <GigPreview gig={gig} />
        {user && loginUser && (loginUser._id === user._id) && <div className="user-preview-btns">
          <button className="gig-edit-btn" onClick={() => { onRemoveGig(gig._id) }}>x</button>
          <Link className="gig-edit-btn fa-solid fa-pencil" to={`/gig/edit/${gig._id}`}></Link>
        </div>}
      </li>)
    }
  </ul>
}
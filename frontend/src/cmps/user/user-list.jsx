import { Link } from 'react-router-dom'

import { userService } from "../../services/user.service"
import { GigPreview } from '../gig/gig-preview'

export function UserList({ gigs, onRemoveGig, user }) {
  const loginUser = userService.getLoggedinUser()

  return <ul className="gig-list user-gig-list">
    {loginUser && (loginUser._id === user._id) && <li className="gig-add-btn">
      <Link to="/gig/edit">
        <span className="fa-solid plus"></span>
        <span>Add Gig</span>
      </Link>
    </li>}
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
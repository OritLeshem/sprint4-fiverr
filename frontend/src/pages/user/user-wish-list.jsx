import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GigPreview } from '../../cmps/gig/gig-preview'
import { loadGigs } from '../../store/gig/gig.actions'

function UserWishList() {
  const user = useSelector((storeState) => storeState.userModule.user)
  let gigs = useSelector(storeState => storeState.gigModule.gigs)
  useEffect(() => {
    loadGigs()
  }, [])

  return <div>
    <h1>My wish list</h1>

    <ul className="gig-list">
      {gigs.filter(gig => gig.wishList.includes(user._id)).map(gig =>
        <li className="gig-preview" key={gig._id}>
          <GigPreview gig={gig} />
        </li>)}
    </ul>
    {gigs.filter(gig => gig.wishList.includes(user._id)).length === 0 && <h2>Your wish list is empty</h2>}

  </div>

}

export default UserWishList
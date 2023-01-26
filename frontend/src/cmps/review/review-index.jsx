import { useState, useEffect } from 'react'

import { ReviewBar } from './review-bar'
import { ReviewList } from './review-list'
import { StarRating } from './star-rating'

import { userService } from '../../services/user.service'

export function ReviewIndex({ gig }) {
  const [userReviews, setUserReviews] = useState(null)

  useEffect(() => {
    loadUserReviews()
  }, [])

  async function loadUserReviews() {
    try {
      const userReviews = await userService.getUserReviews(gig.owner._id)
      setUserReviews(userReviews)
    } catch (err) {
      console.log('userReviews: err in userReviews', err)
    }
  }

  if (!userReviews) return <div className="loader-contauner">
    <div className="loader"></div>
  </div>
  return <section className="review-app">
    <h3>Reviews</h3>
    <div className="review-header">
      <h4>
        <span>{userReviews.length}</span>
        reviews for this Gig
      </h4>
      < StarRating value={gig.owner.rate} />
      <span className="rate padding">{gig.owner.rate}</span>
    </div>

    <ReviewBar userReviews={userReviews} />
    <ReviewList userReviews={userReviews} />
  </section>
}



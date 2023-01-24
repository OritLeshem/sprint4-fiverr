import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'

import { StarRating } from './star-rating'

export function ReviewIndex({ gig }) {
  const [userReviews, setUserReviews] = useState(null)
  const stars = getStarsAvg()

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

  function getStarsAvg() {
    if (!userReviews) return
    const accInit = { sum: [0, 0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0, 0], avg: [0, 0, 0, 0, 0, 0] }
    const stars = userReviews.reduce((acc, review) => {
      const { rate } = review

      if (rate) {
        const rateFloor = Math.floor(rate)
        acc.sum[rateFloor] += rate
        acc.count[rateFloor]++
        const percentAvgRate = ((acc.sum[rateFloor] / acc.count[rateFloor]) * 100) / 5
        acc.avg[rateFloor] = acc.count[rateFloor] ? percentAvgRate : 0
      }

      return acc
    }, accInit)

    return stars
  }

  if (!userReviews) return 'loading...'
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

    <div className="review-bars">
      {stars.avg.slice(1).map((starAvg, idx) =>
        <div className="review-bars-container" key={idx}>
          <div>{`${idx + 1} Stars`}</div>
          <div className="review-rate-bar">
            <span className="percent" style={{ width: `${starAvg}%` }}></span>
          </div>
          <span>{`(${stars.count[idx]})`}</span>
        </div>
      )}
    </div>

    <ul className="review-list">
      {userReviews.map(review =>
        <li key={review.id}>
          <img src={review.by.imgUrl} alt="" />

          <div className="review">
            <div className="user-info">
              <h4>{review.by.fullname}</h4>
              <span>{review.by.country}</span>
            </div>

            <div className="rate-info">
              < StarRating value={review.rate} />
              <span className="rate padding">{review.rate}</span>
              <span className="divider"></span>
              <span>{utilService.formatTime(review.createdAt)}</span>
            </div>

            <p>{review.txt}</p>
          </div>
        </li>
      )}
    </ul>
  </section>
}



import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'

import { loadReviews, addReview, removeReview, getActionAddReview } from '../store/review/review.actions'
import { loadUsers } from '../store/user/user.actions'
import { StarRating } from './star-rating'

export function ReviewIndex({ gig }) {
  // const users = useSelector(storeState => storeState.userModule.users)
  // const loggedInUser = useSelector(storeState => storeState.userModule.user)
  // const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const [userReviews, setUserReviews] = useState(null)
  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })
  const starsAvg = getStarsAvg()
  const dispatch = useDispatch()

  console.log('userReviews:', userReviews)
  console.log('starsAvg:', starsAvg)

  useEffect(() => {
    loadUserReviews()

    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
    //   console.log('GOT from socket', review)
    //   dispatch(getActionAddReview(review))
    // })

    // return () => {
    //   socketService.off(SOCKET_EVENT_REVIEW_ADDED)
    // }
  }, [])

  async function loadUserReviews() {
    try {
      const userReviews = await userService.getUserReviews(gig.owner._id)
      setUserReviews(userReviews)
    } catch (err) {
      console.log('userReviews: err in userReviews', err)
    }
  }

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
    try {

      await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', aboutUserId: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function getStarsAvg() {
    if (!userReviews) return
    const accInit = { sum: [0, 0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0, 0], avg: [0, 0, 0, 0, 0, 0] }
    const starsAvg = userReviews.reduce((acc, review) => {
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

    return starsAvg.avg.slice(1)
  }


  // function canRemove(review) {
  //   return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  // }

  if (!userReviews) return 'loading...'
  return <section className="review-app">
    <h3>Reviews</h3>
    <div className="review-header">
      <h4>
        {userReviews && <span>{userReviews.length}</span>}
        reviews for this Gig
      </h4>
      < StarRating value={gig.owner.rate} />
    </div>

    <div className="review-bars">
      {starsAvg.map((starAvg, idx) =>
        <div key={idx}>
          <div>{`${idx + 1} Stars`}</div>
          <div className="review-rate-bar">
            <span className="percent" style={{ width: `${starAvg}%` }}></span>
          </div>
        </div>
      )}
    </div>

    {userReviews && <ul className="review-list">
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
              <span className="rate rate-num">{review.rate}</span>
              <span className="divider"></span>
              <span>{utilService.formatTime(review.createdAt)}</span>
            </div>

            <p>{review.txt}</p>
          </div>
        </li>
      )}
    </ul>}
  </section>
}

// {canRemove(review) &&
//   <button onClick={() => onRemove(review._id)}>X</button>}
// <p>
//   About:
//   <Link to={`/user/${review.aboutUser._id}`}>
//     {review.aboutUser.fullname}
//   </Link>
// </p>
// <h3>{review.txt}</h3>
// <p>
//   By:
//   <Link to={`/user/${review.byUser._id}`}>
//     {review.byUser.fullname}
//   </Link>
// </p>

// {users && loggedInUser &&
//   <form onSubmit={onAddReview}>
//     <select
//       onChange={handleChange}
//       value={reviewToEdit.aboutUserId}
//       name="aboutUserId"
//     >
//       <option value="">Select User</option>
//       {users.map(user => (
//         <option key={user._id} value={user._id}>
//           {user.fullname}
//         </option>
//       ))}
//     </select>
//     <textarea
//       name="txt"
//       onChange={handleChange}
//       value={reviewToEdit.txt}
//     ></textarea>
//     <button>Add</button>
//   </form>}
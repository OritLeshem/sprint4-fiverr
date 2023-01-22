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

  const dispatch = useDispatch()

  console.log('userReviews:', userReviews)

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

    {userReviews && <ul className="review-list">
      {userReviews.map(review => (
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

          {/* {canRemove(review) &&
            <button onClick={() => onRemove(review._id)}>X</button>} */}
          {/* <p>
            About:
            <Link to={`/user/${review.aboutUser._id}`}>
              {review.aboutUser.fullname}
            </Link>
          </p>
          <h3>{review.txt}</h3>
          <p>
            By:
            <Link to={`/user/${review.byUser._id}`}>
              {review.byUser.fullname}
            </Link>
          </p> */}
        </li>
      ))}
    </ul>}
    {/* {users && loggedInUser &&
      <form onSubmit={onAddReview}>
        <select
          onChange={handleChange}
          value={reviewToEdit.aboutUserId}
          name="aboutUserId"
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.fullname}
            </option>
          ))}
        </select>
        <textarea
          name="txt"
          onChange={handleChange}
          value={reviewToEdit.txt}
        ></textarea>
        <button>Add</button>
      </form>} */}
  </section>
}
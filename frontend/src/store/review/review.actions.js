import { reviewService } from '../../services/review.service'
import { store } from '../store.js'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from './review.reducer'
import { SET_WATCHED_USER } from '../user/user.reducer'

export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}

export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}

export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadReviews() {
  try {
    const reviews = await reviewService.query()
    store.dispatch({ type: SET_REVIEWS, reviews })
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}



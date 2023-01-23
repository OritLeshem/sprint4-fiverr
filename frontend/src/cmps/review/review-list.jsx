import { StarRating } from "./star-rating"

import { utilService } from "../../services/util.service"

export function ReviewList({ userReviews }) {

    return <ul className="review-list">
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
}
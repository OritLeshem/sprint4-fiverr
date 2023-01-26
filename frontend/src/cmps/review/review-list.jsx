import { StarRating } from "./star-rating"

import { utilService } from "../../services/util.service"
import { LongTxt } from "../long-txt"

export function ReviewList({ userReviews, length = 240 }) {

    return <ul className="review-list">
        {userReviews.map((review, idx) =>
            <li key={review.by.fullname + idx}>
                <img src={review.by.imgUrl} alt="" />

                <div className="review">
                    <div className="user-info">
                        <h4>{review.by.fullname}</h4>
                        <div className="country">
                            {review.by.flag && <img className="flag" src={review.by.flag} alt="" />}
                            <span>{review.by.country}</span>
                        </div>
                    </div>

                    <div className="rate-info">
                        < StarRating value={review.rate} />
                        <span className="rate padding">{review.rate}</span>
                        <span className="divider"></span>
                        <span>{utilService.formatTime(review.createdAt)}</span>
                    </div>

                    <LongTxt txt={review.txt} length={length} />
                </div>
            </li>
        )}
    </ul>
}
import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {

    return <>
        <div className="img-container">
            <img src={gig.imgUrl[0]} alt="" />
        </div>
        <div className="content">
            <span>{gig.owner && gig.owner.fullname}</span>
            <Link to={`/gig/${gig._id}`}>
                <span>{gig.title}</span>
            </Link>
            <div className="rating">
                ★4.9
            </div>
        </div>
        <footer>
            <div className="btn-container">
                <button className="fa-solid bars"></button>
                <button className="fa-solid heart"></button>
            </div>
            <Link className="price" to={`/gig/${gig._id}`}>
                <small>Starting at</small>
                <span>
                    ${gig.price}
                    <sup>00</sup>
                </span>
            </Link>
        </footer>
    </>
}
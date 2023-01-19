import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {

    return <>
        <Link to={`/gig/${gig._id}`} className="img-container">
            <img src={gig.imgUrl[0]} alt="" />
        </Link>

        <div className="content">
            <div className="seller-info">
                <img src={gig.owner && gig.owner.imgUrl} alt="" />
                <div className="owner">
                    <Link>{gig.owner && gig.owner.fullname}</Link>
                    <span>{gig.owner && gig.owner.level}</span>
                </div>
            </div>
            <Link className="title" to={`/gig/${gig._id}`}>{gig.title}</Link>
            <div className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                    <path fill="currentcolor"
                        d="M 1728 647 q 0 22 -26 48 l -363 354 l 86 500 q 1 7 1 20 q 0 21 -10.5 35.5 t -30.5 14.5 q -19 0 -40 -12 l -449 -236 l -449 236 q -22 12 -40 12 q -21 0 -31.5 -14.5 t -10.5 -35.5 q 0 -6 2 -20 l 86 -500 l -364 -354 q -25 -27 -25 -48 q 0 -37 56 -46 l 502 -73 l 225 -455 q 19 -41 49 -41 t 49 41 l 225 455 l 502 73 q 56 9 56 46 Z">
                    </path>
                </svg>
                <span>{gig.owner && gig.owner.rate}</span></div>
        </div>

        <footer>
            <div className="btn-container">
                {/* <button className="fa-solid bars"></button> */}
                <button className="fa-solid heart" title="save to list"></button>
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
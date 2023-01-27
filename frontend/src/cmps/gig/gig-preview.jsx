import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

import { SlideGigPreview } from '../slide/slide-gig-preview'

export function GigPreview({ gig }) {

    function getTxtToShow(txt, length) {
        return (txt.length < length) ? txt : txt.substring(0, length + 1) + '...'
    }

    return <>
        <Link to={`/gig/${gig._id}`} className="img-container">
            <SlideGigPreview gig={gig} />
        </Link>

        <div className="content">
            <div className="owner-info">
                <img src={gig.owner && gig.owner.imgUrl} alt="" />
                <div className="owner">
                    <Link to={`/user/${gig.owner._id}`}>{gig.owner && gig.owner.fullname}</Link>
                    <span>{gig.owner && gig.owner.level}</span>
                </div>
            </div>
            <Link className="title" to={`/gig/${gig._id}`}>
                <div className="long-txt">
                    <span>{getTxtToShow(gig.title, 60)}</span>
                </div>
            </Link>
            <div className="rate">
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating value={gig.owner.rate} name="half-rating-read" size="small"
                        precision={0.5} max={1} readOnly />
                </Box>
                <div>{gig.owner && gig.owner.rate}</div>
                <div className='ratings-count'>({gig.owner && gig.owner.ratingsCount})</div>

            </div>

        </div>

        <footer>
            <div className="btn-container">
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
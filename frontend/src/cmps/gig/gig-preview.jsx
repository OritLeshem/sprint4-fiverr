import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import { SlideGigPreview } from '../slide/slide-gig-preview'

export function GigPreview({ gig }) {

    return <>
        <Link to={`/gig/${gig._id}`} className="img-container">
            <SlideGigPreview gig={gig} />
            {/* <img src={gig.imgUrl[0]} alt="" /> */}
        </Link>

        <div className="content">
            <div className="owner-info">
                <img src={gig.owner && gig.owner.imgUrl} alt="" />
                <div className="owner">
                    <Link to={`/user/${gig.owner._id}`}>{gig.owner && gig.owner.fullname}</Link>
                    <span>{gig.owner && gig.owner.level}</span>
                </div>
            </div>
            <Link className="title" to={`/gig/${gig._id}`}>{gig.title}</Link>
            <div className="rate">
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating value={gig.owner.rate} name="half-rating-read" size="small"
                        precision={0.5} max={1} readOnly />
                </Box>
                <div>{gig.owner && gig.owner.rate}</div>
            </div>
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
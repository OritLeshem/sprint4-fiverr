import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {

    return <>
    <div className="img-container">
        <img src={require('../assets/img/demo.jpg')} alt="" />
    </div>
    <div className="content">
        <span>{gig.owner && gig.owner.fullname}</span>
        <Link to={`/gig/${gig._id}`}>
            <span>{gig.title}</span>
        </Link>
    </div>
        <footer>
            <button className="fa-solid heart"></button>
            <span>${gig.price}</span>
        </footer>
    </>
}
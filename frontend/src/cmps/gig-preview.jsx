import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {

    return <>
        <img src={require('../assets/img/demo.jpg')} alt="" />
        <span>{gig.owner && gig.owner.fullname}</span>
        <Link to={`/gig/${gig._id}`}>
            <span>{gig.title}</span>
        </Link>
        <footer>
            <button className="fa-solid heart"></button>
            footer gig preview
            <span>${gig.price}</span>
        </footer>
    </>
}
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"

import { gigService } from "../services/gig.service.js"

export function CategoryMenu({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function filterByCategory(categories) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, tags: categories }))
    }

    return <nav className="categories-menu">
        <ul className="categories">
            {/* <a href='google.com'>goggl</a> */}
        <li><Link to="gig" onClick={() => filterByCategory(["graphic-design", "design", "logo-design"])}>Graphic & Design</Link></li>
            <Link to="gig"><li onClick={() => filterByCategory(["digital-marketing", "digital"])}>Digital Marketing</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["writing-translation", "translation"])}>Writing & Translation</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["video-animation", "animation"])}>Video & Animation</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["music-audio", "audio"])}>Music & Audio</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["programming-tech", "tech"])}>Programming & Tech</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["business"])}>Business</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["lifestyle"])}>Lifestyle</li></Link>
            <Link to="gig"><li onClick={() => filterByCategory(["trending"])}>Trending</li></Link>
        </ul>
    </nav>
}
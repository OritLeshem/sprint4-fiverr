import { Link } from 'react-router-dom'
import { useState } from "react"

import { gigService } from "../services/gig.service.js"

export function CategoryMenu({onSetFilter}) {

    // const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())

    function filterByCategory(categories) {
        const filterByToEdit = gigService.getDefaultFilter()
        filterByToEdit.tags = categories
        onSetFilter(filterByToEdit)
    }

    return <nav className="categories-menu">
            <ul className="categories">
                <li><Link to="/gig" onClick={() => filterByCategory(["graphic-design", "design","logo-design"])}>Graphic & Design</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["digital-marketing", "digital"])}>Digital Marketing</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["writing", "translation"])}>Writing & Translation</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["video", "animation"])}>Video & Animation</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["music", "audio"])}>Music & Audio</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["programming", "tech"])}>Programming & Tech</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["business"])}>Business</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["lifestyle"])}>Lifestyle</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["trending"])}>Trending</Link></li>
            </ul>
        </nav>
}
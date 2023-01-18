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
                <li><Link to="/gig" onClick={() => filterByCategory(["graphic-design", "design"])}>Graphic & Design</Link></li>
                <li><Link to="/gig" onClick={() => filterByCategory(["digital-marketing", "digital"])}>Digital Marketing</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Writing & Translation</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Video & Animation</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Music & Audio</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Programming & Tech</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Business</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Lifestyle</Link></li>
                <li><Link to="/gig" onClick={() => console.log('filterByGraphic')}>Trending</Link></li>
            </ul>
        </nav>
}
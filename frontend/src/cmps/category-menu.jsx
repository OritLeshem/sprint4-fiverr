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

    return <div className="categories-menu wrapper main-layout full">
        <nav className="categories-menu main-layout">
            <ul className="categories full">
                <li><Link onClick={() => filterByCategory(["graphic-design", "design"])}>Graphic & Design</Link></li>
                <li><Link onClick={() => filterByCategory(["digital-marketing", "digital"])}>Digital Marketing</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Writing & Translation</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Video & Animation</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Music & Audio</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Programming & Tech</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Business</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Lifestyle</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic')}>Trending</Link></li>
            </ul>
        </nav>

    </div>
}
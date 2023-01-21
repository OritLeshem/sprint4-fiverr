import { useEffect, useState } from "react"

import { gigService } from "../../services/gig.service.js"

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
            <li onClick={() => filterByCategory(["graphic-design", "design", "logo-design"])}><a>Graphic & Design</a></li>
            <li onClick={() => filterByCategory(["digital-marketing", "digital"])}><a>Digital Marketing</a></li>
            <li onClick={() => filterByCategory(["writing-translation", "translation"])}><a>Writing & Translation</a></li>
            <li onClick={() => filterByCategory(["video-animation", "animation"])}><a>Video & Animation</a></li>
            <li onClick={() => filterByCategory(["music-audio", "audio"])}><a>Music & Audio</a></li>
            <li onClick={() => filterByCategory(["programming-tech", "tech"])}><a>Programming & Tech</a></li>
            <li onClick={() => filterByCategory(["business"])}><a>Business</a></li>
            <li onClick={() => filterByCategory(["lifestyle"])}><a>Lifestyle</a></li>
            <li onClick={() => filterByCategory(["trending"])}><a>Trending</a></li>
        </ul>
    </nav>
}
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
            <li onClick={() => filterByCategory(["graphic-design", "design", "logo-design"])}>Graphic & Design</li>
            <li onClick={() => filterByCategory(["digital-marketing", "digital"])}>Digital Marketing</li>
            <li onClick={() => filterByCategory(["writing-translation", "translation"])}>Writing & Translation</li>
            <li onClick={() => filterByCategory(["video-animation", "animation"])}>Video & Animation</li>
            <li onClick={() => filterByCategory(["music-audio", "audio"])}>Music & Audio</li>
            <li onClick={() => filterByCategory(["programming-tech", "tech"])}>Programming & Tech</li>
            <li onClick={() => filterByCategory(["business"])}>Business</li>
            <li onClick={() => filterByCategory(["lifestyle"])}>Lifestyle</li>
            <li onClick={() => filterByCategory(["trending"])}>Trending</li>
        </ul>
    </nav>
}
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

    const [lastDirection, setLastDirection] = useState('')

    const slideLeft = () => {
        console.log('left');
        if (lastDirection !== 'left') {
            var categories = document.getElementById("categories")
            categories.scrollLeft = categories.scrollLeft - 2000
            setLastDirection('left')
        }
        else {
            var categories = document.getElementById("categories")
            categories.scrollLeft = categories.scrollLeft + 2000
            setLastDirection('right')

        }
    }

    const slideRight = () => {
        console.log(lastDirection)
        console.log('right');
        if (lastDirection !== 'right') {
        var categories = document.getElementById("categories")
        categories.scrollLeft = categories.scrollLeft - 2000
        setLastDirection('right')
        }
        else{
            var categories = document.getElementById("categories")
            categories.scrollLeft = categories.scrollLeft + 2000
            setLastDirection('left')
        }
    }

    return <nav className="categories-menu">
          <button className="category-btn fa-solid chevron-left left" onClick={slideLeft}></button>
        <ul className="categories" id="categories">
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
        <button className="category-btn fa-solid chevron-right right" onClick={slideRight}></button>
    </nav>
}
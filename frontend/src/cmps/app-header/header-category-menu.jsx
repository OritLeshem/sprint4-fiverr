import { useEffect, useRef, useState } from "react"

import { gigService } from "../../services/gig.service.js"

export function CategoryMenu({ onSetFilter }) {
    // const filterByToEdit = useRef(gigService.getDefaultFilter())
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const CategorysliderRef = useRef()
    const [lastDirection, setLastDirection] = useState('')
    const [categoryMenuClassName, setCategoryMenuClassName] = useState('')
    const [linesSetDisplay, setLinesSetDisplay] = useState('')
    const { pathname } = window.location

    useEffect(() => {
        function handleScroll() {
            if (window.innerWidth > 600 && window.scrollY >= 300 && pathname === '/') {
                setCategoryMenuClassName('categories-menu')
                setLinesSetDisplay('main-app-header full')
            }
            else if (window.scrollY < 300 && pathname === '/') {
                setCategoryMenuClassName('no-display')
                setLinesSetDisplay('no-display')
            }
            else if (window.innerWidth < 600) {
                setCategoryMenuClassName('no-display')
                setLinesSetDisplay('no-display')
            }
            else {
                setCategoryMenuClassName('categories-menu')
                setLinesSetDisplay('main-app-header full')
            }
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [pathname])

    function filterByCategory(categories) {
        setFilterByToEdit({ ...filterByToEdit, tags: categories })
        onSetFilter({ ...filterByToEdit, tags: categories })
    }

    // function filterByCategory(categories) {
    //     filterByToEdit.current.tags = categories
    //     onSetFilter(filterByToEdit.current)
    // }

    const slideLeft = () => {
        if (lastDirection !== 'left') {
            CategorysliderRef.current.scrollLeft = CategorysliderRef.current.scrollLeft - 2000
            setLastDirection('left')
        }
        else {
            CategorysliderRef.current.scrollLeft = CategorysliderRef.current.scrollLeft + 2000
            setLastDirection('right')
        }
    }

    const slideRight = () => {
        if (lastDirection !== 'right') {
            CategorysliderRef.current.scrollLeft = CategorysliderRef.current.scrollLeft + 2000
            setLastDirection('right')
        }
        else {
            CategorysliderRef.current.scrollLeft = CategorysliderRef.current.scrollLeft - 2000
            setLastDirection('left')
        }
    }

    return <>
        <div className={`${linesSetDisplay}`}></div>
        <nav className={`${categoryMenuClassName}`}>
            <button className="category-btn fa-solid chevron-left left" onClick={slideLeft}></button>
            <ul className="categories" id="categories" ref={CategorysliderRef}>
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
        <div className={`${linesSetDisplay}`}></div>
    </>
}
import { useState } from "react"

export function SlideGigPreview({ gig }) {
    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)

    function plusSlides(ev, n) {
        ev.preventDefault()
        if (slideIndex === slides.length - 1 && n === 1) setSlideIndex(0)
        else if (slideIndex === 0 && n === -1) setSlideIndex(slides.length - 1)
        else setSlideIndex((prevSlide) => (prevSlide + n))
    }

    function onDot(ev, slideIndex) {
        ev.preventDefault()
        setSlideIndex(slideIndex)
    }

    return <div className="gig-preview-img">
        <span className="prev fa-solid chevron-left" onClick={(ev) => plusSlides(ev, -1)}></span>
        <img src={slides[slideIndex]} />
        <span className="next fa-solid chevron-right" onClick={(ev) => plusSlides(ev, 1)}></span>

        <ul className="dot-container">
            {slides.map((slide, slideIndex) => (
                <li className="dot" key={slideIndex} onClick={(ev) => onDot(ev, slideIndex)}></li>
            ))}
        </ul>
    </div>
}
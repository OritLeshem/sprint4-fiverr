import { useRef, useState } from "react"
import { gigService } from "../../services/gig.service"

export function SlideList() {
    const slides = gigService.getGigSlides()
    const sliderRef = useRef()
    const [lastDirection, setLastDirection] = useState('')

    const slideLeft = () => {
        if (lastDirection === '') {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 2000
            setLastDirection('left')
        }
        else if (lastDirection === 'left') {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 2000
            setLastDirection('right')
        }
        else if (lastDirection !== 'left') {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 2000
            setLastDirection('left')
        }
        else {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 2000
            setLastDirection('right')
        }
    }

    const slideRight = () => {
        if (lastDirection === '') {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 2000
            setLastDirection('right')
        }
        else if (lastDirection === 'right') {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 2000
            setLastDirection('left')
        }
        else if (lastDirection !== 'right') {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 2000
            setLastDirection('right')
        }
        else {
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 2000
            setLastDirection('left')
        }
    }

    return <section className="main-slider-container">
        <button className="slide-btn fa-solid chevron-left prev" onClick={slideLeft}></button>
        <ul className="slider" ref={sliderRef}>
            {slides.map((slide, idx) =>
                <div className="slider-card" key={idx}>
                    <h4>
                        <small>{slide.desc}</small>
                        {slide.category}
                    </h4>
                    <div className="img-slide">
                        <img src={slide.url} alt="" />
                    </div>
                </div>
            )}
        </ul>
        <button className="slide-btn fa-solid chevron-right next" onClick={slideRight}></button>
    </section>
}
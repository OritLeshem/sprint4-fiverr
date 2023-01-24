import { useState } from "react";
import { gigService } from "../../services/gig.service";
import { SlidePreview } from "./slide-preview"

export function SlideListCopy() {
    const firstSlides = gigService.getGigFirstSlides()
    const lastSlides = gigService.getGigLastSlides()
    const slides = [...firstSlides, ...lastSlides]

    const [lastDirection, setLastDirection] = useState('')

    const slideLeft = () => {
        if (lastDirection !== 'left') {
            var slider = document.getElementById("slider")
            slider.scrollLeft = slider.scrollLeft + 2000
            setLastDirection('left')
        }
        else {
            var slider = document.getElementById("slider")
            slider.scrollLeft = slider.scrollLeft - 2000
            setLastDirection('right')

        }
    }

    const slideRight = () => {
        if (lastDirection !== 'right') {
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft - 2000
        setLastDirection('right')
        }
        else{
            var slider = document.getElementById("slider")
            slider.scrollLeft = slider.scrollLeft + 2000
            setLastDirection('left')
        }
    }

    return <section className="main-slider-container">
        <button className="slide-btn fa-solid chevron-left prev" onClick={slideLeft}></button>
        <ul className="slider" id="slider">
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
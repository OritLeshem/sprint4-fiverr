import { useState } from "react"

export function SlideDetails({ gig }) {
    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)
    const [isDynamic, setIsDynamic] = useState(0)


    // Next/previous controls
    function plusSlides(n) {
        if (slideIndex === slides.length - 1 && n === 1) {
            setSlideIndex(0)
            setIsDynamic(0)
        }
        else if (slideIndex === 0 && n === -1) {
            setSlideIndex(slides.length - 1)
            setIsDynamic(slides.length - 1)
        }
        else {
            setSlideIndex((prevSlide) => (prevSlide + n))
            setIsDynamic(slideIndex + n)
        }
    }

    // Thumbnail image controls
    function currentSlide(n) {
        setSlideIndex(n)
        setIsDynamic(n)
    }

    return <div className="slide-details">
        {/* <!-- Container for the image gallery --> */}
        <div className="container">

            {/* <!-- Full-width image with number text --> */}
            <div className="my-slides">
                <img src={slides[slideIndex]} />
            </div>

            {/* <!-- Next and previous buttons --> */}
            <a className="prev fa-solid chevron-left" onClick={() => plusSlides(-1)}></a>
            <a className="next fa-solid chevron-right" onClick={() => plusSlides(1)}></a>


            {/* <!-- Thumbnail images --> */}
            <div className="row">
                {slides.map((slide, index) => {
                    return <div className="column" key={index}>
                        <img className={isDynamic === index ? "demo-active demo cursor " : "demo cursor"} src={slide} onClick={() => currentSlide(index)} />
                    </div>
                })}
            </div>
        </div>
    </div>
}

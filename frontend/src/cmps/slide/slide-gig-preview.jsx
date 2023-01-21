import { useState } from "react"

export function SlideGigPreview({ gig }) {

    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)

    // // Next/previous controls
    function plusSlides(ev,n) {
        ev.preventDefault()
        console.log(n);
        if (slideIndex === slides.length - 1 && n === 1) setSlideIndex(0)
        else if (slideIndex === 0 && n === -1) setSlideIndex(slides.length - 1)
        else setSlideIndex((prevSlide) => (prevSlide + n))
    }

    return <div className="gig-preview-img">
        {/* <!-- Full-width image with number text --> */}
        {/* <div> */}
        <a className="prev fa-solid chevron-left" onClick={(ev) => plusSlides(ev,-1)}></a>
            <img src={slides[slideIndex]} />
        <a className="next fa-solid chevron-right" onClick={(ev) => plusSlides(ev,1)}></a>
        {/* </div> */}

        {/* <!-- Next and previous buttons --> */}
    </div>
}
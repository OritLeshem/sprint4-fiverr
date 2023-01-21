
export function SlidePreview({ slide }) {

    return <>
        <h4>
            <small>{slide.desc}</small>
            {slide.category}
        </h4>
        <div className="img-slide">

            <img src={slide.url} alt="" />
        </div>
    </>
}
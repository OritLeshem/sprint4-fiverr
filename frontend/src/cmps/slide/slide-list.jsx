import { SlidePreview } from "./slide-preview"

export function SlideList({ slides, onSetSlides }) {

    return <section className="slide-list-container">
        <button className="slide-btn fa-solid chevron-left" onClick={() => onSetSlides()}></button>
        <ul className="slide-list">
            {slides.map((slide, idx) =>
                <li className="slide-preview" key={idx}>
                    <SlidePreview slide={slide} />
                </li>
            )}
        </ul>


        <button className="slide-btn fa-solid chevron-right" onClick={() => onSetSlides()}></button>
    </section>
}
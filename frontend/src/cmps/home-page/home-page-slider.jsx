import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { SET_FILTER } from "../../store/gig/gig.reducer"
import { Search } from "../app-header/header-search"
import { StarRating } from "../review/star-rating"

export function HomePageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let intervalIdRef = useRef(null)

    const slides = [
        { name: "Andrea", title: "Fashion Designer", url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/bg-hero-1-1792-x1.png' },
        { name: "Moon", title: "Marketing Expert", url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203045/bg-hero-2-1792-x1.png' },
        { name: "Ritika", title: "Shoemaker and Designer", url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783966/bg-hero-3-1792-x1.png' },
        { name: "Zach", title: "Bar Owner", url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/93085acc959671e9e9e77f3ca8147f82-1599427734108/bg-hero-4-1792-x1.png' },
        { name: "Gabriella", title: "Video Editor", url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/bg-hero-5-1792-x1.png' },
    ]
    console.log(slides);
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        if (!filterBy.tags && !filterBy.title) {
            navigate('/gig')
            return
        }

        let queryStringParams
        if (filterBy.tags) queryStringParams = `?category=${filterBy.tags[0]}`
        if (filterBy.title) queryStringParams = `?title=${filterBy.title}`
        navigate(`/gig${queryStringParams}`)
    }

    useEffect(() => {
        if (currentIndex === 5) {
            clearInterval(intervalIdRef.current)
            setCurrentIndex(0)
        }
        setSlides()

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [currentIndex])

    function setSlides() {
        intervalIdRef.current = setInterval(() => {
            setCurrentIndex((prevCount) => prevCount + 1)
        }, 6000)
    }

    return <section className="home-page-slider full main-layout">
        <div className={`main-layout hero-img full ${currentIndex === 0 ? "active-hero" : "hidden-hero"}`} style={{ backgroundImage: `url(${slides[0].url})` }}>
            <h4>
                <StarRating value={5}/>
                <small>{slides[0].name}, </small>{slides[0].title}</h4>
        </div>
        <div className={`main-layout hero-img full ${currentIndex === 1 ? "active-hero" : "hidden-hero"}`} style={{ backgroundImage: `url(${slides[1].url})` }}>
            <h4>
            <StarRating value={5}/>
                <small>{slides[0].name}, </small>{slides[1].title}</h4></div>
        <div className={`main-layout hero-img full ${currentIndex === 2 ? "active-hero" : "hidden-hero"}`} style={{ backgroundImage: `url(${slides[2].url})` }}>
            <h4>
            <StarRating value={5}/>
                <small>{slides[0].name}, </small>{slides[2].title}</h4></div>
        <div className={`main-layout hero-img full ${currentIndex === 3 ? "active-hero" : "hidden-hero"}`} style={{ backgroundImage: `url(${slides[3].url})` }}>
            <h4>
            <StarRating value={5}/>
                <small>{slides[0].name}, </small>{slides[3].title}</h4></div>
        <div className={`main-layout hero-img full ${currentIndex === 4 ? "active-hero" : "hidden-hero"}`} style={{ backgroundImage: `url(${slides[4].url})` }}>
            <h4>
            <StarRating value={5}/>
                <small>{slides[0].name}, </small>{slides[4].title}</h4></div>
        <div className="hero-container full main-layout">
            <main className="main-header">
                <span>Find the perfect<i>freelance</i></span>
                <span>services for your business</span>
                <Search onSetFilter={onSetFilter} />
                <ul className="popular">
                    Popular:
                    <li><a>Website Design</a></li>
                    <li><a>WordPress</a></li>
                    <li><a>Logo Design</a></li>
                    <li><a>Video Editing</a></li>
                </ul>
            </main>
        </div>
    </section>
}
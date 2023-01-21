import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SET_FILTER } from "../../store/gig/gig.reducer"
import { Search } from "../app-header/header-search"

export function HomePageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let intervalIdRef = useRef(null)

    const slides = [
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049977/bg-hero-1-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203043/bg-hero-2-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783956/bg-hero-3-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049967/bg-hero-4-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049979/bg-hero-5-900-x2.png' },
    ]

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        if (!filterBy.tags && !filterBy.title) {
            navigate('/gig')
            return
        }

        let queryStringParams
        if (filterBy.tags) queryStringParams = `?category=${filterBy.tags[0]}`
        if (filterBy.title) queryStringParams = `?title=${filterBy.title}`
        // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        // window.history.pushState({ path: newUrl }, '', newUrl)
        navigate(`/gig${queryStringParams}`)
    }

    useEffect(() => {
        if (currentIndex === slides.length - 1) {
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
        }, 8000)
    }

    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex].url})`,
    }

    return <section className="home-page-slider full main-layout">
        <div className="hero-img full" style={slideStyles}></div>
        <div className="hero-container full main-layout">
            <main className="main-header">
                <span>Find the perfect<i>freelance</i></span>
                <span>services for your business</span>
                <Search onSetFilter={onSetFilter}/>
                <ul className="popular">
                    popular:
                    <li><a>Website Design</a></li>
                    <li><a>WordPress</a></li>
                    <li><a>Logo Design</a></li>
                    <li><a>Video Editing</a></li>
                </ul>
            </main>
        </div>
    </section>
}
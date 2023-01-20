import { useEffect, useRef, useState } from "react"

export function HomePageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    let intervalIdRef = useRef(null)

    const slides = [
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049977/bg-hero-1-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203043/bg-hero-2-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783956/bg-hero-3-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049967/bg-hero-4-900-x2.png' },
        { url: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049979/bg-hero-5-900-x2.png' },
    ]

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

    return <section className="home-page-slider">
        <div className="hero-img" style={slideStyles}></div>
        <div className="hero-container main-header">
            <h1>
                <span>Find the perfect</span><i>freelance</i>
                <span>services for your business</span>
            </h1>
        </div>
    </section>
}
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { HomePageSlider } from '../cmps/home-page/home-page-slider'
import { SlideList } from '../cmps/slide/slide-list'
import { SET_FILTER } from '../store/gig/gig.reducer'

import { gigService } from '../services/gig.service'

export function HomePage() {

    const sellingTxts = gigService.getGigSelling()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        let categoryParams
        let queryStringParams
        if (filterBy.tags[0] !== undefined) categoryParams = filterBy.tags[0]
        else { categoryParams = '' }
        queryStringParams = `?category=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
        navigate(`/gig${queryStringParams}`)
    }

    return <section className="home-page full">
        <main className="full main-layout">
            <HomePageSlider />
            <div className="trusted-by full">
            </div>
            <h2>Popular professional services</h2>
            <SlideList onSetFilter={onSetFilter} />
            <div className="selling-proposition full main-layout">
                <div className="flex">
                    <div className="selling-text">
                        <h2>A whole world of freelance talent at your fingertips</h2>
                        <ul>
                            {sellingTxts.map((sellingTxt, idx) =>
                                <li key={idx}>
                                    <h6>
                                        <span className="fa-regular circle-check"></span>
                                        <span>{sellingTxt.title}</span>
                                    </h6>
                                    <p>{sellingTxt.desc}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="img-container">
                        <img src={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_600,dpr_2.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png'} alt="" />
                    </div>
                </div>
            </div>
        </main>
    </section >
}
import { HomePageSlider } from '../cmps/home-page/home-page-slider'
import { SlideList } from '../cmps/slide/slide-list'
import { gigService } from '../services/gig.service'

export function HomePage() {

    const sellingTxts = gigService.getGigSelling()

    return <section className="home-page full">
        <main className="full main-layout">
            <HomePageSlider />
            <div className="trusted-by full">
            </div>
            <h2>Popular professional services</h2>
            <SlideList />
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
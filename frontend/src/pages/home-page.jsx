import React from 'react'
import { HomePageSlider } from '../cmps/home-page-slider'
import { SlideList } from '../cmps/slide-list'

export function HomePage() {


    return (
        <section className="home-page full main-layout">
            <div className="slides-container full">
                <HomePageSlider />
            </div>

            <div className="hero-container">
                <div className="main-header">
                    <h1>
                        <span>Find the perfect</span><i>freelance</i>
                        <span>services for your business</span>
                    </h1>
                </div>
            </div>

            <div className="trusted-by"></div>

            <div className="main-content">
                <h2>Popular professional services</h2>
                <SlideList />
            </div>
        </section >
    )
}
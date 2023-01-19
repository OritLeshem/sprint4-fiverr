import React from 'react'
import { HomePageSlider } from '../cmps/home-page-slider'
import { SlideList } from '../cmps/slide-list'

export function HomePage() {

    return (
        <section className="home-page full">
            <div className="slides-container">
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

            <div className="main-content main-layout">
                <h2>Popular professional services</h2>
                <SlideList />
            </div>
        </section >
    )
}
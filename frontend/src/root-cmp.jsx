import React from 'react'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/app-header/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user/user-details'
import { HomePage } from './pages/home-page'
import { GigIndex } from './pages/gig/gig-index'
import { ChatApp } from './pages/chat-app'
import { ReviewIndex } from './pages/review-index'
import { AboutUs } from './pages/about-us'
import { AdminApp } from './pages/admin-app'
import { GigDetails } from './pages/gig/gig-details'
import { GigPayment } from './pages/gig/gig-payment'
import { UserMsg } from './cmps/user-msg'
import { UserIndex } from './pages/user/user-index'


export function RootCmp() {

    return (
        <>
            <section className="app main-layout">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user" element={<UserIndex />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    <Route path="/payment/:gigId" element={<GigPayment />} />

                    {/* <Route path="/review" element={<ReviewIndex />} /> */}
                    {/* <Route path="/chat" element={<ChatApp />} /> */}
                    {/* <Route path="/admin" element={<AdminApp />} /> */}
                </Routes>
                <AppFooter />
            </section>
            <UserMsg />

        </>
    )
}



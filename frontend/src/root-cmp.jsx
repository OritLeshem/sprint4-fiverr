import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { GigIndex } from './pages/gig-index'
import { ChatApp } from './pages/chat-app'
import { ReviewIndex } from './pages/review-index'
import { AboutUs } from './pages/about-us'
import { AdminApp } from './pages/admin-app'
import { GigDetails } from './pages/gig-details'
import { SellerDetails } from './pages/seller-details'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    <Route path="/seller/:sellerId" element={<SellerDetails />} />
                    {/* <Route path="/review" element={<ReviewIndex />} /> */}
                    {/* <Route path="/chat" element={<ChatApp />} /> */}
                    {/* <Route path="/admin" element={<AdminApp />} /> */}
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}



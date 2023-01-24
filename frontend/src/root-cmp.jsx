import React, { useRef } from 'react'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/app-header/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user/user-details'
import { HomePage } from './pages/home-page'
import { GigIndex } from './pages/gig/gig-index'
import { ChatApp } from './pages/chat-app'
import { AdminApp } from './pages/admin-app'
import { GigDetails } from './pages/gig/gig-details'
import { GigPayment } from './pages/gig/gig-payment'
import { GigEdit } from './pages/gig/gig-edit'
import { UserMsg } from './cmps/user-msg'
import { UserIndex } from './pages/user/user-index'


export function RootCmp() {
    // let app = useRef()

    // console.log('app.current:', app.current)

    // // const app = document.querySelector('.app');

    // const appObserver = new IntersectionObserver(updateApp, {});

    // appObserver.observe(app.current);

    // function updateApp(entries) {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             console.log('intersecting')
    //         } else {
    //             console.log('not intersecting')
    //         }
    //     });
    // }

    return (
        <>
            <section className="app main-layout">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/:userId" element={<UserIndex />} />
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    <Route path="/gig/edit/:gigId" element={<GigEdit />} />
                    <Route path="/gig/edit" element={<GigEdit />} />
                    <Route path="/payment/:gigId" element={<GigPayment />} />

                    {/* <Route path="/chat" element={<ChatApp />} /> */}
                    {/* <Route path="/admin" element={<AdminApp />} /> */}
                </Routes>
                <AppFooter />
            </section>
            <UserMsg />
        </>
    )
}



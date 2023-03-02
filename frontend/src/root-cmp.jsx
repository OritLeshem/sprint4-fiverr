import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/app-header/app-header'
import { AppFooter } from './cmps/app-footer'
import { HomePage } from './pages/home-page'
import { GigIndex } from './pages/gig/gig-index'
import { GigDetails } from './pages/gig/gig-details'
import { GigPayment } from './pages/gig/gig-payment'
import { GigEdit } from './pages/gig/gig-edit'
import { UserMsg } from './cmps/user-msg'
import { UserIndex } from './pages/user/user-index'
import UserWishList from './pages/user/user-wish-list'


export function RootCmp() {

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
                    <Route path="/wishlist" element={<UserWishList />} />
                </Routes>
                <AppFooter />
            </section>
            <UserMsg />
        </>
    )
}
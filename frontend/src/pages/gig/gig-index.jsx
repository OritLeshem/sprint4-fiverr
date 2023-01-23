import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../../store/gig/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { gigService } from '../../services/gig.service.js'
import { GigList } from '../../cmps/gig/gig-list.jsx'
import { SET_FILTER } from '../../store/gig/gig.reducer'
import { Search } from '../../cmps/app-header/header-search.jsx'
import { TopFilterBar } from '../../cmps/gig/top-filter-bar.jsx'

export function GigIndex() {
    const filterByFromStore = useSelector(storeState => storeState.gigModule.filterBy)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        // if (searchParams.get('category') || searchParams.get('title')) renderUiByQueryStringParams()
        renderUiByQueryStringParams()
    }, [])

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy, searchParams])

    function renderUiByQueryStringParams() {
        if (searchParams.get('title')) {
            filterBy.title = searchParams.get('title')
            setSearchParams(`title=${searchParams.get('title')}`)
        }

        if (searchParams.get('category')) {
            filterBy.tags = [searchParams.get('category')]
            setSearchParams(`category=${searchParams.get('category')}`)
        }

        if (searchParams.get('minPrice')) {
            filterBy.minPrice = [searchParams.get('minPrice')]
            setSearchParams(`minPrice=${searchParams.get('minPrice')}`)
        }

        if (searchParams.get('maxPrice')) {
            filterBy.maxPrice = [searchParams.get('maxPrice')]
            setSearchParams(`maxPrice=${searchParams.get('maxPrice')}`)
        }

        if (searchParams.get('daysToMake')) {
            filterBy.maxPrice = [searchParams.get('daysToMake')]
            setSearchParams(`daysToMake=${searchParams.get('daysToMake')}`)
        }

        onSetFilter(filterBy)
    }

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.vendor = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    async function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }
    }

    function onSetFilter(filterBy) {
        console.log(filterBy)
        if (filterByFromStore.tags[0]) filterBy.tags = filterByFromStore.tags
        if (filterByFromStore.title) filterBy.title = filterByFromStore.title
        dispatch({ type: SET_FILTER, filterBy })
        let categoryParams
        let queryStringParams
        if (filterByFromStore.title) {
            queryStringParams = `?title=${filterBy.title}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }

        else {
            if (filterByFromStore.tags[0]) { categoryParams = filterByFromStore.tags[0] }
            else { categoryParams = '' }
            queryStringParams = `?category=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }
    }

    // function onAddToCart(gig){
    //     console.log(`Adding ${gig.title} to Cart`)
    //     addToCart(gig)
    //     showSuccessMsg('Added to Cart')
    // }

    function onAddGigMsg(gig) {
        console.log(`TODO Adding msg to gig`)
    }

    function getCategoryName(category) {
        switch (category) {
            case "graphic-design":
                return <h1>Graphic & Design</h1>
                break
            case "digital-marketing":
                return <h1>Digital & Marketing</h1>
                break
            case "writing-translation":
                return <h1>Writing & Translation</h1>
                break
            case "video-animation":
                return <h1>Video & Animation</h1>
                break
            case "music-audio":
                return <h1>Music & Audio</h1>
                break
            case "programming-tech":
                return <h1>Programming & Tech</h1>
                break
            case "business":
                return <h1>Business</h1>
                break
            case "lifestyle":
                return <h1>Lifestyle</h1>
                break
            case "trending":
                return <h1>Trending</h1>
                break
        }
    }

    return <section className="gig-index">
        {(searchParams.get('title')&&searchParams.get('title')!=='')&&<h1>Results for "{searchParams.get('title')}"</h1>
        ||searchParams.get('category') && getCategoryName(searchParams.get('category')) || <h1>All</h1>}
        <TopFilterBar onSetFilter={onSetFilter} />
        {gigs.length > 0 && <p>{gigs.length} services available</p>}
        <GigList gigs={gigs} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} />
    </section>
}
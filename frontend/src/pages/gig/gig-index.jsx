import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { GigList } from '../../cmps/gig/gig-list.jsx'
import { TopFilterBar } from '../../cmps/gig/top-filter-bar.jsx'
import { SortyBy } from '../../cmps/gig/sortBy.jsx'

import { loadGigs } from '../../store/gig/gig.actions.js'
import { SET_FILTER, SET_SORT, SET_GIGS } from '../../store/gig/gig.reducer'
import {LOADING_START, LOADING_DONE } from '../../store/system.reducer'
import { socketService, SOCKET_EVENT_ORDER_FROM_YOU } from '../../services/socket.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'


export function GigIndex() {

    const filterByFromStore = useSelector(storeState => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    let gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
console.log(isLoading);
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    
    console.log('gigs from index outsie', gigs);

    useEffect(() => {
        renderUiByQueryStringParams()
        // return (() => {
        //     dispatch({ type: SET_GIGS, gigs: [] })
        // })
    }, [])

    useEffect(() => {
        dispatch({ type: LOADING_START})
        console.log('from use effect', isLoading)
        loadGigs(filterBy, sortBy)
        dispatch({ type: LOADING_DONE})
        console.log('from use effect after', isLoading)
    }, [filterBy, sortBy, searchParams])

    function renderUiByQueryStringParams() {
        if (searchParams.get('title')) {
            filterBy.title = searchParams.get('title')
        }

        if (searchParams.get('category')) {
            filterBy.tags = [searchParams.get('category')]
        }

        if (searchParams.get('minPrice')) {
            filterBy.minPrice = [searchParams.get('minPrice')]
        }

        if (searchParams.get('maxPrice')) {
            filterBy.maxPrice = [searchParams.get('maxPrice')]
        }

        if (searchParams.get('daysToMake')) {
            filterBy.maxPrice = [searchParams.get('daysToMake')]
        }
        onSetFilter(filterBy)
    }

    function onSetFilter(filterBy) {
        // console.log("filterby index", filterBy)
        if (filterByFromStore.tags[0]) {
            filterBy.tags = filterByFromStore.tags
        }
        if (filterByFromStore.title) filterBy.title = filterByFromStore.title

        dispatch({ type: SET_FILTER, filterBy })

        let categoryParams
        let queryStringParams

        if (filterByFromStore.title) {
            queryStringParams = `?title=${filterBy.title}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }

        else {
            if (filterByFromStore.tags[0] !== '' && filterByFromStore.tags[0] !== undefined) { categoryParams = filterByFromStore.tags[0] }
            else { categoryParams = '' }
            queryStringParams = `?category=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }
    }

    function getCategoryName(category) {
        switch (category) {
            case "graphic-design":
                return <h1>Graphic & Design</h1>

            case "digital-marketing":
                return <h1>Digital & Marketing</h1>

            case "writing-translation":
                return <h1>Writing & Translation</h1>

            case "video-animation":
                return <h1>Video & Animation</h1>

            case "music-audio":
                return <h1>Music & Audio</h1>

            case "programming-tech":
                return <h1>Programming & Tech</h1>

            case "business":
                return <h1>Business</h1>

            case "lifestyle":
                return <h1>Lifestyle</h1>

            case "trending":
                return <h1>Trending</h1>

            default: return
        }
    }

    function onSort(sortBy) {
        dispatch({ type: SET_SORT, sortBy })

    }

    if (isLoading) return <div className="loader-contauner">
        <div className="loader"></div>
    </div>
    if(!gigs.length&&!isLoading) return <div>sorry no gigs</div>
    return <section className="gig-index">
        {(searchParams.get('title') && searchParams.get('title') !== '') && <h1>Results for "{searchParams.get('title')}"</h1>
            || searchParams.get('category') && getCategoryName(searchParams.get('category')) || <h1>All</h1>}
        <div className='filter-sort'>
            <TopFilterBar onSetFilter={onSetFilter} />
            <SortyBy onSort={onSort} />
        </div>
        {gigs.length > 0 && <p>{gigs.length} services available</p>}
        {gigs && <GigList gigs={gigs} />}
    </section>
}
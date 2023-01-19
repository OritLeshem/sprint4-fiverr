import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.js'
import { GigList } from '../cmps/gig-list.jsx'
import { SET_FILTER } from '../store/gig.reducer'
import { Search } from '../cmps/gig-search.jsx'
import { TopFilterBar } from '../cmps/top-filter-bar.jsx'

export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get('category') || searchParams.get('title')) renderUiByQueryStringParams()
    }, [])

    useEffect(() => {
        // if (searchParams.get('category') || searchParams.get('title')) renderUiByQueryStringParams()
        loadGigs(filterBy)
    }, [filterBy,searchParams])

    function renderUiByQueryStringParams() {
        if (searchParams.get('title')){
            filterBy.title = searchParams.get('title')
            setSearchParams(`title=${searchParams.get('title')}`)
        }
        
        if (searchParams.get('category')) {
            filterBy.tags = [searchParams.get('category')]
            setSearchParams(`category=${searchParams.get('category')}`)
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
        dispatch({ type: SET_FILTER, filterBy })
    }

    // function onAddToCart(gig){
    //     console.log(`Adding ${gig.title} to Cart`)
    //     addToCart(gig)
    //     showSuccessMsg('Added to Cart')
    // }

    function onAddGigMsg(gig) {
        console.log(`TODO Adding msg to gig`)
    }

    return (
        <div>
            {/* <h3>Gigs App</h3> */}
            {/* <button onClick={onAddGig}>Add Gig ⛐</button> */}
            <TopFilterBar onSetFilter={onSetFilter} />
            <GigList gigs={gigs} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} />

        </div>
    )
}
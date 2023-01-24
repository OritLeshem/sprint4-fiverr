import { useEffect, useState, useRef } from "react"
import { gigService } from "../services/gig.service"
import { useDispatch, useSelector } from 'react-redux'

export function TopFilterBar({ onSetFilter }) {

    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)

    function handleChange(e) {
        const { target } = e
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        let newFilterBy= ({ ...filterBy, [field]: value })
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        if(field==="daysToMake") onSetFilter(newFilterBy)
    }

    function onSubmit() {
        onSetFilter(filterByToEdit)
        setIsPriceFilterShown(!isPriceFilterShown)
    }

    function onClear() {
        let newFilterBy= ({ ...filterBy, maxPrice: '', minPrice:'' })
        setFilterByToEdit(newFilterBy)
        onSetFilter(newFilterBy)
    }

    function onTogglePriceFilter(ev) {
        ev.preventDefault()
        if (ev.target.className === "filter-menu filter-price") setIsPriceFilterShown(!isPriceFilterShown)
        else return
    }

    return <div className="top-filter-bar">
        <select className="filter-menu filter-days" name="daysToMake" id="delivery" onChange={handleChange}>
            <option value="">Delivery Time</option>
            <option value="1">Express</option>
            <option value="3">Up to 3 days</option>
            <option value="7">Up to 7 days</option>
            <option value="">Anytime</option>
        </select>

        <div className="filter-menu filter-price" onClick={onTogglePriceFilter}>Budget <span className="fa-solid angle-down"></span>
            {isPriceFilterShown && <form className="price-filter-scroll">
                <div className="price-filter-inputs">
                    <div>
                        <label htmlFor="minPrice">Min.</label>
                        <input onChange={handleChange} value={filterByToEdit.minPrice} type="number" label="Min Price" className="min-price" id="outlined-basic" name="minPrice" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice">Max.</label>
                        <input onChange={handleChange} value={filterByToEdit.maxPrice} type="number" label="Max Price" className="max-price" id="outlined-basic" name="maxPrice" />
                    </div>
                </div>
                <div className="filter-price-btns">
                    <button onClick={onClear}>Clear All</button>
                    <button onClick={onSubmit}>Apply</button>
                </div>
            </form>
            }</div>
    </div>
}
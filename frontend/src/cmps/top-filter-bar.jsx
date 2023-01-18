import { useEffect, useState, useRef } from "react"
import { gigService } from "../services/gig.service"

export function TopFilterBar({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(true)
    const toggled = useRef(null)


    function handleChange({target}) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function onSubmit() {

    // }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onTogglePriceFilter(ev) {
        console.log(ev.target.className);
        ev.preventDefault()
        toggled.current=true
        if(toggled.current=true){
            if(ev.target.className==="filter-menu filter-price") setIsPriceFilterShown(!isPriceFilterShown)
            else return
        }
    }

    return <div className="top-filter-bar">
        <select className="filter-menu filter-days" name="daysToMake" id="delivery" onChange={handleChange}>
            <option value="">Delivery Time</option>
            <option value="1">Express</option>
            <option value="3">Up to 3 days</option>
            <option value="7">Up to 7 days</option>
            <option value="">Anytime</option>
        </select>

        <div className="filter-menu filter-price" onClick={onTogglePriceFilter}>Budget
            {isPriceFilterShown && <form className="price-filter-scroll">
                <div>
                    <label htmlFor="minPrice">Min.</label>
                    <input onChange={handleChange} type="number" label="Min Price" className="min-price" id="outlined-basic" name="minPrice" />
                </div>
                <div>
                    <label htmlFor="maxPrice">Max.</label>
                    <input onChange={handleChange} type="number" label="Max Price" className="max-price" id="outlined-basic" name="maxPrice" />
                </div>
            </form>
            }</div>
    </div>
}
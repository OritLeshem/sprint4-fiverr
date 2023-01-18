import { useEffect, useState } from "react"
import { gigService } from "../services/gig.service"

export function TopFilterBar({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onTogglePriceFilter(ev) {
        ev.preventDefault()
        setIsPriceFilterShown(!isPriceFilterShown)
    }

    return <div className="top-filter-bar">
        <select className="filter-menu filter-days" name="daysToMake" id="delivery" onChange={handleChange}>
            <option value="">Delivery Time</option>
            <option value="1">Express</option>
            <option value="3">Up to 3 days</option>
            <option value="7">Up to 7 days</option>
            <option value="">Anytime</option>
        </select>

        <div className="filter-menu filter-price" onClick={onTogglePriceFilter}>Budget</div>
        {isPriceFilterShown && <div className="price-filter-scroll">here is the filter</div>}
    </div>
}
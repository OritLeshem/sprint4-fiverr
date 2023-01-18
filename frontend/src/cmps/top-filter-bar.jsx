import { useState } from "react"
import { gigService } from "../services/gig.service"

export function TopFilterBar() {

    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
console.log(filterByToEdit);
    function handleChange({ target }) {
        console.log(target.value)
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <div className="top-filter-bar">
        <select name="delivery" id="delivery" onChange={handleChange}>
            <option value="">Delivery Time</option>
            <option value="express">Express</option>
            <option value="3days">Up to 3 days</option>
            <option value="7days">Up to 3 days</option>
            <option value="anytime">Anytime</option>
        </select>

        <div className="menu-filter filter-menu">Budget</div>
    </div>
}
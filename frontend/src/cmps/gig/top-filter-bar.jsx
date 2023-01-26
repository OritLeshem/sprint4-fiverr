import { useEffect, useState, useRef } from "react"
import { gigService } from "../../services/gig.service"
import { useSelector } from 'react-redux'

export function TopFilterBar({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isPriceFilterShown && ref.current && !ref.current.contains(e.target)) {
                setIsPriceFilterShown(false)
            }
            if (e.target.className === "filter-menu filter-price") {
                e.preventDefault()
                setIsPriceFilterShown(!isPriceFilterShown)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isPriceFilterShown])

    function handleChange(e) {
        const { target } = e
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        let newFilterBy = ({ ...filterByToEdit, [field]: value })
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        console.log("filter by from filter comp", newFilterBy)

        if (field === "daysToMake") onSetFilter(newFilterBy)
    }

    function onSubmit() {
        console.log("filter by from filter comp", filterByToEdit)
        onSetFilter(filterByToEdit)
        setIsPriceFilterShown(!isPriceFilterShown)
    }

    function onClear() {
        setFilterByToEdit(gigService.getDefaultFilter())
    }

    return <div className="top-filter-bar">
        <select className="filter-menu filter-days" name="daysToMake" id="delivery" onChange={handleChange}>
            <option value="">Delivery Time</option>
            <option value="1">Express</option>
            <option value="3">Up to 3 days</option>
            <option value="7">Up to 7 days</option>
            <option value="">Anytime</option>
        </select>

        <div className="filter-menu filter-price" ref={ref}>Budget  <span className="fa-solid angle-down"></span>
            {isPriceFilterShown && <form className="price-filter-scroll">
                <div className="price-filter-inputs">
                    <div>
                        <label htmlFor="minPrice">MIN.</label>
                        <input onChange={handleChange} value={filterByToEdit.minPrice} type="number" label="Min Price" className="min-price" id="outlined-basic" name="minPrice" placeholder="Any" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice">MAX.</label>
                        <input onChange={handleChange} value={filterByToEdit.maxPrice} type="number" label="Max Price" className="max-price" id="outlined-basic" name="maxPrice" placeholder="Any" />
                    </div>
                </div>
                <div className="filter-price-btns">
                    <div onClick={onClear}>Clear All</div>
                    <button onClick={onSubmit}>Apply</button>
                </div>
            </form>
            }
        </div>
    </div>
}
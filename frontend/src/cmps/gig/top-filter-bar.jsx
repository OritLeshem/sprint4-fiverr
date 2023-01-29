import { useEffect, useState, useRef } from "react"
import { gigService } from "../../services/gig.service"
import { useSelector } from 'react-redux'

export function TopFilterBar({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)
    const [isDeliveryshown, setisDeliveryshown] = useState(false)
    const ref = useRef()
    const deliveryRef = useRef()
    const checkedDelivery = filterByToEdit.daysToMake

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isPriceFilterShown && ref.current && !ref.current.contains(e.target)) {
                setIsPriceFilterShown(false)
            }
            if (isDeliveryshown && deliveryRef.current && !deliveryRef.current.contains(e.target)) {
                setisDeliveryshown(false)
            }
            if (e.target.className === "filter-menu filter-price ") {
                e.preventDefault()
                setIsPriceFilterShown(!isPriceFilterShown)
            }
            if (e.target.className === "filter-menu filter-price active-filter") {
                e.preventDefault()
                setIsPriceFilterShown(!isPriceFilterShown)
            }
            if (e.target.className === "filter-menu filter-delivery ") {
                e.preventDefault()
                setisDeliveryshown(!isDeliveryshown)
            }
            if (e.target.className === "filter-menu filter-delivery active-filter") {
                e.preventDefault()
                setisDeliveryshown(!isDeliveryshown)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isPriceFilterShown, isDeliveryshown])

    function handleChange(e) {
        const { target } = e
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        let newFilterBy = ({ ...filterByToEdit, [field]: value })
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

        if (field === "daysToMake") {
            onSetFilter(newFilterBy)
            setisDeliveryshown(false)
        }
    }

    function onSubmit() {
        onSetFilter(filterByToEdit)
        setIsPriceFilterShown(!isPriceFilterShown)
    }

    function onClear() {
        setFilterByToEdit(gigService.getDefaultFilter())
    }

    return <div className="top-filter-bar">
        <div className={`filter-menu filter-delivery ${checkedDelivery!=='' ? "active-filter" : "" ? "active-filter" : ""}`} ref={deliveryRef}>Delivery Time<span className="fa-solid angle-down"></span>
            {isDeliveryshown && <div className="delivery-filter-options">
                <div className="delivery-option">
                    <input type="radio" id="daysToMake1" name="daysToMake" value="1" onChange={handleChange} checked={checkedDelivery === '1'} />
                    <label htmlFor="daysToMake1"><span><div className="checked-input"></div></span>Express 24H</label>
                    </div>
                    <div className="delivery-option">
                        <input type="radio" id="daysToMake3" name="daysToMake" value="3" onChange={handleChange} checked={checkedDelivery === '3'} />
                        <label htmlFor="daysToMake3"><span><div className="checked-input"></div></span>Up to 3 days</label>
                    </div>
                    <div className="delivery-option">
                        <input type="radio" id="daysToMake7" name="daysToMake" value="7" onChange={handleChange} checked={checkedDelivery === '7'} />
                        <label htmlFor="daysToMake7"><span><div className="checked-input"></div></span>Up to 7 days</label>
                    </div>
                    <div className="delivery-option">
                        <input type="radio" id="daysToMake" name="daysToMake" value="" onChange={handleChange} checked={checkedDelivery === ''} />
                        <label htmlFor="daysToMake"><span><div className="checked-input"></div></span>Anytime</label>
                    </div>
            </div>
            }
        </div>
        
        <div className={`filter-menu filter-price ${(filterByToEdit.minPrice!==''||filterByToEdit.maxPrice!=='' ) ? "active-filter" : ""}`} ref={ref}>Budget  <span className="fa-solid angle-down"></span>
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
    </div >
}
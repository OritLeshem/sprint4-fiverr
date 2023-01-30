import { useEffect, useRef, useState } from "react"
import { gigService } from "../../services/gig.service"

export function SortyBy({ onSort }) {
  // const [sortBy, setSortBy] = useState(gigService.getDefaultSort())
  const sortBy = useRef(gigService.getDefaultSort())
  const [isSortByShown, setisSortByShown] = useState(false)
  const checkedCategory = sortBy.category
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isSortByShown && ref.current && !ref.current.contains(e.target)) {
        setisSortByShown(false)
      }
      if (e.target.className === "filter-menu sort-by") {
        e.preventDefault()
        setisSortByShown(!isSortByShown)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isSortByShown])

  function handleChangeSort({ target }) {
    setisSortByShown(false)
    let { value } = target
    sortBy.current.category = value
    onSort(sortBy.current)
    // setSortBy((prevSort) => {
    //   if (target.name === "sort-by") return { ...prevSort, category: value }
    //   return { ...prevSort, category: value }
    // })
  }

  return <div className="gig-sort">
    <div>Sort by</div><div className="filter-menu sort-by" ref={ref}>{sortBy.current.category}<span className="fa-solid angle-down"></span>
      {isSortByShown && <div className="sort-by-options">
        <div className="sort-option">
          <input type="radio" id="recommended" name="sort-by" value="recommended" onChange={handleChangeSort} checked={checkedCategory === 'recommended'} />
          <label htmlFor="recommended"><span><div className="checked-input"></div></span>Recommended</label>
        </div>
        <div className="sort-option">
          <input type="radio" id="price" name="sort-by" value="price" onChange={handleChangeSort} checked={checkedCategory === 'price'} />
          <label htmlFor="price"><span><div className="checked-input"></div></span>Price</label>
        </div>
      </div>
      }
    </div>
  </div>
}
import { useEffect, useState } from "react"
import { gigService } from "../../services/gig.service"

export function SortyBy({ onSort }) {
  const [sortBy, setSortBy] = useState(gigService.getDefaultSort())

  useEffect(() => {
    onSort(sortBy)
  }, [sortBy])

  function handleChangeSort({ target }) {
    let { value } = target
    setSortBy((prevSort) => {
      if (target.name === "sort-by") return { ...prevSort, category: value }
      return { ...prevSort, category: value }
    })
  }

  return <div className="gig-sort">
    <select name="sort-by" onChange={handleChangeSort} className="gig-sort-option">
      <option value="recommended">Recommended</option>
      <option value="price">Price</option>
    </select>
  </div>
}
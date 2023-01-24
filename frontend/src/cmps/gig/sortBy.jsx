import { useEffect, useState } from "react"
import { gigService } from "../../services/gig.service"

export function SortyBy({ onSort }) {
  const [sortBy, setSortBy] = useState(gigService.getDefaultSort())
  useEffect(() => {
    onSort(sortBy)
  }, [sortBy])

  function handleChangeSort({ target }) {
    console.log(target)
    let { value } = target
    // let { checked } = target
    setSortBy((prevSort) => {

      // if (target.name === "asc") return { ...prevSort, asc: checked }
      if (target.name === "sort-by") return { ...prevSort, category: value }
      return { ...prevSort, category: value }


    })
  }



  return <div className="gig-sort">
    {/* <span>Sort by</span> */}
    <select name="sort-by" onChange={handleChangeSort} className="gig-sort-option">
      <option value="recommended">Recommended</option>
      <option value="newest">Newest Arrivals</option>
    </select>


  </div>
}
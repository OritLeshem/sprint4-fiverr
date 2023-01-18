import { useEffect, useRef, useState } from "react"
import { gigService } from "../services/gig.service.js"
import { utilService } from "../services/util.service.js"


export function Search({ onSetFilter }) {

  const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())

  const debounceFilter = useRef(utilService.debounce(onSetFilter, 500))

  const elInputRef = useRef(null)



  // useEffect(() => {
  //   // update father cmp that filters change very type
  //   debounceFilter.current(filterByToEdit)
  // }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'number') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }
  console.log(filterByToEdit)

  function onSubmitFilter(ev) {
    // update father cmp that filters change on submit
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }


  return <form className="gig-search" onSubmit={onSubmitFilter}>
    {/* <label htmlFor="name">Name</label> */}
    <input type="text"
      className="gig-search"
      id="title"
      name="title"
      placeholder="What service are you looking for today?"
      value={filterByToEdit.title}
      onChange={handleChange}
      ref={elInputRef}
    />
    <button className=" btn-gig-search fa-solid magnifying-glass"></button>
  </form>
}
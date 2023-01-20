import { useRef, useState } from "react"

import { gigService } from "../services/gig.service"

export function Search({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
  const elInputRef = useRef(null)

  function handleChange({ target }) {
    let { value, name: field, type } = target
    console.log('value', value);
    value = (type === 'number') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    // update father cmp that filters change on submit
    ev.preventDefault()
    onSetFilter(filterByToEdit)
    setFilterByToEdit('')
  }


  return <form className="gig-search" onSubmit={onSubmitFilter}>
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
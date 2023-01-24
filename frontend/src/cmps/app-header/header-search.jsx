import { useRef, useState } from "react"

import { gigService } from "../../services/gig.service"

export function Search({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
  const elInputRef = useRef(null)
  const { pathname } = window.location

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'number') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }


  return <form className="gig-search" onSubmit={onSubmitFilter}>
    <input type="text"
      className="gig-search"
      id="title"
      name="title"
      placeholder={pathname === '/' ? " Try \"logo design\"" : "What service are you looking for today?"}
      value={filterByToEdit.title}
      onChange={handleChange}
      ref={elInputRef}
    />
    <button className={`btn-gig-search ${pathname !== '/' && 'fa-solid magnifying-glass'}`}>
      {pathname === '/' && 'Search'}
    </button>
  </form>
}
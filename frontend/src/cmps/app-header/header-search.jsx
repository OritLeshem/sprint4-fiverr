import { useEffect, useRef, useState } from "react"

import { gigService } from "../../services/gig.service"

export function Search({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
  const elInputRef = useRef(null)
  const { pathname } = window.location
  const [windowSize, setWindowSize] = useState(null)

  useEffect(() => {
    function handleResize() {
        setWindowSize(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
}, [])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'number') ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  function onPlaceholder() {
    let placeholder = 'What service are you looking for today?'

    if(pathname === '/') {
      placeholder = 'Try \"logo design\"'
    } else if(pathname !== '/' && windowSize < 900) {
      placeholder = 'Search...'
    }

    return placeholder
  }

  return <form className="gig-search" onSubmit={onSubmitFilter}>
    <input type="text"
      className="gig-search"
      id="title"
      name="title"
      placeholder= {onPlaceholder()}
      value={filterByToEdit.title}
      onChange={handleChange}
      ref={elInputRef}
    />
    <button className={`btn-gig-search ${pathname !== '/' && 'fa-solid magnifying-glass'}`}>
      {pathname === '/' && 'Search'}
    </button>
  </form>
}
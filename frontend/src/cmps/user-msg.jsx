import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_ORDER_FROM_YOU, SOCKET_EVENT_REVIEW_ABOUT_YOU } from "../services/socket.service.js"

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()


  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 2000)
    })

    socketService.on(SOCKET_EVENT_ORDER_FROM_YOU, (order) => {
      showSuccessMsg(`New order from ${order.buyer.fullname}`)
    })

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_FROM_YOU)
    }

  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return <section className={`user-msg ${msg.type}`}>
    {/* <button className="fa-solid xmark" onClick={closeMsg}></button> */}
    {msg.txt}
  </section>
}
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_TYPING, SOCKET_EVENT_STOP_TYPING, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_STOP_TYPING, SOCKET_EMIT_TYPING } from "../../services/socket.service"


export function GigChat({ gig }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  const [msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState(gig.chat || [])
  const [typingUsers, setTypingUsers] = useState([])
  const timeoutId = useRef(null)



  useEffect(() => {
    // Join room
    socketService.emit(SOCKET_EMIT_SET_TOPIC, gig._id)
    // Add listeners
    socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    socketService.on(SOCKET_EVENT_TYPING, addTypingUser)
    socketService.on(SOCKET_EVENT_STOP_TYPING, removeTypingUser)

    return () => {
      socketService.off(SOCKET_EMIT_SEND_MSG, addMsg)
      socketService.off(SOCKET_EMIT_TYPING, addTypingUser)
      socketService.off(SOCKET_EMIT_STOP_TYPING, removeTypingUser)
    }
    // Add listeners
    // socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    // socketService.on(SOCKET_EVENT_STOP_TYPING, addTypingUser)
    // socketService.on(SOCKET_EVENT_STOP_TYPING, removeTypingUser)


  }, [])
  function addMsg(newMsg) {
    setMsgs(prevMsgs => [...prevMsgs, newMsg])
  }
  function addTypingUser(user) {
    // Must use prev to get the latest state - otherwise
    // it won't work!
    setTypingUsers((prevTypingUsers) => ([...prevTypingUsers, user]))
  }

  function removeTypingUser(user) {
    // Must use prev to get the latest state - otherwise
    // it won't work! - like the commented line -> typing users will ALWAYS BE an empty array
    // const updatedTypingUsers = typingUsers.filter((existingUser) => existingUser !== user)
    setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((existingUser) => existingUser !== user))
  }
  function sendMessage(ev) {
    ev.preventDefault()
    const from = user?.fullname || 'Guest'
    const newMsg = { from, txt: msg }
    socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
    socketService.emit(SOCKET_EMIT_STOP_TYPING, from)

    console.log("message has been sent")
    clearTimeout(timeoutId.current)
    timeoutId.current = null
    setMsg('')
  }

  function handleChange(ev) {
    ev.preventDefault()
    setMsg(ev.target.value)
    console.log(msg)
    // If there is no timeout yet - emit typing! - will happen only once!
    if (!timeoutId.current) socketService.emit(SOCKET_EMIT_TYPING, user?.fullname || 'Guest')
    // If there is a timeout - clear it!
    if (timeoutId.current) clearTimeout(timeoutId.current)
    // reactivate the timeout - when calling the CB - stop typing + clear timeoutId
    timeoutId.current = setTimeout(() => {
      socketService.emit(SOCKET_EMIT_STOP_TYPING, user?.fullname || 'Guest')
      timeoutId.current = null
    }, 2000);

  }


  return <div>
    <h2>Chat with the seller</h2>
    <form onSubmit={sendMessage}>
      <input type="text" placeholder="Enter message here..." value={msg} onChange={handleChange} />
      <button>Send</button>
      <ul>
        {msgs.map((msg, idx) => <li key={idx}>{msg.from}:{msg.txt}</li>)}
      </ul>
      <p style={{ color: "#b5b6ba" }} className="typing-msg">{typingUsers.length ? `${typingUsers[0]} is typing....` : ''}</p>
      {/* <p style={{ color: "#b5b6ba" }} className="typing-msg">{typingUsers.length ? `Typing users: ${typingUsers.join(', ')}` : ''}</p> */}

    </form>



  </div >

}

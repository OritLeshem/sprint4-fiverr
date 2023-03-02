
import { useEffect, useState } from "react"
import { socketService, SOCKET_EVENT_ORDER_UPDATED, SOCKET_JOIN_ROOM } from "../../services/socket.service"

export function GigForChat({ gigId, username }) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    socketService.receiveMessage(currentMessage)
    //  setMessageList((list) => [...list, currentMessage]);
  }, [])

  function sendMessage() {
    if (currentMessage !== "") {
      const messageData = {
        gigId,
        username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
      console.log(messageData)
      socketService.sendMessage(messageData)
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }

  }
  return <div>
    hello from chat
    <div className="chat-header">
      <p>Live chat</p>
    </div>
    <div className="chat-body"></div>
    <div className="chat-footer">
      <input type="text" placeholder="Hey..." onChange={(event) => setCurrentMessage(event.target.value)} />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  </div>

}
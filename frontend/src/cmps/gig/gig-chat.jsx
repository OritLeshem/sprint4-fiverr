import { useSelector } from "react-redux"
import { GigForChat } from "../../pages/gig/gig-for-chat"
import { socketService, SOCKET_EVENT_ORDER_UPDATED, SOCKET_JOIN_ROOM } from "../../services/socket.service"

export function GigChat({ gig }) {
  const user = useSelector((storeState) => storeState.userModule.user)

  function onJoinRoom() {
    socketService.joinRoom(user, gig)
  }
  // function updateStatus(status, order) {
  //   order.status = status
  //   // updateOrder(order)
  //   socketService.emit(SOCKET_EVENT_ORDER_UPDATED,
  //     {
  //       sellerName: order.seller.fullname,
  //       status: order.status,
  //       buyerId: order.buyer._id
  //     })
  //   // setIsModal(!isModal)
  // }
  return <div>
    <h1>join our chat</h1>
    <button onClick={() => onJoinRoom(user, gig)}>Chat with the seller</button>
    <h2>username:{user.fullname}</h2>
    <h2>seller name: {gig.owner.fullname}</h2>
    <h2>this chat is about : {gig._id}</h2>
    <GigForChat gigId={gig._id} username={user.fullname} />

    {/* <span className="approved" onClick={() => updateStatus("approved", order)}>Approved</span> */}

  </div>
}
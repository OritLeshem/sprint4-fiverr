import { useEffect } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../services/user.service"
import { loadOrders } from "../../store/order/order.actions"

export function UserSales() {

  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()
  useEffect(() => {
    // if (searchParams.get('category') || searchParams.get('title')) renderUiByQueryStringParams()
    loadOrders(user._id)
    console.log(orders)
  }, [])


  console.log(orders)
  return <div>
    <table>
      <thead>
        <tr>
          <th>Order id</th>
          <th>Buyer</th>
          <th>Gig title</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          return <tr key={order._id}>

            <td>{order._id}</td>
            <td>{order.buyer.fullname}</td>
            <td>{order.gig.title}</td>
            <td>{order.gig.price}</td>
            <td>{order.status}</td>
          </tr>
        })}
      </tbody>
    </table>


  </div>
}
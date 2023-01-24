import { useEffect } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../../services/user.service"
import { loadOrders } from "../../../store/order/order.actions"
import UserSellerTable from "./user-seller-table"

export function UserSales() {

  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()

  useEffect(() => {
    loadOrders(user._id)
  }, [])

  return <div className="user-sales">
    <UserSellerTable orders={orders.filter(order => order.seller._id === user._id)} />
  </div>
}
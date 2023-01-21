import { useEffect } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../services/user.service"
import { loadOrders } from "../../store/order/order.actions"
import BasicTable from "./user-sales-table"

export function UserSales() {

  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()
  useEffect(() => {
    loadOrders(user._id)
  }, [])

  return <div>
    <BasicTable orders={orders} />
  </div>
}
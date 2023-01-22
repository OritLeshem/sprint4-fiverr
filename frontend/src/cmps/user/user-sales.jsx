import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../services/user.service"
import { loadOrders } from "../../store/order/order.actions"
import UserBuyTable from "./user-buy-table"
import UserSellerTable from "./user-seller-table"
import BasicTable from "./user-seller-table"

export function UserSales() {

  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()

  useEffect(() => {
    loadOrders(user._id)
  }, [])

  return <div className="user-sales">

    <UserSellerTable orders={orders.filter(order => order.seller._id === user._id)} />
    {/* <h2>Buy</h2>
    <UserBuyTable orders={orders.filter(order => order.buyer._id === user._id)} /> */}
  </div>
}
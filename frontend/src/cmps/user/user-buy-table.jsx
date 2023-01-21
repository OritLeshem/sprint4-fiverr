import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userService } from "../../services/user.service"
import { gigService } from "../../services/gig.service"


import { loadOrders } from "../../store/order/order.actions"


export default function UserBuyTable() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()

  useEffect(() => {
    loadOrders(user._id)
  }, [])

  return (
    <div>
      {orders.filter(order => order.buyer._id === user._id)
        .map(order => <div className="buy-order-list" key={order._id}>
          <img className='buy-order-img' src={order.gig.imgUrl[0]} />

          <div className='buy-order-info' >
            <div>{order.gig.title}</div>
            <div className='buy-order-seller-status'>
              <div className='buy-order-sellername'>{order.seller.fullname}</div>
              <div className='buy-order-status'>{order.status}</div>
            </div>
          </div>
        </div>)}
    </div>
  )
}


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


export default function UserBuyTable({ orders }) {
  // const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()

  // useEffect(() => {
  //   loadOrders(user._id)
  // }, [])
  useEffect(() => { }, [])
  return (
    <div>
      {orders.map(order => <div key={order._id}>

      </div>)}
    </div>
  )
}


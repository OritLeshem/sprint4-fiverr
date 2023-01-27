import { useState } from "react"
import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { updateOrder } from "../../../store/order/order.actions";
import { ProgressChart } from "../../progress-chart";
import { useEffect } from "react";

export default function UserSellerTable({ orders }) {
  const [isModal, setIsModal] = useState({ id: '', status: false })
  const [totalSum, settotalSum] = useState(0)

  useEffect(() => {
    if (!orders) return
    orders.forEach(order => {
      const price = order.gig.price ? order.gig.price : 0
      settotalSum(prev => prev + price)
    })
  }, [])

  function toggleStatusModal(orderId) {
    setIsModal(prevModal => ({ ...prevModal, id: orderId, status: !prevModal.status }))
  }
  let statistic
  orders && calcAnalysis()

  function calcAnalysis() {
    statistic = orders.reduce((acc, val) => {
      acc[val.status] = acc[val.status] ? ++acc[val.status] : 1
      return acc
    }, {})
  }

  function updateStatus(status, order) {
    order.status = status
    updateOrder(order)
    setIsModal(!isModal)
  }

  const pending = statistic.pending ? statistic.pending : 0
  const approved = statistic.approved ? statistic.approved : 0
  const declined = statistic.declined ? statistic.declined : 0

  const _5b85fd = "#5b85fd"
  const _f46875 = "#f46875"
  const _feb849 = "#feb849"
  const _21ca79 = "#21ca79"

  console.log('orders:', orders)

  return <section className="user-seller-table">
    {statistic && <ul className="statstic-dashboard">
      <li>
        <h4>Active orders</h4>
        <span className="orders-num">{orders.length ? orders.length : 0}</span>
        <span>{`($${totalSum})`}</span>
      </li>
      <li>
        <h4>Pending</h4>
        <ProgressChart percent={pending / orders.length} bgc={_feb849} />
      </li>
      <li>
        <h4>Approved</h4>
        <ProgressChart percent={approved / orders.length} bgc={_f46875} />
      </li>
      <li>
        <h4>Declined</h4>
        <ProgressChart percent={declined / orders.length} bgc={_5b85fd} />
      </li>
    </ul>}

    <ul className="orders-dashboard">
      {orders.map(order =>
        <li key={order._id}>
          <div>
            <small>Gig</small>
            {order.gig.title}
          </div>
          <div>
            <small>Buyer</small>
            {order.buyer.fullname}
          </div>
          <div>
            <small>Price</small>
            ${order.gig.price}
          </div>
          <div>
            <small>Status</small>
            {order.status}
          </div>
        </li>)}
    </ul>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order id</TableCell>
            <TableCell align="left">Buyer</TableCell>
            <TableCell align="left">Gig title</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order._id}
              </TableCell>
              <TableCell align="left">{order.buyer.fullname}</TableCell>
              <TableCell align="left">{order.gig.title}</TableCell>
              <TableCell align="center">
                {order.gig.price}
              </TableCell>
              <TableCell align="left">
                {(isModal.status && isModal.id === order._id) && <div className="status-options">
                  <button className="pending" onClick={() => updateStatus("pending", order)}>Pending</button>
                  <button className="approved" onClick={() => updateStatus("approved", order)}>Approved</button>
                  <button className="completed" onClick={() => updateStatus("completed", order)}>Completed</button>
                  <button className="declined" onClick={() => updateStatus("declined", order)}>Declined</button>
                </div>}
                <button className={order.status} onClick={() => toggleStatusModal(order._id)}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </section>
}


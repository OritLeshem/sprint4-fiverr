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

export default function UserSellerTable({ orders }) {
  const [isModal, setIsModal] = useState({ id: '', status: false })

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

  return <section className="user-seller-table">
    {statistic && <ul className="statstic">
      <li>
        <h4>Total sales</h4>
        {/* <div className="statstic-preview"></div> */}
        <span>{orders.length ? orders.length : 0}</span>
      </li>
      <li><h4>Completed</h4><span>{statistic.completed ? statistic.completed : 0}</span></li>
      <li><h4>Pending</h4><span>{statistic.pending ? statistic.pending : 0}</span></li>
      <li><h4>Approved</h4><span>{statistic.approved ? statistic.approved : 0}</span></li>
      <li><h4>Declined</h4><span>{statistic.declined ? statistic.declined : 0}</span></li>
    </ul>}

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
              <TableCell align="center">{order.gig.price}</TableCell>
              <TableCell align="left">
                {(isModal.status && isModal.id === order._id) && <div className="status-options">
                  <button className="pending" onClick={() => updateStatus("pending", order)}>Pending</button>
                  <button className="approved" onClick={() => updateStatus("approved", order)}>Approved</button>
                  <button className="completed" onClick={() => updateStatus("completed", order)}>Completed</button>
                  <button className="declined" onClick={() => updateStatus("declined", order)}>Declined</button>
                </div>
                }
                <button className={order.status} onClick={() => toggleStatusModal(order._id)}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </section>
}


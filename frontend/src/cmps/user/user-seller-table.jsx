import { useEffect, useState } from "react"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { updateOrder } from "../../store/order/order.actions";



export default function UserSellerTable({ orders }) {

  const [isModal, setIsModal] = useState({ id: '', status: false })

  function toggleStatusModal(orderId) {
    setIsModal(prevModal => ({ ...prevModal, id: orderId, status: !prevModal.status }))
  }

  function updateStatus(status, order) {
    order.status = status
    updateOrder(order)
    setIsModal(!isModal)
  }

  return (
    <div className="status-options-btn">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order id</TableCell>
              <TableCell align="right">Buyer</TableCell>
              <TableCell align="right">Gig title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
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
                <TableCell align="right">{order.buyer.fullname}</TableCell>
                <TableCell align="right">{order.gig.title}</TableCell>
                <TableCell align="right">{order.gig.price}</TableCell>
                <TableCell align="right">
                  {(isModal.status && isModal.id === order._id) && <div className="status-options">
                    <button className="pending" onClick={() => updateStatus("Pending", order)}>Pending</button>
                    <button className="completed" onClick={() => updateStatus("Completed", order)}>Completed</button>
                    <button className="declined" onClick={() => updateStatus("Declined", order)}>Declined</button>
                  </div>
                  }
                  <button className={order.status} onClick={() => toggleStatusModal(order._id)}>{order.status}</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


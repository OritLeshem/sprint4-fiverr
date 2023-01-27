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

  return <section className="user-seller-table">
    {statistic && <ul className="statstic-dashboard">
      <li>
        <h4>Active orders</h4>
        <span className="orders-num">{orders.length ? orders.length : 0}</span>
        <span>{`($${totalSum})`}</span>
      </li>
      <li>
        <h4>Pending</h4>
        <ProgressChart percent={pending / orders.length} bgc={"#feb849"} />
      </li>
      <li>
        <h4>Approved</h4>
        <ProgressChart percent={approved / orders.length} bgc={"#21ca79"} />
      </li>
      <li>
        <h4>Declined</h4>
        <ProgressChart percent={declined / orders.length} bgc={"#f46875"} />
      </li>
    </ul>
    }

    <ul className="orders-dashboard">
      {orders.map(order =>
        <li key={order._id}>
          <div><small>Gig</small>{order.gig.title}</div>
          <div><small>Buyer</small>{order.buyer.fullname}</div>
          <div><small>Price</small>${order.gig.price}</div>
          <div>
            <small>Status</small>
            <span className={order.status} onClick={() => toggleStatusModal(order._id)}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            <div className="status-container">
              {(isModal.status && isModal.id === order._id) && <div className="status-options">
                <span className="approved" onClick={() => updateStatus("approved", order)}>Approved</span>
                <span className="completed" onClick={() => updateStatus("completed", order)}>Completed</span>
                <span className="declined" onClick={() => updateStatus("declined", order)}>Declined</span>
              </div>}
            </div>
          </div>
        </li>)}
    </ul>
  </section>
}


import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../../services/event-bus.service"
import { gigService } from "../../services/gig.service"
import { orderService } from "../../services/order.service"
import { userService } from "../../services/user.service"

export function OrderDetails() {

  const [order, setOrder] = useState()
  const [gig, setGig] = useState()
  const { orderId } = useParams()
  const navigate = useNavigate()
  const loginUser = userService.getLoggedinUser()


  useEffect(() => {
    loadOrder(orderId)
    // loadGig(order.gig._id)
  }, [orderId])

  useEffect(() => {
    // loadGig()
  }, [])

  // async function loadGig() {
  //   try {
  //     const gig = await gigService.getById(order.gig._id)
  //     setGig(gig)
  //   }
  //   catch (err) {
  //     console.log('had issue in gig details', err)
  //     showErrorMsg('cannot load gig')
  //     navigate('/gig')
  //   }
  // }


  async function loadOrder() {
    try {
      const order = await orderService.getById(orderId)
      const gig = await gigService.getById(order.gig._id)

      setOrder(order)
      setGig(gig)
    }
    catch (err) {
      console.log('had issue in gig details', err)
      showErrorMsg('cannot load gig')
      navigate('/gig')
    }
  }

  return <div>hello from order detail
    {order && <h1>order id:{order._id}</h1>}
    {gig && <h1>gig id:{gig._id}</h1>}
    {loginUser && <h1>loginUser id:{loginUser._id}</h1>}

  </div>
}
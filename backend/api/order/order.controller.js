const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const orderService = require('./order.service')
async function getOrders(req, res) {
    try {
        const orders = await orderService.query()
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    var { loggedinUser } = req
    try {
        var order = req.body
        order = await orderService.add(order)

        // socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'order-from-you', data: order, userId: review.aboutUser._id })
        // socketService.emitTo({ type: 'user-updated', data: user, label: user._id })

        res.send(order)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    try {
        const order = req.body
        const updatedOrder = await orderService.update(order)
        res.json(updatedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })

    }
}


module.exports = {
    getOrders,
    updateOrder,
    addOrder
}
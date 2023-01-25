const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query() {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find().toArray()
        // var orders = await collection.aggregate([
        //     {
        //         $match: criteria
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'aboutUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]
        // ).toArray()
        // orders = orders.map(order => {
        //     order.byUser = { _id: order.byUser._id, fullname: order.byUser.fullname }
        //     order.aboutUser = { _id: order.aboutUser._id, fullname: order.aboutUser.fullname }
        //     delete order.byUserId
        //     delete order.aboutUserId
        //     return order
        // })

        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }

}

// async function remove(orderId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { loggedinUser } = store
//         const collection = await dbService.getCollection('order')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(orderId) }
//         if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
//         const {deletedCount} = await collection.deleteOne(criteria)
//         return deletedCount
//     } catch (err) {
//         logger.error(`cannot remove order ${orderId}`, err)
//         throw err
//     }
// }


async function add(order) {
    try {
        const order = {
            buyer: {
                _id: user._id,
                fullname: user.fullname
            },
            seller: {
                _id: gig.owner._id,
                fullname: gig.owner.fullname,
            },
            gig: {
                _id: gig._id,
                title: gig.title,
                price: gig.price,
                imgUrl: gig.imgUrl
            },
            status: "pending"
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
//     return criteria
// }

module.exports = {
    query,
    remove,
    add
}



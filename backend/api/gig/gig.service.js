const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
// let filterBy="draw"
async function query(filterBy, sortBy, userId) {
    console.log("hello from service")
    const test = await Promise.resolve("hello from resolve")
    try {
        const criteria = _buildCriteria(filterBy, userId)
        const collection = await dbService.getCollection('gig')
        const sort = (sortBy.category === 'recommended') ? { "owner.rate": -1 } : { "price": 1 }
        var gigs = await collection.find(criteria).sort(sort).toArray()
        // var gigs = await collection.find({ "$and": [{ "owner._id": ObjectId(userId) }, criteria] }).sort(sort).toArray()

        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}
function _buildCriteria(filterBy, userId) {
    let criteria = {}
    if (userId) {
        criteria = { "owner._id": ObjectId(userId) }
    } else {
        if (filterBy.title) {
            criteria.title = { $regex: filterBy.title, $options: 'i' }
        }
        if (filterBy.maxPrice === '') filterBy.maxPrice = 10000
        if (filterBy.minPrice || filterBy.maxPrice) {
            console.log("minprice", filterBy.minPrice)
            criteria = { ...criteria, "$and": [{ "price": { "$gt": +filterBy.minPrice } }, { "price": { "$lte": +filterBy.maxPrice } }] }
        }
        if (filterBy.daysToMake) {
            criteria.daysToMake = { $lte: +filterBy.daysToMake || Infinity }
        }

        if (filterBy?.tags?.length) {
            criteria.tags = { $in: filterBy.tags }
        }
    }
    return criteria
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig = collection.findOne({ _id: ObjectId(gigId) })
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}
async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ _id: ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}
async function add(gig) {
    try {
        console.log('gig.owner', gig.owner)
        gig.owner._id = ObjectId(gig.owner._id)
        const collection = await dbService.getCollection('gig')
        await collection.insertOne(gig)
        return gig
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}
async function update(gig) {
    try {
        const gigToSave = {
            price: gig.price,
            title: gig.title,
            description: gig.description,
            tags: gig.tags,
            daysToMake: gig.daysToMake,
            imgUrl: gig.imgUrl
        }
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ _id: ObjectId(gig._id) }, { $set: gigToSave })
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gig._id}`, err)
        throw err
    }
}
// async function addGigMsg(gigId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('gig')
//         await collection.updateOne({ _id: ObjectId(gigId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add gig msg ${gigId}`, err)
//         throw err
//     }
// }
// async function removeGigMsg(gigId, msgId) {
//     try {
//         const collection = await dbService.getCollection('gig')
//         await collection.updateOne({ _id: ObjectId(gigId) }, { $pull: { msgs: {id: msgId} } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add gig msg ${gigId}`, err)
//         throw err
//     }
// }
module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    // addGigMsg,
    // removeGigMsg
}
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
// let filterBy="draw"
async function query(filterBy, sortBy, userId) {

    console.log("query filter by", filterBy.title)
    try {
        const criteria = _buildCriteria(filterBy,userId)
        const collection = await dbService.getCollection('gig')
        // var gigs = await collection.find(criteria).toArray()
        // const sort = { "price": -1 }
        const sort = (sortBy.category === 'recommended') ? { "owner.rate": -1 } : { "price": -1 }

        // const sort = { "rate": -1 }
        const sort1 = { "owner": { "rate": -1 } }
        // const sort1 = {  "rate": -1 } }

        // var gigs = await collection.find(criteria).sort(sort).toArray()
        // var gigs = await collection.find({$or:[criteria,{ "owner._id": ObjectId(userId)}]}).sort(sort).toArray()

        if (filterBy) {
        var gigs = await collection.find(criteria).sort(sort).toArray()
    }

        if (userId) {
            var gigs = await collection.find({ "owner._id": ObjectId(userId)}).toArray()
        }
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}
function _buildCriteria(filterBy, userId) {
    console.log("criteria filter by", filterBy.title)
    let criteria = {}
    // console.log(filterBy)
    if (filterBy.title) {
        criteria.title = { $regex: filterBy.title, $options: 'i' }
    }
    if (filterBy.minPrice || filterBy.maxPrice) {
        console.log("minprice", filterBy.minPrice)
        // criteria.price = { $lte: +filterBy.price || Infinity }
        criteria = { ...criteria, "$and": [{ "price": { "$gt": +filterBy.minPrice } }, { "price": { "$lte": +filterBy.maxPrice } }] }
    }
    if (filterBy.daysToMake) {
        criteria.daysToMake = { $lte: +filterBy.daysToMake || Infinity }
    }
    // if (filterBy.inStock === 'true') {
    //   criteria.inStock = true
    // }
    if (filterBy?.tags?.length) {
        criteria.tags = { $all: filterBy.tags }
    }
    // if (userId) {
    //     console.log('userId creitirais', userId);
    //     criteria.userId = { $eq: ObjectId(owner._id) }
    // }
    console.log("criteria", criteria)
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
            // vendor: gig.vendor,
            price: gig.price
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
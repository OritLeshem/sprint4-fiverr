import { createStore, combineReducers } from 'redux'

import { gigReducer } from './gig/gig.reducer.js'
import { userReducer } from './user/user.reducer.js'
import { orderReducer } from './order/order.reducer.js'
import { systemReducer } from './system/system.reducer.js'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    orderModule: orderReducer,
})

export const store = createStore(rootReducer)

// store.subscribe(() => {
//     console.log('storeState:\n', store.getState())
// })




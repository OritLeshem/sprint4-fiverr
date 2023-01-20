import { createStore, combineReducers } from 'redux'

import { gigReducer } from './gig/gig.reducer.js'
import { userReducer } from './user/user.reducer.js'
import { reviewReducer } from './review/review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})

export const store = createStore(rootReducer)

store.subscribe(() => {
    console.log('storeState:\n', store.getState())
})




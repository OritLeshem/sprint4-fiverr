export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const CHANGE_MSG = 'CHANGE_MSG'

const initialState = {
  isLoading: false,
  userMsg: null,
  // etc...
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case CHANGE_MSG:
      return { ...state, userMsg: action.msg }
    default: return state
  }
}
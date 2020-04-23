//reducer.js
const initialState = {
  count: 0
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'plus':
      return {
        ...state,
        count: state.count + 1
      }
    case 'subtract':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return initialState
  }
}

export function reducerTwo(state = { yellow:1 }, action) {
  switch (action.type) {
    case 'multy':
      return {
        ...state,
        yellow: state.yellow * 2
      }
    case 'del':
      return {
        ...state,
        yellow: state.yellow / 2
      }
    default:
      return initialState
  }
}
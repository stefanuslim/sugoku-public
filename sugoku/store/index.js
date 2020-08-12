import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  boards: [],
  status: '',
  players: []
}


const reducers = (state = initialState, action) => {
  switch(action.type) {
    case "SET_BOARDS":
      return {
        ...state,
        boards: action.payload.boards
      }
    case "SET_VALIDATE":
      return {
        ...state,
        status: action.payload.status
      }
    case "SET_SOLVED":
        return {
          ...state,
          boards: action.payload.boards,
          status: action.payload.status
        }
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.payload.players.sort((a, b) => {
            return b.time - a.time;
          })
      }
    default:
      return state
  }
}


const store = createStore(reducers, applyMiddleware(thunk))

export default store

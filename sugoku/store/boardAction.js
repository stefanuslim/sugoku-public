import { AsyncStorage } from 'react-native';

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
const encodeParams = (params) =>
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');


export const getBoards =(difficulty) => {
  return (dispatch => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(resp => resp.json())
    .then((data) => {
      dispatch({
        type: 'SET_BOARDS',
        payload: {
          boards: data.board
        }
      })
    })
  })
}


export const validate = (boards, dataPlayer) => {
  return(dispatch => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(boards)
    })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: 'SET_VALIDATE',
        payload: {
          status: data.status
        }
      })
      AsyncStorage.getItem('Players',(err,res) => {
        let dataToStorage
        if(res == null){
          dataToStorage = []
          dataToStorage.push(dataPlayer)
          dataToStorage[0]["status"] = data.status
          AsyncStorage.setItem('Players',JSON.stringify({data:dataToStorage}),(err,res) => {
            console.log(res)
          })
        }
        else{
          dataToStorage = JSON.parse(res).data
          dataToStorage.push(dataPlayer)
          dataToStorage[dataToStorage.length-1]["status"] = data.status
          AsyncStorage.setItem('Players',JSON.stringify({data:dataToStorage}),(err,res) => {
            console.log(res)
          })
        }
      })
    })
  })
}


export const solve = (boards) => {
  return(dispatch => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodeParams({board: boards}),
    })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: 'SET_SOLVED',
        payload: {
          boards: data.solution,
          status: data.status
        }
      })
    })
  })
}


export const getPlayers = () => {
  return (async(dispatch) => {
    AsyncStorage.getItem('Players',(err,res) => {
      dispatch({
        type:'SET_PLAYERS',
        payload: {
          players: res == null ? [] : JSON.parse(res).data
        }
      })
    })
  })
}
//

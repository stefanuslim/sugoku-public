import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getBoards, validate, solve } from '../store/boardAction.js'




export default function Board({ navigation, route }) {
  const { boards, status, solvedBoards } = useSelector(state => state)
  const [secondBoards, setSecondBoards] = useState([])
  const [text, setText] = useState('0')
  const [timer, setTimer] = useState(null)
  const [seconds, setSeconds] = useState(60)
  const [start, setStart] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getBoards('easy'))
      onStop()
    });
    return unsubscribe;
  },[navigation])

  useEffect(() => {
    setSecondBoards(boards)
  },[boards])


  const onChangeText = (text, row, col) => {
    const tempBoard = JSON.parse(JSON.stringify(secondBoards))
    if(isNaN(text) === false && +text < 10) {
      tempBoard[row][col] = +text
      setSecondBoards(tempBoard)
      setText(text)
    }
  }

  const onSubmitValidate = (secondBoards) => {
    const dataPlayer = {username: !route.params ? 'Player' : route.params.username, time:seconds}
    if(secondBoards[0].includes(0) === true){
      dispatch(validate(secondBoards, dataPlayer))
    }
    onStop()
    navigation.navigate('Status',{
      username: !route.params ? 'Player' : route.params.username
    })
  }

  const onSubmitSolve = (boards) => {
    dispatch(solve(boards))
    onStop()
  }

  const onSubmitLevel = (level) => {
    dispatch(getBoards(level))
    onStop()
  }

  const onSubmitReset = () => {
    dispatch(getBoards('easy'))
    onStop()
  }

  const onStop = () => {
    clearInterval(timer)
    setTimer(null)
    setSeconds(60)
    setStart(false)
  }

  const onStart = (seconds) => {
    setStart(true)
    let timer = setInterval(() => {
      setSeconds(seconds => seconds - 1)
    },1000)
    setTimer(timer)
  }

  useEffect(() => {
    if(seconds === 0) {
      clearInterval(timer)
      setTimer(null)
      onSubmitValidate(secondBoards)
    }
  },[seconds])


  return (
    <View style={styles.container}>
    {
      secondBoards.length === 0 ? <ActivityIndicator size="large"/> : (
        <View style={styles.container}>
        <Text style={{marginBottom:10}}>
        <Text style={{fontSize: 30}}>Solve It Now!</Text>
        </Text>
        <View>
        <Button
          onPress={() => onStart(seconds)}
          title="Start"
          color="#c91d14"
        />
        <Text style={{textAlign:'center', marginTop:10, fontSize:20}}> 00:{seconds < 10 ? `0${seconds}` : seconds} </Text>
        </View>
      <View style={{flexDirection:'row', marginBottom: 10}}>
      {
        [{level:'Easy',color:"#158473"},{level:'Medium',color:"#9e2c87"},{level:'Hard',color:"#9e342c"}].map((item,idx) => (
          <View style={{marginRight: 20}} key={idx}>
          <Button
            onPress={() => onSubmitLevel(item.level.toLowerCase())}
            title={item.level}
            color={item.color}
          />
          </View>
        ))
      }
      </View>
      {
        secondBoards.map((board, row) => {
          return(
            <View style={(row+1) % 3 === 0 && row !== 8 ? styles.boardSpecialBottomBorder: styles.boardNormalBottomBorder} key={row}>
            {
              board.map((num,col) => {
                  return(
                    <View key={col}>
                    <TextInput
                    style={(col+1) % 3 === 0 && col !== 8 ? styles.boardSpecialSideBorder : styles.boardNormalSideBorder}
                    onChangeText={text => onChangeText(text,row,col)}
                    value={num == 0 ? '' : `${num}`}
                    editable={boards[row][col] === 0 && start === true ? true: false}
                    />
                    </View>
                  )
              })
            }
            </View>
          )
        })
      }
        <View style={styles.mainButton}>
        <View style={{marginRight: 20, marginTop: 15}}>
        <Button
          onPress={() => onSubmitValidate(secondBoards)}
          title="Validate"
          color="#c91d14"
          disabled={start === true ? false : true}
        />
        </View>
        <View style={{marginTop: 15, marginRight: 20}}>
        <Button
          onPress={() => onSubmitSolve(boards)}
          title="Solve"
          color = "#1b8415"
          disabled={start === true ? false : true}
        />
        </View>
        <View style={{marginTop: 15}}>
        <Button
          onPress={() => onSubmitReset(timer)}
          title="Reset"
          color="#05d4eb"
        />
        </View>
        </View>
        </View>
      )
    }
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButton: {
    flexDirection: 'row'
  },
  boardNormalBottomBorder: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
  boardSpecialBottomBorder: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderColor: 'grey'
  },
  boardNormalSideBorder: {
    height: 35,
    width:35,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize:25,
    textAlign:'center'
  },
  boardSpecialSideBorder: {
    height: 35,
    width:35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRightWidth:5,
    fontSize:25,
    textAlign:'center'
  }
});

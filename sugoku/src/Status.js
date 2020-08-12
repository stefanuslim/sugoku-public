import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, Image, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {getPlayers} from '../store/boardAction'


export default function Status({ route, navigation }) {
  const { status, players } = useSelector(state => state)

  const dispatch = useDispatch()

  const handleNewGame = () => {
    navigation.navigate('Home')
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getPlayers())

    });
  },[navigation])

  //
  useEffect(() => {
    dispatch(getPlayers())
  },[])

  return (
    <View style={styles.container}>
    {
      !route.params || status === '' ? (<ActivityIndicator size="large"/>) : (
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:20, textAlign:'center'}}>
        {status === 'unsolved' ? 'You Lose' : 'You Win'} {!route.params ? 'Player' : route.params.username}
        </Text>
        <Image source={status === 'unsolved' ? {uri:"https://pixelkin.org/wp-content/uploads/2016/07/Game_Over-600x300.jpg"} :
        {uri:'https://png.pngtree.com/png-vector/20191029/ourmid/pngtree-first-prize-gold-trophy-icon-prize-gold-trophy-winner-first-prize-png-image_1908592.jpg'}}
        style={status === 'unsolved' ? {width:350, height:200} : {width:200, height:200}}/>
        <Text style={{fontSize:30, textAlign:'center'}}>
        Top 5 Sugoku Player
        </Text>
        <View style={{flexDirection:'row'}}>
        <TextInput style={{fontSize:15, width:80, textAlign:'center', borderWidth:1}} defaultValue={'Player'} editable={false}/>
        <TextInput style={{fontSize:15, width:80,textAlign:'center', borderWidth:1}} defaultValue={'Status'} editable={false}/>
        <TextInput style={{fontSize:15, width:180, textAlign:'center', borderWidth:1}} defaultValue={'Time to Solve (Seconds)'} editable={false}/>

        </View>
        {
          players.slice(0,5).map((player, idx) => (
            <View style={{flexDirection:'row',}} key={idx}>
              <TextInput style={{fontSize:15, width:80, textAlign:'center', borderWidth:1}} defaultValue={player.username} editable={false}/>
              <TextInput style={{fontSize:15, width:80,textAlign:'center', borderWidth:1}} defaultValue={player.status} editable={false}/>
              <TextInput style={{fontSize:15, width:180, textAlign:'center', borderWidth:1}} defaultValue={`${60-player.time}`} editable={false}/>
            </View>
          ))
        }
        <Button
          onPress={() => handleNewGame()}
          title="New Game"
          color="red"
        />
        </View>
      )
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

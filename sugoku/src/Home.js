import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'



export default function Home({ navigation }) {
  const { user } = useSelector(state => state)
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUsername('')
    });
    return unsubscribe;
  },[navigation])


  const onChangeText = (text) => {
    setUsername(text)
  }

  const handlePlay = () => {
    navigation.navigate('Board', {
     username: username
   })
  }

  return (
    <View style={styles.container}>
    <Image source={{uri:'https://cdn6.f-cdn.com/contestentries/1495191/29595932/5ccbbc32d8b58_thumb900.jpg'}} style={{width:200, height:200}}/>
      <Text style={{fontSize: 30}}>
        Enter Your Name!
      </Text>
      <View style={{marginTop: 25}}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, textAlign:'center' }}
        onChangeText={text => onChangeText(text)}
        value={username}
      />
      </View>
      <View style={{marginTop: 20}}>
      <Button
        onPress={() => handlePlay()}
        title="Play Now!"
        color="green"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import wiki from 'wikipedia';


export default function App() {
  const [summary, setSummary] = useState();
  const [news, setNews] = useState('');
  const [text, setText] = useState('');
  async function wikiCheck(search){
    try {
      const page = await wiki.page(search);
      console.log(page);
      //Response of type @Page object
      setSummary((await page.summary()).extract);
      console.log(summary);
      //Response of type @wikiSummary - contains the intro and the main image
    } catch (error) {
      console.log(error);
      //=> Typeof wikiError
    }
  }
  (async () => {
    try {
      const events = await wiki.onThisDay().text;
      console.log(events);
      
      // returns all the events which happened today
  
    } catch (error) {
      console.log(error);
      //=> Typeof wikiError
    }
  })();
  
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>wheatipedia</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <TouchableOpacity style={styles.button} onPress={() => wikiCheck(text)}>
        <Text style={styles.buttonText}>look it up</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <View style = {styles.coolBox}>
        <Text style={styles.wikibody}>{summary}</Text>
      </View>

      
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
  wikibody: {
    margin : 10,
    fontSize: 20,
    fontFamily: 'Arial',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  coolBox: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 20
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 0,
  },
  buttonText: {
    color: 'blue',
    fontFamily: 'coolfont',
    fontSize: 20,
    textDecorationLine: 'underline',
    top: -10
  },
  mainTitle:{
    fontFamily: 'Times New Roman',
    fontSize: 30,
    top: -80

  }
});

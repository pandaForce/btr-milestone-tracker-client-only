import { StyleSheet, Text, TextInput, View } from 'react-native'

const Inputbox = (props) => {

  const inputChangeHandler = (x) => {
    props.storeInputHandler(props.label, x)
  }

  return (
  <View>
    <Text>{props.label}</Text>
    <TextInput style={styles.input_box_container} onChangeText={inputChangeHandler}></TextInput>
  </View>
  );
};

export default Inputbox;

const styles = StyleSheet.create({
  input_box_container: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  
});
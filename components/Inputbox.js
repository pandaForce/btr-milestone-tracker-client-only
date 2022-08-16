import { StyleSheet, Text, TextInput, View } from 'react-native'
import { style_templates } from "../config_variables/styles";

const Inputbox = (props) => {

  const inputChangeHandler = (x) => {
    props.storeInputHandler(props.label, x)
  }

  const isUsername = props.buttonname === "username" ? true : false
  const isPassword = props.buttonname === "password" ? true : false

  return (
  <View>
    <Text>{props.label}</Text>
      { isUsername && 
        <TextInput style={style_templates.login_page_input_text_box} onChangeText={inputChangeHandler} placeholder={props.placeholder}></TextInput>
      }
      { isPassword && 
        <TextInput  secureTextEntry={true} style={style_templates.login_page_input_text_box} onChangeText={inputChangeHandler} placeholder={props.placeholder}></TextInput>
      }
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
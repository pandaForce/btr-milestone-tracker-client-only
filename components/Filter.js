import { Pressable, Button, View, Text } from "react-native";
import { style_templates } from "../constants/styles";

const Filtercat = (props) => {
  const FilterClickHandler = () => {
    props.changeFilterCategoryHandler(props.apiname);
  };

  return (
    // <View style={styles.card_container}>
    <View style={style_templates.filter_button_template}>
      {/* <Button onPress={FilterClickHandler} title={props.name}></Button> */}
      <Pressable onPress={FilterClickHandler}>
        <Text style={style_templates.filter_button_text}>{props.name}</Text>
      </Pressable>
    </View>

    // <button onClick={FilterClickHandler}>
    // {props.id}
    // {props.name}
    // </button>
  );
};

export default Filtercat;

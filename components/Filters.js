import { Button, View } from "react-native";
import Filter from "./Filter";
import { style_templates } from "../constants/styles";

const Filters = (props) => {
  return (
    <View style={style_templates.filter_container}>
      {props.filtercategories.map((filterc) => (
        <Filter
          changeFilterCategoryHandler={props.changeFilterCategoryHandler}
          key={filterc.id}
          name={filterc.name}
          apiname={filterc.apiname}
        />
      ))}
    </View>
  );
};

export default Filters;

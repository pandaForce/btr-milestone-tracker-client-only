import { StyleSheet, Text, View, Pressable } from "react-native";
import { style_templates } from "../constants/styles";
import calculateCompletePctg from "../utils/calculateCompletePctg";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";

// export default function Card({filtercategory, cardData, WINDOW_HEIGHT}) {
export default function Card(props) {
  // console.log('inside Card component | props.filtercategory :  ' + props.filtercategory)

  function cardPressHandler() {
    console.log("card pressed");
    props.showLotsHandler(
      props.cardData.sfid,
      props.cardData.name,
      props.filtercategory
    );
  }

  function formatCompletion(x) {
    return x * 100;
  }

  if (props.filtercategory == "tranche") {
    return (
      <Pressable onPress={cardPressHandler}>
        <View style={style_templates.card_template}>
          <View style={style_templates.tranche_number_box}>
            <Text style={style_templates.tranche_sub_text}>Tranche</Text>
            <Text style={style_templates.tranche_main_text}>
              {props.cardData.name}
            </Text>
          </View>

          <View style={style_templates.generic_box}>
            <Icon2 name="file-text-o" size={30} color="#f08080" />
            <Text style={style_templates.generic_sub_text}>
              {/* Total Lots : {props.cardData.count} */}
              {props.cardData.count}
            </Text>
          </View>

          <View style={style_templates.generic_box}>
            {/* <Icon name="home-outline" size={30} color="#4F8EF7" /> */}
            <Icon2 name="bank" size={30} color="#808000" />
            <Text style={style_templates.generic_sub_text}>
              {/* Land Settled = {props.cardData.landsettled} */}
              {props.cardData.landsettled}
            </Text>
          </View>

          <View style={style_templates.generic_box}>
            <Icon name="hammer-outline" size={30} color="#778899" />
            <Text style={style_templates.generic_sub_text}>
              {/* Settlement Claim : {props.cardData.settlementclaimdone} */}
              {props.cardData.settlementclaimdone}
            </Text>
          </View>

          <View style={style_templates.generic_box}>
            <Icon2 name="home" size={30} color="#8fbc8f" />
            <Text style={style_templates.generic_sub_text}>
              {/* Leased ={props.cardData.leased} */}
              {props.cardData.leased}
            </Text>
          </View>

          <View style={style_templates.progress_box}>
            <Text style={style_templates.progress_main_text}>
              {(props.cardData.completepctg / props.cardData.count).toFixed(2) *
                100}
              %
            </Text>
            <Text style={style_templates.progress_sub_text}>complete</Text>
          </View>
        </View>
      </Pressable>
    );
  } else if (props.filtercategory == "lot") {
    return (
      <Pressable onPress={cardPressHandler}>
        <View style={style_templates.card_template}>
          <View style={style_templates.tranche_number_box_lot}>
            <Text style={style_templates.tranche_sub_text_lot}>Tranche</Text>
            <Text style={style_templates.tranche_main_text}>
              {props.cardData.tranche}
            </Text>
          </View>

          <View style={style_templates.lot_number_box}>
            <Text>
              <Text style={style_templates.lot_number_main_text}>
                {props.cardData.name}
              </Text>
            </Text>
          </View>

          <Text>{props.cardData.status}</Text>

          {/* <Text>{props.cardData.projname}</Text>
          <Text>{props.cardData.stage}</Text> */}
          <View style={style_templates.generic_box_lot}>
            {/* <Icon2 name="tachometer" size={30} color="#8fbc8f" /> */}
            {/* <Text style={style_templates.generic_sub_text}></Text> */}
            <Text>{props.cardData.lateststage} Stage</Text>
          </View>

          <View style={style_templates.generic_box_lot}>
            <Icon2 name="usd" size={20} color="#8fbc8f" />
            {/* <Text style={style_templates.generic_sub_text}></Text> */}
            <Text>{props.cardData.price / 1000}K</Text>
          </View>

          <View style={style_templates.progress_box_lot}>
            <Text style={style_templates.progress_main_text}>
              {(props.cardData.completepctg * 100).toFixed(0)} %
            </Text>
            <Text style={style_templates.progress_sub_text}>complete</Text>
          </View>
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={cardPressHandler}>
        <View style={style_templates.summary_card_template}>
          <Text style={style_templates.summary_card_title}>
            {props.cardData.name}
          </Text>
          <Text style={style_templates.summary_card_sub_title}>
            {props.cardData.count}
          </Text>
        </View>
      </Pressable>
    );
  }
}

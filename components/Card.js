import { StyleSheet, Text, View, Pressable } from "react-native";
import { style_templates} from "../config_variables/styles";
import { variables } from "../config_variables/variables";
import { useNavigation } from '@react-navigation/native';
import calculateCompletePctg from "../utils/calculateCompletePctg";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";

// export default function Card({filtercategory, cardData, WINDOW_HEIGHT}) {
export default function Card(props) {
  // console.log('inside Card component | props.filtercategory :  ' + props.filtercategory)
    const navigation = useNavigation();

  function cardPressHandler() {
    console.log("card pressed | props.filtercategory : " + props.filtercategory);
    props.showLotsHandler(
      props.cardData.sfid,
      props.cardData.name,
      props.filtercategory
    );

    if(props.filtercategory == 'lot') {
      console.log('just before navigating to Lot screen | props.cardData.sfid : ' + props.cardData.sfid + ' | props.cardData.name : ' + props.cardData.name)
      console.log('props.cardData: ' + JSON.stringify(props.cardData))
        navigation.navigate("Lot" , {
          lotdetails : props.cardData
        });
      // props.showLotDetailHandler(props.cardData)
    }

  }

  function formatCompletion(x) {
    return x * 100;
  }

  const isTranche = props.filtercategory === "tranche" ? true : false
  const iconSize = variables.isDesktop ? 20 : 30

  if (props.filtercategory != "lot" ) {
  // if (props.filtercategory == "tranche" || props.filtercategory == "milestone") {
    return (
      <Pressable onPress={cardPressHandler}>
        <View style={style_templates.card_template}>
          {isTranche &&
          <View style={style_templates.tranche_number_box}>
            <Text style={style_templates.tranche_sub_text}>Tranche</Text>
            {/* <Text style={style_templates.non_tranche_main_text}>
              {props.cardData.name}
            </Text> */}
            <Text style={style_templates.tranche_main_text}>
              {props.cardData.name}
            </Text>
          </View>
          }

          {!isTranche && 
          <View style={style_templates.tranche_number_box}>
            {/* <Text style={style_templates.tranche_sub_text}>Tranche</Text> */}
            {/* <Text style={style_templates.non_tranche_main_text}>
              {props.cardData.name}
            </Text> */}
            <Text style={style_templates.non_tranche_main_text}>
              {props.cardData.name}
            </Text>
          </View>
          }

          <View style={style_templates.generic_box}>
            <Icon2 name="file-text-o" size={iconSize} color="#f08080" />
            <Text style={style_templates.generic_sub_text}>
             {/* Total Lots : {props.cardData.count} */}
              {props.cardData.count}
            </Text>
            <>
            { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Total Lots
            </Text>
            }
          </>
          </View>

          <View style={style_templates.generic_box}>
            {/* <Icon name="home-outline" size={iconSize} color="#4F8EF7" /> */}
            <Icon2 name="bank" size={iconSize} color="#808000" />
            <Text style={style_templates.generic_sub_text}>
              {/* Land Settled = {props.cardData.landsettled} */}
              {props.cardData.landsettled}
            </Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Land settled
            </Text>
            }
          </>            
          </View>

          <View style={style_templates.generic_box}>
            <Icon name="hard-hat" size={iconSize} color="#778899" />
            <Text style={style_templates.generic_sub_text}>
              {/* Settlement Claim : {props.cardData.settlementclaimdone} */}
              {props.cardData.settlementclaimdone}              
            </Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Settlement Claims
            </Text>            
            }
          </>            
          </View>

          <View style={style_templates.generic_box}>
            <Icon2 name="check" size={iconSize} color="#8fbc8f" />
            <Text style={style_templates.generic_sub_text}>
              {/* Leased ={props.cardData.leased} */}
              {props.cardData.leased}
            </Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Leased
            </Text>                        
            }
          </>            
          </View>

{ variables.isDesktop  &&
<>
          <View style={style_templates.generic_box}>
            <Icon2 name="cube" size={iconSize} color="#778899" />
            <Text style={style_templates.generic_sub_text}>
              {(props.cardData.totalsize / props.cardData.count).toFixed(0)} sq m
            </Text>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Avg. Land Size
            </Text>                        
            }
          </View>

          <View style={style_templates.generic_box}>
            <Icon2 name="home" size={iconSize} color="#8fbc8f" />
            <Text style={style_templates.generic_sub_text}>
              {(props.cardData.totalhousesize / props.cardData.count).toFixed(0)} sq m
            </Text>
            <Text style={style_templates.generic_sub_text_description}>
              Avg. House Size
            </Text>                        
          </View>

          <View style={style_templates.generic_box}>
            {/* <Icon2 name="home" size={iconSize} color="#8fbc8f" /> */}
            <Icon2 name="usd" size={iconSize} color="#8fbc8f" />
            <Text style={style_templates.generic_sub_text}>
              {/* Leased ={props.cardData.leased} */}
              $ {(props.cardData.totalprice / props.cardData.count / 1000).toFixed(0)} K
            </Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Avg. Land Price
            </Text>                        
            }
          </>            
          </View>

          <View style={style_templates.generic_box}>
            <Icon2 name="hammer-outline" size={iconSize} color="#8fbc8f" />
            <Text style={style_templates.generic_sub_text}>
              {/* Leased ={props.cardData.leased} */}
              {(props.cardData.totalbuildprice  / props.cardData.count / 1000).toFixed(0)} K
            </Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Avg. Build Price
            </Text>                        
            }
          </>            
          </View>

          </>
  }

          <View style={style_templates.progress_box}>
            <Text style={style_templates.progress_main_text}>
              { (props.cardData.completepctg / props.cardData.count * 100).toFixed(0) }
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
              <Text style={style_templates.lot_number_main_text}>
                {props.cardData.name}
              </Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Lot Number
            </Text>
            }
          </>            
          </View>

          <View style={style_templates.generic_box}>
          {/* <View style={style_templates.generic_box_lot}> */}
          <Text>{props.cardData.status}</Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Land Contract Status
            </Text>
            }
          </>            
            </View>

          {/* <Text>{props.cardData.projname}</Text>
          <Text>{props.cardData.stage}</Text> */}
          <View style={style_templates.generic_box}>
          {/* <View style={style_templates.generic_box_lot}> */}
            {/* <Icon2 name="tachometer" size={iconSize} color="#8fbc8f" /> */}
            {/* <Text style={style_templates.generic_sub_text}></Text> */}
            <Text>{props.cardData.lateststage} Stage</Text>
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Last Milestone
            </Text>
            }
          </>            
          </View>

          <View style={style_templates.generic_box}>
          {/* <View style={style_templates.generic_box_lot}> */}
            <Icon2 name="usd" size={iconSize} color="#8fbc8f" />
            {/* <Text style={style_templates.generic_sub_text}></Text> */}
            <Text>{(props.cardData.price / 1000).toFixed(0)}K</Text>            
             <>
              { variables.isDesktop  &&
            <Text style={style_templates.generic_sub_text_description}>
              Land Price 
            </Text>
            }            
            </>
          </View>
          {/* <View style={style_templates.generic_box}>
            <Icon2 name="usd" size={iconSize} color="#8fbc8f" />
            <Text>{(props.cardData.buildprice / 1000).toFixed(0)}K</Text>
            <Text style={style_templates.generic_sub_text_description}>
              Build Price 
            </Text>
          </View> */}

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

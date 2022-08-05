import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { style_templates } from "../constants/styles";

function LotsScreen(props) {
  return (
    <Text>Dummy Text</Text>
    // <View style={style_templates.app_container}>
    //   <StatusBar animated={true} backgroundColor="#61dafb" />
    //   <View style={style_templates.filter_container}>
    //     {filtercategory != "tranche" && (
    //       <>
    //         <Filters
    //           filtercategories={filter_categories.filter(
    //             (f) => f.apiname != "tranche"
    //           )}
    //           changeFilterCategoryHandler={changeFilterCategoryHandler}
    //         />
    //         <View style={style_templates.filter_button_template}>
    //           <Pressable onPress={resetApp}>
    //             <Text style={style_templates.filter_button_text}>Reset</Text>
    //           </Pressable>
    //         </View>
    //         <View style={style_templates.filter_button_template}>
    //           <Pressable onPress={invokeShowLotsHandler}>
    //             <Text style={style_templates.filter_button_text}>
    //               Back to Lots
    //             </Text>
    //           </Pressable>
    //         </View>
    //       </>
    //     )}
    //   </View>
    //   <View style={style_templates.cards_container}>
    //     {showCards && (
    //       <>
    //         <View style={style_templates.lots_count_banner}>
    //           {/* <View> */}
    //           <Text style={style_templates.lots_count_text}>
    //             Filtered {countOfLots} Lots
    //           </Text>
    //         </View>
    //         <View>
    //           <FlatList
    //             data={CardListData}
    //             keyExtracttor={(item) => item.id}
    //             renderItem={renderCards}
    //           />
    //         </View>
    //       </>
    //     )}
    //   </View>
    // </View>
  );
}

export default LotsScreen;

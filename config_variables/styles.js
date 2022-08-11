import { signInWithCustomToken } from "firebase/auth";
import { StyleSheet, Dimensions } from "react-native";
import { variables } from "../config_variables/variables";
// import { lightgrey } from "../constants/styles";

const font_family = [
  "lucida grande",
  "tahoma",
  "verdana",
  "arial",
  "sans-serif",
];

/* color codes */
const color_codes = {
  lightgrey: "#d3d3d3",
  lightsteelblue : "#b0c4de",
  sienna : "#a0522d"
};

/* dimensions*/
const device_width = Dimensions.get("window").width;
const device_height = Dimensions.get("window").height;
console.log("dimensions are W/H : " + device_width, device_height);

const style_templates = StyleSheet.create({
  home_screen_container: {
    // width: 10,
    // display: "flex",
    justifyContent: "center",
    // alignItems: "center",
  },

  home_screen_image: {
    flex: 1,
    flexDirection: "column",
    marginLeft: variables.isDesktop ? 400 : 0,
    width:
      variables.isDesktop
        ? 0.6 * Dimensions.get("window").width
        : Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  home_screen_title: {
    flex: 1,
    // marginTop: 150,
    color: "#7b68ee",
    fontSize: 20,
  },

  home_screen_button_group_container: {
    display: "flex",
    flexDirection: "row",
    marginTop: Dimensions.get("window").height * 0.6,
    paddingLeft: variables.isDesktop ? 20 : 0,
    justifyContent: "center",
    alignItems: "center",
    // width: 300,
  },

  app_container: {
    // backgroundColor: "#d3d3d3",
    // backgroundColor: "#add8e6",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  app_sub_container: {
    flex: 1,
    // width: 600,
        width:
      variables.isDesktop
        ? 0.6 * Dimensions.get("window").width
        : Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    borderWidth:1,
    borderColor: 'black'
  },

  lot_details_header_container: {
    flex: 1,
        width:
      variables.isDesktop
        ? 0.6 * Dimensions.get("window").width
        : Dimensions.get("window").width,
            borderWidth:1,
    borderColor: 'black'
  },


  lot_details_container: {
    flex: 9,
        width:
      variables.isDesktop
        ? 0.6 * Dimensions.get("window").width
        : Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
        borderWidth:1,
    borderColor: 'black'
  },

  login_sub_container: {
    // margin: 20,
    // width: 300,
    // display: "flex",
    // flexDirection: "column",
    marginTop: 150,
    // paddingLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },

  login_fields_container: {
    width: 300,
  },

  card_template: {
    // flex: 1,
    flexDirection: "row",
    borderRadius: 2,
    // marginHorizontal: 20,
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color_codes.lightgrey,
    paddingHorizontal: 10,
    height:
      variables.isDesktop
        ? 0.075 * Dimensions.get("window").height
        : 0.1 * Dimensions.get("window").height,
    // width: "90%",
    // width:
    //   variables.isDesktop
    //     ? 0.275 * Dimensions.get("window").width
    //     : 0.99 * Dimensions.get("window").width,

        width:
      variables.isDesktop
        ? 0.6 * Dimensions.get("window").width
        : Dimensions.get("window").width,
    


    backgroundColor: "#f8f8ff",
    // backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "space-between",
  },

  tranche_number_box: {
    // backgroundColor: "#dc143c",
    backgroundColor: "#778899",
    paddingHorizontal: 12,
    // borderRadius: 10,
    justifyContent: "center",
        height:
      variables.isDesktop
        ? 70
        : 70,
    // height: 70,
    alignItems: "center",
    // flex: 1,
    // flexDirection: "column",
  },

  tranche_main_text: {
       fontSize:
      variables.isDesktop
        ? 25
        : 30,
    // fontSize: 30,
    color: "#f8f8ff",
    alignItems: "center",
  },

  tranche_sub_text: {
    fontSize: 15,
    color: "#f8f8ff",
    fontWeight: "bold",
    // alignItems: "center",
  },

  progress_box: {
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "center",
    height: 70,
    alignItems: "center",
  },
  progress_main_text: {
    color: "black",
  },

  progress_sub_text: {
    color: "black",
    fontWeight: "bold",
  },
  generic_box: {
    justifyContent: "center",
    alignItems: "center",
  },

  generic_sub_text: {
    // color: "red",
    fontSize: 14,
    color: "black",
    // fontWeight: "bold",
  },
  generic_sub_text_description: {
    color: color_codes.sienna,
    fontSize: 10,
    // color: "black",
    // fontWeight: "bold",
  },

  lot_number_box: {
    // justifyContent: "center",
    alignItems: "center",
    width: 
    variables.isDesktop
        ? 250
        : 50,
    // width: 50,
    // borderWidth: 1,
    // borderColor: color_codes.lightgrey,
    // backgroundColor: color_codes.lightgrey,
  },

  lot_number_main_text: {
    // fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },

  tranche_number_box_lot: {
    backgroundColor: "#778899",
    paddingHorizontal: 12,
    justifyContent: "center",
    height: 70,
    alignItems: "center",
  },

  tranche_sub_text_lot: {
    fontSize: 12,
    color: "#f8f8ff",
    fontWeight: "bold",
    // alignItems: "center",
  },

  generic_box_lot: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },

  filter_container: {
    // backgroundColor: "green",
    backgroundColor: "#d3d3d3",
    // backgroundColor: "#add8e6",
    width: "100%",
    // flex: 1,
    // height: 150,
    // width: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "center",
    alignItems: "center",
    // paddingTop: 10,
  },

  filter_sub_container_left: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 70,
    borderWidth: 1,
  },

  filter_sub_container_right: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
  },

  cards_container: {
    // backgroundColor: "black",
    backgroundColor: "#d3d3d3",
    // backgroundColor: "#add8e6",
    flex: 12,
    // height: "100%",
    width: "100%",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },
  cards_flatlist_container: {
    flex: 1,
  },

  filter_button_template: {
    borderRadius: 7,
    // flex: 1,
    // width: 70,
    height: 40,
    backgroundColor: "#add8e6",
    marginHorizontal: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    // alignItems: "center",
  },
  filter_button_text: {
    fontSize: 12,
    fontWeight: "bold",
  },

  summary_card_title: {
    fontSize: 15,
    // fontWeight: "bold",
  },

  summary_card_sub_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#800000",
  },

  summary_card_template: {
    // flex: 1,
    flexDirection: "row",
    borderRadius: 9,
    // marginHorizontal: 20,
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color_codes.lightgrey,
    paddingHorizontal: 10,
    height:
      variables.isDesktop
        ? 0.08 * Dimensions.get("window").height
        : 0.06 * Dimensions.get("window").height,
    // width: "90%",
    width:
      variables.isDesktop
        ? 0.275 * Dimensions.get("window").width
        : 0.9 * Dimensions.get("window").width,
    backgroundColor: "#f8f8ff",
    // backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "space-between",
  },

  lots_count_banner: {
    backgroundColor: "black",
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
    // marginTop: 70,
    marginBottom: 10,
  },

  lots_count_text: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },

  progress_box_lot: {
    // borderWidth: 1,
    // borderColor: "red",
    // backgroundColor: "#008080",
    justifyContent: "center",
    height: 70,
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: "#2e8b57",
    borderWidth: 1,
    borderColor: "#2e8b57",
    padding: 5,
  },

  custom_button_wrapper: {
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 10,
    // width: 120,
  },

  loading_state_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cards_plus_filter_container: {
    flex: 1,
  },

  error_message_box: {
    // flex: 3,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  error_message_text: {
    color: "red",
  },
  
  button:{
    backgroundColor:'#ff5c5c',
  }

});



export { font_family, style_templates };

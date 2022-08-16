import Card from "../components/Card";
import {
  View,
  Text,
  Button,
  FlatList,
  useWindowDimensions,
  StatusBar,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { style_templates } from "../config_variables/styles";

// import TRANCHES from '../dummy_data/tranches'
import React, { useState } from "react";
// import isTest from "../utils/isTest";
// import stockdata_full from "../dummy_data/stockdata";
// import stockdata_min from "../dummy_data/stockdata_min";
import applyFilters from "../utils/applyFilters";
import extractDataByFilter from "../utils/extractDataByFilter";
import initializeFilterSet from "../utils/initializeFilterSet";
import filter_params from "../utils/filter_params";
import filter_categories from "../utils/filter_categories";
import totalFiltersSelected from "../utils/totalFiltersSelected";
import mergeFilters from "../utils/mergeFilters";
import filterAlreadyAdded from "../utils/filterAlreadyAdded";
import Filters from "../components/Filters";
import extractDataForConcentrationReport from "../utils/extractDataForConcentrationReport";
// import axios_url from "../utils/axios_url";
import buildEndpoint from "../utils/buildEndpoint";
import Icon2 from "react-native-vector-icons/FontAwesome";



// function TranchesScreen({route}) {
function TranchesScreen(props) {
  console.log("inside TranchesScreen");
  /*  dimension calculations*/
  const { height, width } = useWindowDimensions();
  /*  store current filter selected on UI*/
  const [filtercategory, setfiltercategory] = useState("tranche");
  const [filteritems, setfilteritems] = useState({});
  /*  test only*/
  const [stockdata, setStockdata] = React.useState(stockdata);
  /*  stores card data being displayed  on UI*/
  const [CardListData, setCardListData] = React.useState([]);
  /*  prevents rendering of app twice on reload*/
  const [showCards, setShowCards] = React.useState(false);
  /* display total records filtered after each click*/
  const [countOfLots, setTotalCountOfLots] = React.useState(0);
  const [currentTranche, setCurrentTranche] = React.useState();
  const [dataFetchComplete, setDataFetchComplete] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [errorMessage, setErrorMessage]  = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // const stockdata_to_use =  isTest ? stockdata_min : stockdata_full
  // console.log("isTest: " + isTest);
  const filter_set = initializeFilterSet(filter_params);
  const final_filter_set =
    Object.keys(filteritems).length === 0
      ? { ...filter_set }
      : { ...filteritems };


  React.useEffect(() => {
    console.log("inside useEffect");

    async function getBtrData() {
      const  axios_url_dynamic = buildEndpoint('data-fetch')
      const btr_records = await axios.get(axios_url_dynamic, {
        // const btr_records = await axios.get(axios_url, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
          // console.log("btr_records: " + JSON.stringify(btr_records));
          // console.log("btr_records.data: " + JSON.stringify(btr_records.data));
        if(btr_records.data.statuscode === 200) {
          // console.log('btr_records.data.stockdata.length: ' + btr_records.data.stockdata.length)
          // console.log("btr_records.data: " + JSON.stringify(btr_records.data));
          // console.log('btr_records.data.statusCode: ' + btr_records.data.statusCode );
          // console.log("btr_records.data.message: " + btr_records.data.message);
          setDataFetchComplete(true);
          setStockdata(btr_records.data.stockdata);
        } else {
          console.log("Server Error : " + btr_records.data.message)
          setDataFetchComplete(true)
          setServerError(true)
          setErrorMessage(btr_records.data.message)
          // props.navigation.navigate("Error" , {
          //   errorMessage : btr_records.data
          // });
        }


    }

    console.log("inside useEffect, dataFetchComplete: " + dataFetchComplete);
    if (!dataFetchComplete) {
      getBtrData();
    } else {
      setShowCards(true);
      changeFilterHandler(filtercategory);
      props.navigation.setOptions({
        title: filter_categories.find((f) => f.apiname === filtercategory)
          ? filter_categories.find((f) => f.apiname === filtercategory).name
          : "Lots9999",
      headerRight: () => (

              <View style={style_templates.header_button_container}>
                <View style={style_templates.header_button}>
                  {/* <Button onPress={showApplyFiltersModal} title="CHANGE VIEW"> */}
            <Pressable
              onPress={showApplyFiltersModal}
            >
                     <Icon2 name="filter" size={30} color="#f08080" />
            </Pressable>
                  {/* </Button> */}
                </View>
              {/* <Text>   </Text> */}
                <View style={style_templates.header_button}>
              {/* <Button onPress={resetApp} title="RESET"></Button> */}
            <Pressable
              onPress={resetApp}
            >
                     <Icon2 name="refresh" size={30} color="#8fbc8f" />
            </Pressable>
              {/* <Button onPress={resetApp} >
                     <Icon2 name="refresh" size={30} color="#f08080" />
              </Button> */}
                </View>
              {/* <Text>  </Text> */}
              {/* <Button onPress={invokeShowLotsHandler} title="LOTS"></Button> */}
              
             </View>
            ),
      },
      );
    }

    // fetch('http://192.168.1.8:3001/api')
    // fetch('http://192.168.1.8:3001/sfapi')
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log('response from server: ' + json.notes)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
  }, [filtercategory, stockdata]);


// const showLotDetailHandler = (lot_details) => {
//   props.navigation.navigate("Lot" , {
//     lotdetails : lot_details
//   });
// }


function showApplyFiltersModal () {
  console.log('Filters Button clicked')
  setModalVisible(true)
}

  const showLotsHandler = (sfid, sfname, fc_from_card) => {
    const current_tranche_filter = filteritems.tranche;
    if (filterAlreadyAdded(filter_set[filtercategory], sfname) === -1) {
      let o = {};
      o["sfid"] = sfid;
      o["sfname"] = sfname;
      filter_set[filtercategory].push(o);
    }
    if (fc_from_card != "tranche") {
      filter_set["tranche"] = [...current_tranche_filter];
    }
    setfilteritems(filter_set);
    if (fc_from_card == "tranche") {
      setCurrentTranche(sfname);
    }
    setfiltercategory("lot");
    // props.navigation.navigate(""Lots"");
  };

  function renderCards(itemData) {
    return (
      <Card
        filtercategory={filtercategory}
        cardData={itemData.item}
        WINDOW_HEIGHT={height}
        showLotsHandler={showLotsHandler}
        // showLotDetailHandler = {showLotDetailHandler}
      />
    );
  }

  const changeFilterHandler = (fc) => {
    setfiltercategory(fc);
    const filter_set_init = initializeFilterSet(filter_params);
    const final_filter_items = mergeFilters(
      filter_params,
      filter_set_init,
      filteritems,
      filter_set
    );
    setfilteritems(final_filter_items);
    // const stockdata_after_filters = applyFilters(stockdata_to_use,filter_params,final_filter_set, totalFiltersSelected(final_filter_set))
    // const stockdata_after_filters = applyFilters(stockdata_to_use,filter_params,final_filter_items, totalFiltersSelected(final_filter_set))
    const stockdata_after_filters = applyFilters(
      stockdata,
      filter_params,
      final_filter_items,
      totalFiltersSelected(final_filter_set)
    );
    const initial_card_data = extractDataByFilter(
      stockdata_after_filters,
      filter_params[filtercategory],
      filtercategory
    );
    console.log('initial_card_data: ' + JSON.stringify(initial_card_data))
    setCardListData(initial_card_data);
    setTotalCountOfLots(
      initial_card_data.reduce((totcount, rec) => totcount + rec.count, 0)
    );
  };

  function changeFilterCategoryHandler(fc) {
    setShowCards(false);
    setfiltercategory(fc);
    setModalVisible(!modalVisible)
  }

  const resetApp = () => {
    setfiltercategory("tranche");
    setfilteritems({});
  };

  function invokeShowLotsHandler() {
    console.log("filteritems: " + JSON.stringify(filteritems));
    setfiltercategory("lot");
    // showLotsHandler(null,null)
  }

  //   const  runFetch = () =>  {
  //     fetch('http://192.168.1.8:3001/api')
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log('response from server: ' + json.notes)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }

  // const startConcentrationReportGen = () => {
  //   console.log("inside startConcentrationReportGen");
  //   extractDataForConcentrationReport(stockdata);
  // };

  return (


      <View style={style_templates.app_container}>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={style_templates.filter_container}>
        {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Filter Categories!</Text> */}
                              <View style={style_templates.filter_sub_container_left}>
                    <Filters
                      // filtercategories={filter_categories.filter(
                      //   (f) => f.apiname != "tranche"
                      // )}
                      filtercategories={filter_categories}
                      changeFilterCategoryHandler={changeFilterCategoryHandler}
                    />
                  </View>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
          </View>
        {/* </View> */}
        </View>
      </Modal>

      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* {filtercategory == "tranche" && (
        <View>
          <Button
            onPress={startConcentrationReportGen}
            title="Concentration Report"
          ></Button>
        </View>
      )} */}
      <View style={style_templates.app_sub_container}>
        {dataFetchComplete && serverError && (
          <View>
            <Text> {errorMessage}</Text>
          </View>
        )}
        {!dataFetchComplete && !serverError && (
          <View style={style_templates.loading_state_container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
        {dataFetchComplete && !serverError  && (
          <View style={style_templates.cards_plus_filter_container}>
            <View >
              {filtercategory != "tranche" && (
                <>
                  {/* <View style={style_templates.filter_sub_container_left}>
                    <Filters
                      // filtercategories={filter_categories.filter(
                      //   (f) => f.apiname != "tranche"
                      // )}
                      filtercategories={filter_categories}
                      changeFilterCategoryHandler={changeFilterCategoryHandler}
                    />
                  </View> */}
                  <View style={style_templates.filter_sub_container_right}>
                    <View style={style_templates.filter_button_template}>
                      {/* <Pressable onPress={resetApp}>
                        <Text style={style_templates.filter_button_text}>
                          Tranches
                        </Text>
                      </Pressable> */}
                    </View>
                    <View style={style_templates.filter_button_template}>
                      {/* <Pressable onPress={invokeShowLotsHandler}>
                        <Text style={style_templates.filter_button_text}>
                          Back to Lots
                        </Text>
                      </Pressable> */}
                    </View>
                  </View>
                </>
              )}
            </View>
            <View style={style_templates.cards_container}>
              {showCards && !serverError  && (
                <>
                  {/* <View style={style_templates.lots_count_banner}>
                    <Text style={style_templates.lots_count_text}>
                      Filtered {countOfLots} Lots
                    </Text>
                  </View> */}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    data={CardListData}
                    keyExtracttor={(item) => item.id}
                    renderItem={renderCards}
                  />
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    // width:"20%",
    marginTop: 50,
    backgroundColor: "#f8f8ff",
    // borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default TranchesScreen;

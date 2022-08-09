import { ImageBackground, Text, View, Button } from "react-native";
import { style_templates } from "../constants/styles";
// import grouped_stock_data from '../dummy_data/grouped_stock_data'
// import grouped_stock_data from '../dummy_data/stockdata'
// import React, { useState } from 'react'
// import isTest from '../utils/isTest'
// import stockdata_full from '../utils/stockdata'
// import stockdata_min from '../utils/stockdata_min'
// import applyFilters from '../utils/applyFilters'
// import extractDataByFilter from '../utils/extractDataByFilter'
// import initializeFilterSet from '../utils/initializeFilterSet'
// import filter_params from '../utils/filter_params'
// import totalFiltersSelected from '../utils/totalFiltersSelected'
// import mergeFilters from '../utils/mergeFilters'

import stockdata_btr_only from "../dummy_data/stockdata_btr_only";
import extractDataForConcentrationReport from "../utils/extractDataForConcentrationReport";
import finalizeDataForConcentrationReport from "../utils/finalizeDataForConcentrationReport";

export default function HomeScreen({ navigation }) {
  // const [filtercategory, setfiltercategory] =  useState('tranche')
  // const [filteritems, setfilteritems] =  useState({})
  // const [stockdata, setStockdata] = React.useState(stockdata);
  // const [TRANCHES, setTrancheData] = React.useState([]);
  // const stockdata_to_use =  isTest ? stockdata_min : stockdata_full
  // const filter_set = initializeFilterSet(filter_params)
  // const final_filter_set  =  Object.keys(filteritems).length === 0 ? {...filter_set}  : {...filteritems}

  // React.useEffect(() => {
  //     console.log('inside useEffect')
  //     if(TRANCHES.length > 0) {

  //     }
  // }, [TRANCHES]);

  // const changeFilterHandler=  (fc) =>  {
  //     console.log('inside changeFilterHandler')
  //     setfiltercategory(fc)
  //     const filter_set_init = initializeFilterSet(filter_params)
  //     const final_filter_items = mergeFilters(filter_params, filter_set_init, filteritems, filter_set)
  //     setfilteritems(final_filter_items)
  //     const stockdata_after_filters = applyFilters(stockdata_to_use,filter_params,final_filter_set, totalFiltersSelected(final_filter_set))
  //     const initial_card_data = extractDataByFilter(stockdata_after_filters, filter_params[filtercategory],filtercategory)
  //     // console.log('initial_card_data: '+JSON.stringify(initial_card_data))
  //     setTrancheData(initial_card_data)

  function getDataHandler() {
    console.log("inside getDataHandler");
    navigation.navigate("Tranches");
    // navigation.navigate('Tranches' , {
    // trancheData: TRANCHES
    // });
    // changeFilterHandler('tranche')
  }

  const startConcentrationReportGen = () => {
    console.log("inside startConcentrationReportGen");
    const extracted_data_map_for_concentration_report =
      extractDataForConcentrationReport(stockdata_btr_only);
    const extracted_data_for_concentration_report =
      extracted_data_map_for_concentration_report.groupeddaata;
    const max_tranches =
      extracted_data_map_for_concentration_report.maxtranches;
    const data_with_cumulative_calculation = finalizeDataForConcentrationReport(
      extracted_data_for_concentration_report,
      "count"
    );
    // console.log('data_with_cumulative_calculation.stockdata: ' + JSON.stringify(data_with_cumulative_calculation.stockdata))
    console.log(
      "data_with_cumulative_calculation.total_lots_by_tranche: " +
        JSON.stringify(data_with_cumulative_calculation.total_lots_by_tranche)
    );
    console.log(
      "data_with_cumulative_calculation.total_cumulative_lots_by_tranche: " +
        JSON.stringify(
          data_with_cumulative_calculation.total_cumulative_lots_by_tranche
        )
    );
    const data_with_pctg_calculation = finalizeDataForConcentrationReport(
      data_with_cumulative_calculation.stockdata,
      "pctg",
      data_with_cumulative_calculation.total_lots_by_tranche,
      data_with_cumulative_calculation.total_cumulative_lots_by_tranche
    );
    console.log(
      "data_with_pctg_calculation.stockdata: " +
        JSON.stringify(data_with_pctg_calculation.stockdata)
    );

    async function postExcelData(
      d,
      total_lots_by_tranche,
      total_cumulative_lots_by_tranche
    ) {
      console.log("inside postExcelData");
      console.log(
        "total_lots_by_tranche: " + JSON.stringify(total_lots_by_tranche)
      );
      console.log(
        "total_cumulative_lots_by_tranche: " +
          JSON.stringify(total_cumulative_lots_by_tranche)
      );

      const payload = {
        stockdata: d,
        totallotsbytranche: total_lots_by_tranche,
        totalcumulativelotsbytranche: total_cumulative_lots_by_tranche,
        max_tranches: max_tranches,
      };

      fetch("http://192.168.0.10:3001/concentrationreport", {
        // fetch('http://192.168.1.8:3001/concentrationreport', {
        // fetch('http://192.168.43.163:3001/concentrationreport', {
        // fetch('http://10.80.6.73:3001/concentrationreport', {
        method: "post",
        mode: "cors",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.blob())
        .then((blob) => {
          const file_sent_back_by_server = blob;
          const update_report_button_clicked = true;
          if (file_sent_back_by_server) {
            console.log(
              "file_sent_back_by_server: " + file_sent_back_by_server
            );
          } else {
            console.log("No file received by the server");
          }
          const url = window.URL.createObjectURL(file_sent_back_by_server);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // a.download = 'nomura-report.xlsx';
          let out_file_name = "concentration-report";
          a.download = out_file_name + ".xlsx";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          // document.getElementById('update-section').classList.add('hidden')
        })
        .catch((error) => {
          alert("Error: " + error);
        });

      // .then(response => response.json())
      // .then(data => {
      //     console.log('data: ' + JSON.stringify(data));
      // })
      // .catch((error) => {
      //     console.log('data.errorCode: ' + data.errorCode);
      // });

      // try {
      //   let res = await axios.post( 'http://192.168.1.8:3001/concentrationreport' ,  payload)
      // } catch (err) {
      //     if (err.response) {
      //     } else if (err.request) {
      //     } else {
      //         console.log('Error', err.message);
      //     }
      // }
    }

    postExcelData(
      data_with_pctg_calculation.stockdata,
      data_with_cumulative_calculation.total_lots_by_tranche,
      data_with_cumulative_calculation.total_cumulative_lots_by_tranche
    );
  };

  //     const  runFetch = () =>  {
  //   fetch('http://192.168.1.8:3001/api')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log('response from server: ' + json.notes)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  return (
    <>
      <View style={style_templates.home_screen_container}>
        <ImageBackground
          source={require("../assets/suburb2.jpg")}
          resizeMode="cover"
          imageStyle={style_templates.home_screen_image}
        >
          {/* <Text style={style_templates.home_screen_title}>
            BTR MILESTONE TRACKER{" "}
          </Text> */}
          <View style={style_templates.home_screen_button_group_container}>
            <View style={style_templates.custom_button_wrapper}>
              <Button onPress={getDataHandler} title="BTR DASHBOARD"></Button>
            </View>
            <View style={style_templates.custom_button_wrapper}>
              <Button
                onPress={startConcentrationReportGen}
                title="CONCENTRATION REPORT"
              ></Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

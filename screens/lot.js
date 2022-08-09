import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, StatusBar } from "react-native";
import { style_templates } from "../constants/styles";

function LotScreen({route, navigation}) {
  return (

    <View style={style_templates.app_container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
        <View style={style_templates.lot_details_header_container}>
            <Text>Lot Details </Text>
        </View>
        <View style={style_templates.lot_details_container}>
            <Text>{route.params.lotdetails.sfid}</Text>
            <Text>{route.params.lotdetails.name}</Text>
            <Text>{route.params.lotdetails.landsize}</Text>
            <Text>{route.params.lotdetails.buildprice}</Text>
            <Text>{route.params.lotdetails.buildprice}</Text>
            <Text>{route.params.lotdetails.buildstatus}</Text>
            <Text>{route.params.lotdetails.propertystatus}</Text>
            <Text>{route.params.lotdetails.streetnumber}</Text>
            <Text>{route.params.lotdetails.streetname }</Text>
            <Text>{route.params.lotdetails.suburb}</Text>
            <Text>{route.params.lotdetails.state}</Text>
            <Text>{route.params.lotdetails.postcode}</Text>
            <Text>{route.params.lotdetails.depth}</Text>
            <Text>{route.params.lotdetails.frontage}</Text>
            <Text>{route.params.lotdetails.iscorner}</Text>
            <Text>{route.params.lotdetails.isirregular}</Text>
            <Text>{route.params.lotdetails.volume}</Text>
            <Text>{route.params.lotdetails.folio}</Text>
            <Text>{route.params.lotdetails.municipality}</Text>
            <Text>{route.params.lotdetails.lp}</Text>
            <Text>{route.params.lotdetails.ps}</Text>
            <Text>{route.params.lotdetails.projectvendor}</Text>
            <Text>{route.params.lotdetails.jobcode}</Text>
            <Text>{route.params.lotdetails.allocgrp}</Text>
            <Text>{route.params.lotdetails.projname}</Text>
            <Text>{route.params.lotdetails.stage}</Text>
            <Text>{route.params.lotdetails.lateststage}</Text>
            <Text>{route.params.lotdetails.tranche}</Text>
            <Text>{route.params.lotdetails.completepctg}</Text>
        </View>
    </View>
  );
}

export default LotScreen;

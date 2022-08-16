import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  IconButton,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import TrancheScreen from "./screens/main";
import LoginScreen from "./screens/login";
import LotsScreen from "./screens/lots";
import LotScreen from "./screens/lot";
import SummaryScreen from "./screens/summary";
import { firebase } from "./utils/firebaseConfig";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import stockdata_btr_only from './dummy_data/stockdata_btr_only'
// import extractDataForConcentrationReport from './utils/extractDataForConcentrationReport'
// import finalizeDataForConcentrationReport from './utils/finalizeDataForConcentrationReport'

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);
  const Tab = createBottomTabNavigator();

  function Root() {
    const [appMounted, setappMounted] = React.useState("waiting...");
    const authCtx = useContext(AuthContext);
    const auth = getAuth();

    useEffect(() => {
      const getStoredTokenFromDevice = async () => {
        console.log(" Root > getStoredTokenFromDevice function");
        try {
          const value = await AsyncStorage.getItem("token");
          const expiry = await AsyncStorage.getItem("expiry");
          if (value !== null && expiry > 0) {
            console.log(
              " Root > getStoredTokenFromDevice function > an existing token found on device"
            );
            // authCtx.authenticate(value, false);
            authCtx.authenticate(value, expiry);
            setappMounted("done");
          } else {
            console.log("no token stored on device");
          }
        } catch (e) {
          // error reading value
        }
      };

      getStoredTokenFromDevice();
    }, []);

    // console.log("authCtx.token : " + authCtx.token);
    // console.log("authCtx.expirationTimestamp : " + authCtx.expirationTimestamp);
    console.log(" Root > authCtx.isAuthenticated : " + authCtx.isAuthenticated);
    return <Navigation />;
  }

  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <>
              {/* <Button onPress={authCtx.logout} title="FILTERS"></Button> */}
              <Button onPress={authCtx.logout} title="LOGOUT"></Button>              
              </>
              // <Pressable onPress={authCtx.logout}>
              //   <Icon2 name="logout" size={30} color="#f08080" />
              // </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Tranches"
          component={TrancheScreen}
          options={{ title: "Tranche" }}
        />
        <Stack.Screen
          name="Lots"
          component={LotsScreen}
          options={{
            headerRight: () => (
              <Button onPress={authCtx.logout} title="FILTERS"></Button>
              // <Pressable onPress={authCtx.logout}>
              //   <Icon2 name="logout" size={30} color="#f08080" />
              // </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Lot"
          component={LotScreen}
        />
        <Stack.Screen
          name="Groups"
          component={SummaryScreen}
          options={{ title: "Summary" }}
        />
      </Stack.Navigator>
    );
  }

  function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  }

  return (
    <AuthContextProvider>
      <StatusBar style="dark" />
      <Root />
      {/* <Navigation /> */}
    </AuthContextProvider>
  );

  // return (
  //   <AuthContextProvider>
  //     {/* <> */}
  //     <StatusBar style="dark" />
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Home" component={HomeScreen} />
  //         <Stack.Screen
  //           name="Tranches"
  //           component={TrancheScreen}
  //           options={{ title: "Tranche" }}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //     {/* </> */}
  //   </AuthContextProvider>
  // );
}

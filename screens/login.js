import React, { useState, useContext } from "react";
import { ImageBackground, StyleSheet, Text, View, Button } from "react-native";
// import { getAuth, signInWithEmailAndPassword } from "../utils/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Inputbox from "../components/Inputbox";
import { AuthContext } from "../store/auth-context";
import { style_templates } from "../constants/styles";

export default function LoginScreen({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const authCtx = useContext(AuthContext);

  const storeInputHandler = (type, x) => {
    //     console.log("type: " + type + " | x : " + x);
    type === "Username" ? setUserName(x) : setPassword(x);
  };

  const loginHandler = () => {
    console.log("execute login steps");
    const auth = getAuth();
    //     signInWithEmailAndPassword(auth, "sumeet@resimaxgroup.com.au", "Tuc47069");
    signInWithEmailAndPassword(auth, username, password, true)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("userCredential: " + JSON.stringify(userCredential));
        // console.log("user: " + JSON.stringify(user));
        // console.log("user.email: " + user.email);
        // console.log("user.stsTokenManager: " + user.stsTokenManager);
        // console.log(
        //   "user.stsTokenManager.expirationTime: " +
        //     user.stsTokenManager.expirationTime
        // );
        // console.log(
        //   "Token Expiry Time: " +
        //     console.log(new Date(user.stsTokenManager.expirationTime))
        // ); //  console.log("userCredential.idToken " + userCredential.idToken);
        // console.log("çurrent timestamp : " + new Date());
        // if (new Date() > new Date(user.stsTokenManager.expirationTime)) {
        //   console.log("timestamp has expired");
        // } else {
        //   console.log("timestamp is valid");
        // }
        // console.log(
        //   "userCredential._tokenResponse.idToken " +
        //     userCredential._tokenResponse.idToken
        // );
        //  );
        authCtx.authenticate(
          userCredential._tokenResponse.idToken,
          user.stsTokenManager.expirationTime
        );

        // navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("error: " + error);
        setLoginFailed(true);
      });
  };

  return (
    <>
      <View style={style_templates.home_screen_container}>
        {/* <Text style={style_templates.homescreentitle}>
          BTR MILESTONE TRACKER{" "}
        </Text> */}
        <ImageBackground
          source={require("../assets/loginscreen.jpg")}
          resizeMode="cover"
          imageStyle={style_templates.home_screen_image}
        >
          <View style={style_templates.login_sub_container}>
            <View style={style_templates.login_fields_container}>
              <Inputbox
                label="Username"
                storeInputHandler={storeInputHandler}
              ></Inputbox>
              <Inputbox
                label="Password"
                storeInputHandler={storeInputHandler}
              ></Inputbox>
              <Text></Text>
              <Button onPress={loginHandler} title="LOGIN"></Button>
              <View style={style_templates.error_message_box}>
                {loginFailed && (
                  <Text style={style_templates.error_message_text}>
                    Login Attempt Failed !!!
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

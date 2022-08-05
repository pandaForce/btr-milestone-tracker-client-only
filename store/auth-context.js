import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  expirationTimestamp: 0,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authExpirationTime, setAuthExpirationTime] = useState(0);

  function authenticate(token, timestamp) {
    console.log("inside authenticate function");
    // console.log("  new Date(timestamp) : " + new Date(parseInt(timestamp)));
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("expiry", timestamp);
    setAuthToken(token);
    setAuthExpirationTime(timestamp);
    // const storeTokenOnDevice = async (value) => {
    // try {
    // const token_value = await AsyncStorage.setItem("token", token);
    // console.log("token stored on device : " + token_value);
    // if (isMountedVar) {
    // setAuthToken(token);
    // }
    // } catch (e) {
    // saving error
    // }
    // };
    // storeTokenOnDevice(token);
  }

  function logout(token) {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("expiry");
  }

  // console.log(" !!authToken : " + !!authToken);
  // console.log("new Date() : " + new Date());
  // console.log(
  //   "new Date(parseInt(authExpirationTime)) : " +
  //     new Date(parseInt(authExpirationTime))
  // );

  const decision =
    !!authToken && new Date() < new Date(parseInt(authExpirationTime));
  // console.log("decision : " + decision);

  const value = {
    token: authToken,
    // isAuthenticated: !!authToken,
    isAuthenticated: decision,
    expirationTimestamp: authExpirationTime,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

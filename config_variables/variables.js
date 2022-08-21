import { StyleSheet, Dimensions } from "react-native";

const ISTEST = true
// const LOCALHOST_IP_ADDRESS = '192.168.13.151'
const LOCALHOST_IP_ADDRESS = '192.168.43.163'
// const LOCALHOST_IP_ADDRESS = '192.168.0.10'
const SECRET_CODE = "ougigUpzuT5zRE96ntcEO5INGixXYx77vKHUbEuZxPlTp66K4P"

const variables = {
  isTest: ISTEST,
  localhost_ip_address : LOCALHOST_IP_ADDRESS,
  base_url : ISTEST ? "http://" + LOCALHOST_IP_ADDRESS + ":3000/"  : "https://btr-app.herokuapp.com/" ,
  secret_code: SECRET_CODE,
   isDesktop: Dimensions.get("window").width > 1000 ? true : false,
  url_config: 
  [
      { 'function': 'data-fetch' ,
        'urlsuffix': 'sfapi'
      },
      { 'function': 'concentration-report' ,
        'urlsuffix': 'concentration_report'
      },
    ]
}

export {variables}

// const SERVER_URL_PRODUCTION =
//   "https://btr-app.herokuapp.com/sfapi?code=" +
//   "ougigUpzuT5zRE96ntcEO5INGixXYx77vKHUbEuZxPlTp66K4P";
// const SERVER_URL_TEST =
//   "http://" + LOCALHOST_IP_ADDRESS + ":3000/sfapi?code=" +
//   "ougigUpzuT5zRE96ntcEO5INGixXYx77vKHUbEuZxPlTp66K4P";
// export { SERVER_URL_PRODUCTION };
// export { SERVER_URL_TEST };

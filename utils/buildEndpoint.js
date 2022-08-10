import {variables} from "../config_variables/variables";

function buildEndpoint (func) {
  const url_suffix = variables.url_config.find( u => { const ret_val = u.function === func ? true :  false ; return  ret_val}).urlsuffix
  const dynamic_url = variables.base_url + url_suffix + "?code=" + variables.secret_code
  console.log('dynamic_url : '+ dynamic_url )
  return dynamic_url 

}

export default buildEndpoint